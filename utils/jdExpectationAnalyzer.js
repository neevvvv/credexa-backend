const ROLE_EXPECTATIONS = require("./roleExpectations");
const extractSkills = require("./skillExtractor");

/**
 * Analyze job description expectations
 * ------------------------------------
 * Returns what the job expects, even if JD is underspecified
 */
function analyzeJDExpectations(jdText, role, level) {
  const jd = jdText.toLowerCase();

  // 1️⃣ Extract explicitly mentioned skills from JD
  const explicitSkills = extractSkills(jd);

  // 2️⃣ Detect experience requirement signals
  const experienceSignals = [
    "years of experience",
    "experience required",
    "prior experience",
    "professional experience"
  ];

  const experienceExplicitlyRequired = experienceSignals.some(signal =>
    jd.includes(signal)
  );

  // 3️⃣ Fetch implicit role expectations
  const roleData =
    ROLE_EXPECTATIONS[role] &&
    ROLE_EXPECTATIONS[role][level];

  const implicitCoreSkills = roleData?.coreSkills || [];
  const implicitOptionalSkills = roleData?.optionalSkills || [];
  const roleExperienceRequired = roleData?.experienceRequired ?? false;

  // 4️⃣ Determine if JD is underspecified
  const isJDUnderspecified =
    explicitSkills.length < 3 && !experienceExplicitlyRequired;

  // 5️⃣ Merge expectations (EXPLICIT > IMPLICIT)
  const expectedCoreSkills =
    explicitSkills.length > 0
      ? Array.from(new Set([...explicitSkills, ...implicitCoreSkills]))
      : implicitCoreSkills;

  const expectedOptionalSkills =
    explicitSkills.length > 0
      ? implicitOptionalSkills
      : implicitOptionalSkills;

  return {
    expectedCoreSkills,
    expectedOptionalSkills,
    experienceRequired:
      experienceExplicitlyRequired || roleExperienceRequired,
    isJDUnderspecified,
    source: {
      explicitSkillsFromJD: explicitSkills,
      implicitSkillsFromRole: implicitCoreSkills
    }
  };
}

module.exports = analyzeJDExpectations;
