function getEvidenceWeight(level) {
  switch (level) {
    case "strong":
      return 1.0;
    case "moderate":
      return 0.7;
    case "weak":
      return 0.4;
    default:
      return 0;
  }
}

module.exports = getEvidenceWeight;
