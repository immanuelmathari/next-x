import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],

    // to get the username
    callbacks: {
        async session({session,token}){
            session.user.username = session.user.name.split(" ").join('').toLocaleLowerCase();
            session.user.uid = token.auth;
            return session;
        }
    }
});

export {handler as GET, handler as POST};