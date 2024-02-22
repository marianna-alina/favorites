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
      },
    };
    if (googleUser) {
      return googleUser;
    }
    return tokens;
  } catch (error) {
    console.log(error);

    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log(credential);
  }
}
