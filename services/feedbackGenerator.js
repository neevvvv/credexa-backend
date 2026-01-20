module.exports = function generateFeedback({
  skillFit,
  matchingSkills,
  missingSkills,
  resumeIssues
}) {
  const reasons = [];
  const improvements = [];

  if (skillFit >= 70) {
    reasons.push("Strong alignment with core job skills");
  } else if (skillFit >= 40) {
    reasons.push("Partial alignment with required skills");
  } else {
    reasons.push("Limited alignment with job requirements");
  }

  if (matchingSkills.length > 0) {
    reasons.push(`Matched skills: ${matchingSkills.join(", ")}`);
  }

  if (missingSkills.length > 0) {
    improvements.push(
      `Consider adding experience with: ${missingSkills.join(", ")}`
    );
  }

  resumeIssues.forEach(issue => improvements.push(issue));

  return {
    reasons,
    improvements
  };
};
