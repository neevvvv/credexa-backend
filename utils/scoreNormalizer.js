/**
 * Normalize raw score to be role + level aware
 * This prevents unfair penalization, especially for interns/freshers
 */

function normalizeScore({
  rawScore,
  role,
  level,
  criticalMissingCount,
  evidenceRatio,
  semanticScore
}) {
  let adjustedScore = rawScore;

  const isIntern =
    level?.toLowerCase().includes("intern") ||
    level?.toLowerCase().includes("fresher") ||
    level?.toLowerCase().includes("entry");

  /* -----------------------------
     RULE 1: INTERN SAFETY FLOOR
     ----------------------------- */
  if (isIntern && criticalMissingCount <= 1) {
    if (adjustedScore < 65) {
      adjustedScore = 65;
    }
  }

  /* -----------------------------
     RULE 2: DIRECTIONAL ALIGNMENT BOOST
     ----------------------------- */
  const hasGoodAlignment =
    semanticScore >= 35 &&
    evidenceRatio >= 0.6;

  if (hasGoodAlignment) {
    // Soft boost, not inflation
    adjustedScore += 6;
  }

  /* -----------------------------
     RULE 3: MULTIPLE CRITICAL GAPS (CONTROL)
     ----------------------------- */
  if (criticalMissingCount >= 3) {
    adjustedScore -= 5;
  }

  /* -----------------------------
     RULE 4: HARD CAPS (REALISM)
     ----------------------------- */
  if (adjustedScore > 92) adjustedScore = 92;
  if (adjustedScore < 30) adjustedScore = 30;

  return Math.round(adjustedScore);
}

module.exports = normalizeScore;
