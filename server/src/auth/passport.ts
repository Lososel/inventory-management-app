import passport from 'passport';
import { Strategy as Google } from 'passport-google-oauth20';
import type {
  Profile as GoogleProfile,
  VerifyCallback as GoogleVerify,
} from 'passport-google-oauth20';
import { Strategy as GitHub } from 'passport-github2';
import type { Profile as GitHubProfile } from 'passport-github2';
import { prisma } from '../db/prisma.js';

type Provider = 'google' | 'github';

async function upsertUser(provider: Provider, profile: GoogleProfile | GitHubProfile) {
  const email = profile.emails?.[0]?.value;
  if (!email) throw new Error('No email from provider');
  const providerAccountId = profile.id;
  const name = (profile as any).displayName ?? (profile as any).username ?? null;

  const user = await prisma.user.upsert({
    where: { email },
    update: { name: name ?? undefined },
    create: { email, name: name ?? undefined },
  });

  await prisma.account.upsert({
    where: { provider_providerAccountId: { provider, providerAccountId } },
    update: { userId: user.id },
    create: { provider, providerAccountId, userId: user.id },
  });

  return user;
}

passport.use(
  new Google(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (_at: string, _rt: string, profile: GoogleProfile, done: GoogleVerify) => {
      try {
        const user = await upsertUser('google', profile);
        done(null, { id: user.id });
      } catch (e) {
        done(e as Error);
      }
    }
  )
);

passport.use(
  new GitHub(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: process.env.GITHUB_CALLBACK_URL!,
      scope: ['user:email'],
    },
    async (_at: string, _rt: string, profile: GitHubProfile, done: any) => {
      try {
        const user = await upsertUser('github', profile);
        done(null, { id: user.id });
      } catch (e) {
        done(e as Error);
      }
    }
  )
);

export default passport;
