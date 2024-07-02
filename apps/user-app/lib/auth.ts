import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@repo/db/client";
import { faker } from "@faker-js/faker";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        // Create Input field Phone number
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "123212334",
        },
        // Create Input field Password
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        // HASHED THE PASSSWORD
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const randomName = faker.name.fullName();

        // FIND USER IN DB
        const existingUser = await prisma.user.findFirst({
          where: {
            number: credentials.phone,
          },
        });
        // IF USER IS FOUND IN DB THEN
        if (existingUser) {
          // MATCHED THE PASSWORD WITH THE ACTUAL PASSWORD
          const isPasswordMatched = await bcrypt.compare(
            credentials.password,
            hashedPassword
          );
          // IF BOTH PASSWORD MATCHED
          if (isPasswordMatched) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.number,
            };
          }
          // IF PASSWORD NOT MATCHED
          return null;
        }

        // IF USER IS NOT FOUND IN DB THEN:

        try {
          // CREATE THE USER
          const user = await prisma.user.create({
            data: {
              number: credentials.phone,
              password: hashedPassword,
              name: randomName,
              Balance: {
                create: {
                  amount: 0,
                  locked: 0,
                },
              },
            },
          });
          return {
            id: user.id.toString(),
            name: user.name,
            phoneNumber: user.number,
          };
        } catch (error) {
          console.error(error);
        }
        // IF USER IS NOT CREATED THEN
        return null;
      },
    }),
  ],
  // ASSIGN A JWT SECRET
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }: any) {
      // ASSIGN USER ID
      session.user.id = token.sub;
      return session;
    },
  },
};
