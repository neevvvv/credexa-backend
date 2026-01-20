function analyzeResumeQuality(resumeText) {
  const issues = [];

  if (!resumeText || resumeText.length < 800) {
    issues.push("Resume is very short; limited information detected");
  }

  if (!resumeText.includes("experience")) {
    issues.push("Experience section not clearly identified");
  }

  if (!resumeText.includes("project")) {
    issues.push("Projects section not clearly identified");
  }

  if (!resumeText.includes("skill")) {
    issues.push("Skills section not clearly identified");
  }

  return issues;
}

module.exports = analyzeResumeQuality;
