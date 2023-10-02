/* eslint-disable turbo/no-undeclared-env-vars */
module.exports = {
  presets:
    process.env.NODE_ENV === "test"
      ? ["@babel/preset-env", "@babel/preset-typescript", "@babel/preset-react"]
      : ["next/babel"],
};
