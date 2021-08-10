module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./.jest/env.js'],
  modulePathIgnorePatterns: ['./node-modules', './dist'],
}
