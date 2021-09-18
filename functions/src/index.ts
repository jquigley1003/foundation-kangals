import * as admin from "firebase-admin";

export {registerUser, setUserRoles, addAdmin, removeAdmin, deleteUser,
} from "./user";

admin.initializeApp();
