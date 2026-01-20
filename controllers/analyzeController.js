const fs = require("fs");

// Utils
const resolveScoreBand = require("../utils/scoreBandResolver");
const generateScoreExplanation = require("../utils/scoreExplanationGenerator");
const normalizeScore = require("../utils/scoreNormalizer"); // ✅ FIX 1
const inferDependencySkills = require("../utils/dependencySkillInferer");
const mergeEvidenceWithML = require("../utils/mergeEvidenceWithML");
const extractSentences = require("../utils/sentenceExtractor");
const getEvidenceWeight = require("../utils/skillEvidenceWeights");
const analyzeSkillEvidence = require("../utils/skillEvidenceAnalyzer");
const detectRole = require("../utils/roleDetector");
const ROLE_SKILLS = require("../utils/roleSkills");
const analyzeResumeQuality = require("../utils/resumeQuality");
const extractSkills = require("../utils/skillExtractor");
const analyzeJDExpectations = require("../utils/jdExpectationAnalyzer");
const resolveSectionWeights = require("../utils/sectionWeightResolver");
const analyzeResumeSignals = require("../utils/resumeSignalAnalyzer");
const blendWeights = require("../utils/weightBlender");

// Services
const {
  generateNarrativeReview,
} = require("../services/genaiNarrativeService");
const { getSkillConceptScores } = require("../services/skillConceptService");
const parseResume = require("../services/resumeParser");
const calculateSkillFit = require("../services/skillScorer");
const generateFeedback = require("../services/feedbackGenerator");
const { getSemanticScore } = require("../services/semanticService");

exports.analyzeResume = async (req, res) => {
  try {
    if (!req.file || !req.body.jd) {
      return res.status(400).json({
        success: false,
        error: "Resume file and job description are required",
      });
    }

    const resumePath = req.file.path;
    const jobDescription = req.body.jd;

    /* ========= 1️⃣ Parse Resume ========= */
    const resumeText = await parseResume(resumePath);

    /* ========= 2️⃣ Semantic Similarity ========= */
    const semanticScore = await getSemanticScore(resumeText, jobDescription);
    const semanticScorePercent =
      semanticScore !== null ? Math.round(semanticScore * 100) : 0;

    /* ========= 3️⃣ Role + Level ========= */
    const resolveRoleFromJD = require("../utils/jdRoleResolver");

    const lockedRole = resolveRoleFromJD(jobDescription);
    const { level } = detectRole(jobDescription);

    // 🔒 Role is now JD-dominant
    const role = lockedRole;

    /* ========= 4️⃣ JD Expectations ========= */
    const jdExpectations = analyzeJDExpectations(jobDescription, role, level);

    /* ========= 5️⃣ Resume Skills ========= */
    const resumeSkills = extractSkills(resumeText);
    const inferredDependencySkills = inferDependencySkills(resumeSkills);

    /* ========= 6️⃣ Role Skill Set ========= */
    const roleSkillSet =
      ROLE_SKILLS[role] || ROLE_SKILLS["General Software Engineer"];

    /* ========= 7️⃣ Matching Skills ========= */
    const matchingSkills = resumeSkills.filter(
      (skill) =>
        roleSkillSet.core.includes(skill) ||
        roleSkillSet.secondary.includes(skill)
    );

    /* ========= ML Skill Concept Matching ========= */
    const resumeSentences = extractSentences(resumeText);

    const mlSkillConceptScores = await getSkillConceptScores(
      jdExpectations.expectedCoreSkills,
      resumeSentences
    );

    /* ========= Skill Evidence ========= */
    const skillEvidence = analyzeSkillEvidence(
      resumeText,
      jdExpectations.expectedCoreSkills
    );

    const mergedSkillEvidence = mergeEvidenceWithML(
      skillEvidence,
      mlSkillConceptScores
    );

    let evidenceWeightedMatchScore = 0;
    const maxPossibleMatchScore = jdExpectations.expectedCoreSkills.length;

    for (const skill of jdExpectations.expectedCoreSkills) {
      const level = mergedSkillEvidence[skill]?.finalLevel || "none";
      evidenceWeightedMatchScore += getEvidenceWeight(level);
    }

    const evidenceMatchRatio =
      maxPossibleMatchScore > 0
        ? Number(
            (evidenceWeightedMatchScore / maxPossibleMatchScore).toFixed(2)
          )
        : 0.5;

    /* ========= 8️⃣ Missing Skills ========= */
    const explicitJDSkills = jdExpectations.source.explicitSkillsFromJD || [];

    const criticalMissingSkills = explicitJDSkills.filter(
      (skill) =>
        !resumeSkills.includes(skill) &&
        !inferredDependencySkills.includes(skill)
    );

    const inferredMissingSkills = jdExpectations.expectedCoreSkills.filter(
      (skill) =>
        !resumeSkills.includes(skill) && !explicitJDSkills.includes(skill)
    );

    /* ========= 9️⃣ Resume Quality ========= */
    const resumeIssues = analyzeResumeQuality(resumeText);

    /* ========= 🔟 Skill Fit ========= */
    const baseSkillFit = calculateSkillFit(
      matchingSkills,
      criticalMissingSkills,
      roleSkillSet
    );

    const skillFit = Math.round(
      baseSkillFit * (0.7 + 0.3 * evidenceMatchRatio)
    );

    /* ========= 1️⃣1️⃣ Section Weights (future use) ========= */
    const roleWeights = resolveSectionWeights({ role, level });
    const resumeSignals = analyzeResumeSignals(resumeText);
    const blendedWeights = blendWeights(roleWeights, resumeSignals);

    /* ========= 1️⃣2️⃣ Final Score ========= */
    const rawScore = Math.round(0.4 * skillFit + 0.6 * semanticScorePercent);

    const finalScore = normalizeScore({
      rawScore,
      role,
      level,
      criticalMissingCount: criticalMissingSkills.length,
      evidenceRatio: evidenceMatchRatio, // ✅ FIX 2
      semanticScore: semanticScorePercent,
    });

    const scoreBand = resolveScoreBand(finalScore);

    const scoreExplanation = generateScoreExplanation({
      role,
      missingSkills: criticalMissingSkills,
    });

    /* ========= 1️⃣3️⃣ Feedback ========= */
    const { reasons, improvements } = generateFeedback({
      skillFit,
      matchingSkills,
      missingSkills: criticalMissingSkills,
      resumeIssues,
    });

    const aiNarrative = await generateNarrativeReview({
      role,
      level,
      jobDescription,
      matchingSkills,
      missingSkills: criticalMissingSkills,
      inferredSkills: inferredMissingSkills,
      resumeIssues,
    });

    const finalReview = aiNarrative || {
      overall_review: "Resume reviewed using rule-based analysis.",
      strengths: reasons,
      areas_to_improve: improvements,
      role_fit_summary:
        "Suitable based on detected skills and role expectations.",
    };

    fs.unlinkSync(resumePath);

    /* ========= RESPONSE ========= */
    return res.json({
      success: true,
      overall_score: finalScore,
      score_band: scoreBand,
      score_explanation: scoreExplanation,
      role,
      matching_skills: matchingSkills,
      missing_skills: criticalMissingSkills,
      review: finalReview,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
