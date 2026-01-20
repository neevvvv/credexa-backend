/**
 * ROLE EXPECTATION LIBRARY
 * ------------------------
 * This file defines implicit expectations for roles when
 * job descriptions are underspecified or incomplete.
 *
 * These are NOT strict requirements.
 * They are used for:
 * - fair evaluation
 * - suggestion generation
 * - expectation alignment
 */

module.exports = {
  "Software Engineer": {
    Intern: {
      coreSkills: [
        "programming fundamentals",
        "problem solving",
        "basic data structures"
      ],
      optionalSkills: [
        "git",
        "basic debugging",
        "any programming language"
      ],
      experienceRequired: false,
      responsibilityLevel: "learning and implementation"
    },

    Junior: {
      coreSkills: [
        "data structures",
        "algorithms",
        "programming fundamentals"
      ],
      optionalSkills: [
        "git",
        "unit testing",
        "basic system design"
      ],
      experienceRequired: false,
      responsibilityLevel: "feature implementation"
    },

    Mid: {
      coreSkills: [
        "data structures",
        "algorithms",
        "system design",
        "problem solving"
      ],
      optionalSkills: [
        "performance optimization",
        "code reviews"
      ],
      experienceRequired: true,
      responsibilityLevel: "ownership of features"
    },

    Senior: {
      coreSkills: [
        "system design",
        "architecture",
        "scalability",
        "mentoring"
      ],
      optionalSkills: [
        "design patterns",
        "technical leadership"
      ],
      experienceRequired: true,
      responsibilityLevel: "technical ownership and leadership"
    }
  },

  "Backend Developer": {
    Intern: {
      coreSkills: [
        "basic backend concepts",
        "http fundamentals",
        "programming basics"
      ],
      optionalSkills: [
        "node",
        "rest api",
        "database basics",
        "git"
      ],
      experienceRequired: false,
      responsibilityLevel: "learning backend systems"
    },

    Junior: {
      coreSkills: [
        "node",
        "rest api",
        "database fundamentals"
      ],
      optionalSkills: [
        "authentication",
        "sql",
        "mongodb"
      ],
      experienceRequired: false,
      responsibilityLevel: "building backend features"
    },

    Mid: {
      coreSkills: [
        "api design",
        "database design",
        "authentication",
        "error handling"
      ],
      optionalSkills: [
        "caching",
        "message queues"
      ],
      experienceRequired: true,
      responsibilityLevel: "owning backend services"
    },

    Senior: {
      coreSkills: [
        "scalable backend systems",
        "system architecture",
        "performance optimization"
      ],
      optionalSkills: [
        "distributed systems",
        "cloud infrastructure"
      ],
      experienceRequired: true,
      responsibilityLevel: "backend architecture and reliability"
    }
  },

  "Frontend Developer": {
    Intern: {
      coreSkills: [
        "html",
        "css",
        "basic javascript"
      ],
      optionalSkills: [
        "react",
        "ui basics"
      ],
      experienceRequired: false,
      responsibilityLevel: "learning frontend development"
    },

    Junior: {
      coreSkills: [
        "javascript",
        "react",
        "responsive design"
      ],
      optionalSkills: [
        "state management",
        "frontend testing"
      ],
      experienceRequired: false,
      responsibilityLevel: "building user interfaces"
    },

    Mid: {
      coreSkills: [
        "frontend architecture",
        "state management",
        "performance optimization"
      ],
      optionalSkills: [
        "accessibility",
        "testing frameworks"
      ],
      experienceRequired: true,
      responsibilityLevel: "owning frontend features"
    },

    Senior: {
      coreSkills: [
        "frontend architecture",
        "scalability",
        "design systems"
      ],
      optionalSkills: [
        "mentoring",
        "cross-team collaboration"
      ],
      experienceRequired: true,
      responsibilityLevel: "frontend technical leadership"
    }
  }
};
