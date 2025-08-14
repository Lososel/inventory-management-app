import dotenv from 'dotenv';

dotenv.config();

function getEnvVar(key: string, required = true): string {
  const value = process.env[key];
  if (!value && required) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value!;
}

export const config = {
  port: getEnvVar('PORT'),
  frontendUrl: getEnvVar('FRONTEND_URL'),
  databaseUrl: getEnvVar('DATABASE_URL'),

  jwt: {
    secret: getEnvVar('JWT_ACCESS_SECRET'),
    ttl: parseInt(process.env.JWT_ACCESS_TTL || '900', 10),
  },

  google: {
    clientId: getEnvVar('GOOGLE_CLIENT_ID'),
    clientSecret: getEnvVar('GOOGLE_CLIENT_SECRET'),
    callbackUrl: getEnvVar('GOOGLE_CALLBACK_URL'),
  },

  github: {
    clientId: getEnvVar('GITHUB_CLIENT_ID'),
    clientSecret: getEnvVar('GITHUB_CLIENT_SECRET'),
    callbackUrl: getEnvVar('GITHUB_CALLBACK_URL'),
  },
};
