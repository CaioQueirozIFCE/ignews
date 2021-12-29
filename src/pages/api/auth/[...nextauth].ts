import {query as q} from 'faunadb';
import NextAuth from "next-auth"
import {fauna} from '../../../services/fauna';
import GithubProvider from 'next-auth/providers/github';
import { CustomerRepository } from '../../../api/repositories/customerRepository';

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,      
    })
  ],
  callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        const customerRepository = new CustomerRepository();
        try{
          await fauna.query(
            q.If(
              /* condition */
              q.Not(
                q.Exists(
                  customerRepository.matchByEmail(user.email)
                )
              ),
              /* condition === true */
              customerRepository.queryCreateCustomer(user.email),
              /* else */
              customerRepository.queryGetCustomer(user.email)
            )
          );
          return true;
        }catch(err){
          return false;
        }

      },
      async session ({ session, token }) {
        session.user = token
        return session
      }
    }
});

