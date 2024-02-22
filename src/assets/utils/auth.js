import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebaseConfig";

export async function continueWithGoogle() {
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth(app);

  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const googleUser = result.user;

    const tokens = {
      google: {
        token: credential?.accessToken,
        // secret: credential?.secret,
      },
    };
    if (googleUser) {
      return googleUser;
    }
    return tokens;
  } catch (error) {
    console.log(error);
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    if (error.code === "auth/popup-closed-by-user") return;
    // if (error.code === "auth/account-exists-with-different-credential") {
    //   toast.error("You already logged in with different service");
    // }
    // toast.error("Something went wrong");
  }
}
