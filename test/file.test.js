const { readdirSync } = require('fs');
const mockfs = require('mock-fs');
require('dotenv').config(); 

it('should create a new directory if one does not already exist', () => {
  const dirNewFiles = readdirSync(process.env.NEW_FILES);
  expect(dirNewFiles);
});

afterAll(() => {
  mockfs.restore();
});
