import {query as q} from 'faunadb';
import NextAuth from "next-auth"
// import Providers from "next-auth/providers"
import {fauna} from '../../../services/fauna';
import GithubProvider from 'next-auth/providers/github';

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,      
    })
  ],
  callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        try{
          await fauna.query(
            q.If(
              /* condition */
              q.Not(
                q.Exists(
                  q.Match(q.Index('user_by_email'), q.Casefold(user.email))
                )
              ),
              /* condition === true */
              q.Create(
                q.Collection('users'), {data: {email: user.email}}
              ),
              /* else */
              q.Get(
                q.Match(q.Index('user_by_email'), q.Casefold(user.email))
              )
            )
          );
          return true;
        }catch(err){
          return false;
        }

      },
      async session ({ session, token }) {
        session.user = token
        console.log('session => ', session)
        return session
      }
    }
});

