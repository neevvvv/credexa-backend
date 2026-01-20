/**
 * Merge ML concept similarity into rule-based skill evidence
 * Conservative, explainable thresholds
 */

function mlLevel(sim) {
  if (sim >= 0.55) return "strong";
  if (sim >= 0.40) return "moderate";
  if (sim >= 0.25) return "weak";
  return "none";
}

const levelRank = {
  none: 0,
  weak: 1,
  moderate: 2,
  strong: 3
};

function mergeEvidenceWithML(skillEvidence, mlScores) {
  const merged = {};

  for (const skill of Object.keys(skillEvidence)) {
    const ruleLevel = skillEvidence[skill]?.level || "none";
    const mlSim = mlScores?.[skill] ?? 0;
    const mlDerivedLevel = mlLevel(mlSim);

    // Take the stronger of the two (conservative)
    const finalLevel =
      levelRank[mlDerivedLevel] > levelRank[ruleLevel]
        ? mlDerivedLevel
        : ruleLevel;

    merged[skill] = {
      ruleLevel,
      mlSimilarity: mlSim,
      finalLevel
    };
  }

  return merged;
}

module.exports = mergeEvidenceWithML;
