const { SKILLS, WEIGHTS } = require("../utils/constants");

function calculateScore(sections, jd) {
  if (!Array.isArray(SKILLS)) {
    throw new Error("SKILLS is not an array");
  }

  const jdText = jd.toLowerCase();

  let matchedSkills = [];

  SKILLS.forEach((skill) => {
    if (
      sections.fullText &&
      sections.fullText.includes(skill) &&
      jdText.includes(skill)
    ) {
      matchedSkills.push(skill);
    }
  });

  const skillScore = (matchedSkills.length / SKILLS.length) * WEIGHTS.skills;

  const skillMatchPercent = Math.round(
    (matchedSkills.length / SKILLS.length) * 100,
  );

  const experienceScore = sections.experience ? WEIGHTS.experience : 0;

  const educationScore = sections.education ? WEIGHTS.education : 0;

  const certificateBonus = sections.certificates ? WEIGHTS.certificates : 0;

  const totalScore = Math.min(
    Math.round(
      skillScore + experienceScore + educationScore + certificateBonus,
    ),
    100,
  );

  return {
    score: totalScore,
    skill_match_percent: skillMatchPercent,
    breakdown: {
      skills: Math.round(skillScore),
      experience: experienceScore,
      education: educationScore,
      certificates: certificateBonus,
    },
    explanation: {
      matchedSkills,
      note: "Score is based on skill overlap, experience relevance, education, and certificates",
    },
  };
}

module.exports = calculateScore;
