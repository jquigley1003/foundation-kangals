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
    const fullName = data.firstName + " " + data.lastName;

    return admin.auth().createUser({
      email: newUserEmail,
      password: newUserPassword,
      displayName: fullName,
      emailVerified: true,
    }).then((userRecord) => {
      const users = admin.firestore().collection("users");

      return users.doc(userRecord.uid).set({
        uid: userRecord.uid,
        email: newUserEmail,
        firstName: firstName,
        lastName: lastName,
        address: {
          street: null,
          unit: null,
          city: null,
          state: null,
          zipcode: null,
          country: null,
        },
        phone: null,
        roles: {
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

export const setUserRoles = functions.auth.user().onCreate(async (user) => {
  await admin.auth().setCustomUserClaims(user.uid, {
    admin: false,
  }).then(() => {
    return console.log("User Role Admin set to false for ", user.email );
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

export const addAdmin = functions.https.onCall((data, context) => {
  if (context.auth) {
    // if (context.auth.token.admin !== true) {
    //   return {
    //     error: `Request not authorized.
    //     You must be an admin to grant request for ${data.email}.`,
    //   };
    // }
    const userEmail = data.email;
    const userId = data.uid;
    return grantAdminRole(userId).then(() => {
      const users = admin.firestore().collection("users");
      return users.doc(userId).update({
        roles: {
          admin: true,
        },
      }).then(() => {
        return {
          result: `Request fulfilled and Firebase collection updated! 
          ${userEmail} is now an admin.`,
        };
      });
    });
  } else {
    return null;
  }
});

/**
 * @param {string} userId - user id
 * @return {void}
 */
function grantAdminRole(userId: string): Promise<void> {
  return admin.auth().setCustomUserClaims(userId, {
    admin: true,
  });
}

export const deleteUser = functions.firestore.document("users/{userID}")
    .onDelete((snap, context) => {
      return admin.auth().deleteUser(snap.id)
          .then(() => console.log("Deleted user with ID:" + snap.id))
          .catch((error) => console.error(
              "There was an error while deleting user:", error));
    });
