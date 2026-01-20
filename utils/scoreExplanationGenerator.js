function generateScoreExplanation({ role, missingSkills }) {
  // No missing skills
  if (!missingSkills || missingSkills.length === 0) {
    return `Strong alignment with ${role} requirements based on detected skills and experience.`;
  }

  // Only one missing skill (MOST IMPORTANT CASE)
  if (missingSkills.length === 1) {
    return `Core skills match well; missing ${missingSkills[0]} slightly lowers the ATS score.`;
  }

  // Multiple missing skills
  return `Some required skills are missing, which lowers the ATS match despite relevant experience.`;
}

module.exports = generateScoreExplanation;
