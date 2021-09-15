import * as admin from "firebase-admin";

export {registerUser, setUserRoles, addAdmin, deleteUser} from "./user";

admin.initializeApp();
