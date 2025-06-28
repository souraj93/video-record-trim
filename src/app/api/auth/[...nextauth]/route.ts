import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'email public_profile',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      console.log("JWT Callback", { token, account, profile });
      if (account && profile) {
        token.id = profile.sub ? profile.sub : profile.id;
        token.email = profile.email;
        token.name = profile.name;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback", { session, token });
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.provider = token.provider;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
