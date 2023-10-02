module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/app/**/*.test.(js|jsx|ts|tsx)"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^.+\\.(css|less|sass|scss)$": "<rootDir>/config/CSSStub.js",
  },
};
