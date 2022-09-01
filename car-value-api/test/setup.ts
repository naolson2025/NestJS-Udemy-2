import { rm } from 'fs/promises';
import { join } from 'path';
import { getConnection } from 'typeorm';

// this will remove the test.sqlite filte before each e2e test
global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (err) {}
});

global.afterEach(async () => {
  // close the connection to the test DB after each test
  // if we don't do this it results in an error because we delete
  // the DB
  const conn = getConnection();
  await conn.close();
});
