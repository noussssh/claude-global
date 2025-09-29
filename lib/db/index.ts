import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

// Use environment variables in production, fallback for local development
const databaseUrl = process.env.TURSO_DATABASE_URL || "libsql://service-providers-db-noussssh.aws-ap-northeast-1.turso.io";
const authToken = process.env.TURSO_AUTH_TOKEN || "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NTkxNTQ4NTksImlkIjoiNzc2NGNhMDAtZjliMy00NzJmLThlMGUtYzVmZjk0NDRjMTcyIiwicmlkIjoiMjNkMGYxZWQtZjQwYy00MDQxLWJhYjMtYzA1MDA5ZjI5Njk3In0.hp4OGobq8eeDHyfqgN3Czgha-FRfS1h3CicPC3XO-cKPmLLLCIytnpiwzTBJpkTX532UV2EJj2mqjBbQzfM7Cw";

const client = createClient({
  url: databaseUrl,
  authToken: authToken,
});

export const db = drizzle(client);