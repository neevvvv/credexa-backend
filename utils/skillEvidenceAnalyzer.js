/**
 * Safely escape regex special characters in skill names
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Analyze evidence strength for each skill in resume text
 */
function analyzeSkillEvidence(resumeText, skills) {
  const text = resumeText.toLowerCase();
  const evidence = {};

  skills.forEach((skill) => {
    const safeSkill = escapeRegex(skill.toLowerCase());

    let level = "none";

    try {
      // Strong evidence: built / developed / implemented
      const strongRegex = new RegExp(
        `(built|developed|implemented|designed)[^\\.\\n]{0,40}${safeSkill}`,
        "i"
      );

      // Medium evidence: experience / worked with / used
      const mediumRegex = new RegExp(
        `(experience|worked with|used|hands-on)[^\\.\\n]{0,40}${safeSkill}`,
        "i"
      );

      // Weak evidence: simple mention
      const weakRegex = new RegExp(`${safeSkill}`, "i");

      if (strongRegex.test(text)) {
        level = "strong";
      } else if (mediumRegex.test(text)) {
        level = "medium";
      } else if (weakRegex.test(text)) {
        level = "weak";
      }
    } catch (err) {
      // Fallback: treat as weak evidence if regex fails
      level = text.includes(skill.toLowerCase()) ? "weak" : "none";
    }

    evidence[skill] = {
      finalLevel: level,
    };
  });

  return evidence;
}

module.exports = analyzeSkillEvidence;
