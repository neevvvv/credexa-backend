/**
 * JD-dominant role resolver
 * Ensures role is decided by job title, not resume noise
 */

function resolveRoleFromJD(jobDescription) {
  const jd = jobDescription.toLowerCase();

  // Strong title-based signals (highest priority)
  if (jd.includes("web developer")) return "Web Developer";
  if (jd.includes("frontend")) return "Frontend Developer";
  if (jd.includes("front-end")) return "Frontend Developer";
  if (jd.includes("backend")) return "Backend Developer";
  if (jd.includes("back-end")) return "Backend Developer";
  if (jd.includes("full stack") || jd.includes("fullstack"))
    return "Full Stack Developer";

  // Intern-specific generic software roles
  if (jd.includes("software developer") || jd.includes("software engineer"))
    return "Software Engineer";

  // ML / Data roles (ONLY if explicitly mentioned)
  if (
    jd.includes("machine learning") ||
    jd.includes("ml engineer") ||
    jd.includes("data scientist")
  ) {
    return "Machine Learning Engineer";
  }

  // Safe fallback
  return "General Software Engineer";
}

module.exports = resolveRoleFromJD;
