module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: ['<rootDir>/src/services/*/jest.config.js'],
};