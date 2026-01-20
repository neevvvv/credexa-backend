function getBaseWeightsByLevel(level) {
  switch (level) {
    case "Intern":
      return {
        experience: 0.10,
        projects: 0.35,
        skills: 0.25,
        education: 0.20,
        summary: 0.10
      };

    case "Junior":
      return {
        experience: 0.25,
        projects: 0.30,
        skills: 0.25,
        education: 0.10,
        summary: 0.10
      };

    case "Mid":
      return {
        experience: 0.40,
        projects: 0.25,
        skills: 0.20,
        education: 0.05,
        summary: 0.10
      };

    case "Senior":
      return {
        experience: 0.50,
        projects: 0.20,
        skills: 0.20,
        education: 0.00,
        summary: 0.10
      };

    default:
      // Industry-safe fallback
      return {
        experience: 0.25,
        projects: 0.30,
        skills: 0.25,
        education: 0.10,
        summary: 0.10
      };
  }
}

function normalizeWeights(weights) {
  const total = Object.values(weights).reduce((sum, w) => sum + w, 0);

  const normalized = {};
  for (const key in weights) {
    normalized[key] = Number((weights[key] / total).toFixed(3));
  }

  return normalized;
}

function resolveSectionWeights({ role, level }) {
  const baseWeights = getBaseWeightsByLevel(level);

  // Future: role-specific tweaks can go here
  // e.g., Data roles → boost projects, ML roles → boost skills

  return normalizeWeights(baseWeights);
}

module.exports = resolveSectionWeights;
