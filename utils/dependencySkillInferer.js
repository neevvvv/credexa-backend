const SKILL_DEPENDENCIES = require("./skillDependencyMap");

function inferDependencySkills(resumeSkills) {
  const inferred = new Set();

  resumeSkills.forEach(skill => {
    const deps = SKILL_DEPENDENCIES[skill.toLowerCase()];
    if (deps) {
      deps.forEach(dep => inferred.add(dep));
    }
  });

  return Array.from(inferred);
}

module.exports = inferDependencySkills;
