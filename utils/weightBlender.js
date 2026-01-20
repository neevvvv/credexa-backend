function blendWeights(roleWeights, resumeSignals) {
  const blended = {};

  for (const key in roleWeights) {
    // Simple average: expectation + reality
    blended[key] = Number(
      ((roleWeights[key] + resumeSignals[key]) / 2).toFixed(3)
    );
  }

  // Normalize again to ensure sum = 1
  const total = Object.values(blended).reduce((sum, v) => sum + v, 0);

  const normalized = {};
  for (const key in blended) {
    normalized[key] = Number((blended[key] / total).toFixed(3));
  }

  return normalized;
}

module.exports = blendWeights;
