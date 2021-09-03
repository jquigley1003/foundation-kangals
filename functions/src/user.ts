import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const registerUser = functions.https.onCall((data, context) => {
  // check if context.auth is not null
  // otherwise on build, error will be "Object is possibly 'undefined'
  // or add the ! if 100% sure context.auth is always defined
  // example: const isAdmin = context.auth!.token.admin;

  if (context.auth) {
    // if (context.auth.token.admin !== true) {
    //   return {
    //     error: "Request not authorized. You must be an admin",
    //   };
    // }
    const newUserEmail = data.email;
    const newUserPassword = data.password;
    const firstName = data.firstName;
    const lastName = data.lastName;

    return admin.auth().createUser({
      email: newUserEmail,
      password: newUserPassword,
      emailVerified: true,
    }).then((userRecord) => {
      const users = admin.firestore().collection("users");

      return users.doc(userRecord.uid).set({
        uid: userRecord.uid,
        email: newUserEmail,
        firstName: firstName,
        lastName: lastName,
        address: "123 Sherwood Forest",
        city: "Atlanta",
        state: "GA",
        zipCode: "30309",
        roles: {
          guestMember: true,
          paidMember: false,
          admin: false,
        },
      });
    }).then(() => {
      return {
        result: `${newUserEmail} is now a member. Firebase collection updated!`,
      };
    }).catch(() => {
      return {
        error: `There was an error adding ${newUserEmail} as a new member.`,
      };
    });
  } else {
    return null;
  }
});

export const setUserRoles = functions.auth.user().onCreate((user) => {
  return admin.auth().setCustomUserClaims(user.uid, {
    admin: false,
  }).then(() => {
    return console.log("User Role Admin set to false for ", user );
  });
});

// Uncomment function below to automatically set emailVerified to true
// place in then above: return setEmailVerifiedTrue(user.uid)

// /**
//  * @param {string} uid - user id
//  * @return {void}
//  */
// function setEmailVerifiedTrue(uid: string) {
//   return admin.auth().updateUser(uid, {
//     emailVerified: true,
//   }).then((userRecord) => {
//     console.log("Successfully updated user: ", userRecord.toJSON());
//   });
// }
