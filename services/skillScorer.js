module.exports = function calculateSkillFit(
  matchingSkills,
  missingSkills,
  roleSkillSet
) {
  const coreWeight = 0.7;
  const secondaryWeight = 0.3;

  const coreMatched = matchingSkills.filter(skill =>
    roleSkillSet.core.includes(skill)
  ).length;

  const secondaryMatched = matchingSkills.filter(skill =>
    roleSkillSet.secondary.includes(skill)
  ).length;

  const coreScore =
    roleSkillSet.core.length === 0
      ? 0
      : coreMatched / roleSkillSet.core.length;

  const secondaryScore =
    roleSkillSet.secondary.length === 0
      ? 0
      : secondaryMatched / roleSkillSet.secondary.length;

  const finalScore =
    coreScore * coreWeight + secondaryScore * secondaryWeight;

  return Math.round(finalScore * 100);
};
