function countMatches(text, keywords) {
  let count = 0;
  for (const keyword of keywords) {
    const regex = new RegExp(`\\b${keyword}\\b`, "gi");
    const matches = text.match(regex);
    if (matches) count += matches.length;
  }
  return count;
}

function normalizeSignals(rawSignals) {
  const total = Object.values(rawSignals).reduce((sum, v) => sum + v, 0);

  // If nothing detected, return safe neutral signals
  if (total === 0) {
    return {
      experience: 0.2,
      projects: 0.2,
      skills: 0.2,
      education: 0.2,
      summary: 0.2
    };
  }

  const normalized = {};
  for (const key in rawSignals) {
    normalized[key] = Number((rawSignals[key] / total).toFixed(3));
  }

  return normalized;
}

function analyzeResumeSignals(resumeText) {
  const text = resumeText.toLowerCase();

  const signals = {
    experience: countMatches(text, [
      "experience",
      "worked",
      "working",
      "company",
      "role",
      "responsibility",
      "intern",
      "employment"
    ]),

    projects: countMatches(text, [
      "project",
      "built",
      "developed",
      "implemented",
      "designed",
      "github",
      "repository"
    ]),

    skills: countMatches(text, [
      "skills",
      "technologies",
      "tools",
      "framework",
      "language",
      "stack"
    ]),

    education: countMatches(text, [
      "education",
      "degree",
      "b.tech",
      "bachelor",
      "master",
      "university",
      "college",
      "cgpa"
    ]),

    summary: countMatches(text, [
      "summary",
      "profile",
      "objective",
      "passionate",
      "motivated",
      "seeking"
    ])
  };

  return normalizeSignals(signals);
}

module.exports = analyzeResumeSignals;
