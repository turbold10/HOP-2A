// import { config } from "dotenv";
// config();
// import * as fs from "fs";
// import clerkClient from "@clerk/clerk-sdk-node";

// const SECRET_KEY = process.env.CLERK_SECRET_KEY;

// if (!SECRET_KEY) {
//   throw new Error(
//     "CLERK_SECRET_KEY is required"
//   );
// }

// const createUser = (userData) => clerkClient.users.createUser({
//   externalId: userData.authUserId,
//   emailAddress: [userData.azureEmail],
//   firstName: userData.firstName,
//   lastName: userData.lastName,
//   skipPasswordRequirement: true,
//   privateMetadata: userData.private_metadata,
//   publicMetadata: userData.public_metadata,
//   unsafeMetadata: userData.unsafe_metadata,
// });

// const main = async () => {
//   console.log(`Clerk User Migration`);

//   const inputFileName = "users.json";

//   console.log(`Fetching users from ${inputFileName}`);

//   const parsedUserData: any[] = JSON.parse(
//     fs.readFileSync(inputFileName, "utf-8")
//   );

//   for (const userData of parsedUserData) {
//     const res = await createUser(userData);
//     console.log('response ==>', res)
//   }

//   return;
// }

// main()


import { Clerk } from "@clerk/clerk-sdk-node";
// import clerkClient from "@clerk/clerk-sdk-node";

const clerk = Clerk({ secretKey: "secret" });

async function addExternalIdToUser(userId, externalId) {
  try {
    const updatedUser = await clerk.users.updateUser(userId, {
      externalId,
    });

    console.log("User updated:", updatedUser);
  } catch (error) {
    console.log(error)
    console.error("Error updating user:", error);
  }
}

// Example usage
addExternalIdToUser("user_2uQdV0b0AyZndeKVtADOIs0KAsk", "EC6170344");
