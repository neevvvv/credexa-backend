function resolveScoreBand(score) {
  if (score >= 81) return "Excellent Match";
  if (score >= 61) return "Strong Match";
  if (score >= 41) return "Moderate Match";
  return "Needs Improvement";
}

module.exports = resolveScoreBand;
