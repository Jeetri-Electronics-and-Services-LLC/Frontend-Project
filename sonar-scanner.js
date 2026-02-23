const scanner = require('sonarqube-scanner');
require('dotenv').config();

scanner(
  {
    serverUrl: 'http://localhost:9000',
    token: 'process.env.SONAR_TOKEN',
    options: {
      'sonar.projectKey': 'jeetri',
      'sonar.projectName': 'jeetri',
      'sonar.projectVersion': '1.0',
      'sonar.sources': 'src',
      'sonar.exclusions': '**/__tests__/**,**/*.test.js,**/*.spec.js,node_modules/**',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
    },
  },
  () => {
    console.log('SonarQube scan completed.');
    process.exit();
  }
);
