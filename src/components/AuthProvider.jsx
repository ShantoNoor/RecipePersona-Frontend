import { createContext, useEffect, useState } from "react";
import app from "../utils/firebase.config";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut as _signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile as _updateProfile,
} from "firebase/auth";

import { toast } from "sonner";
import axiosPublic from "@/hooks/useAxios";

const auth = getAuth(app);
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        try {
          const userInfo = await axiosPublic.get(
            `/users?email=${currentUser?.email}`
          );
          setUser(userInfo.data[0]);
        } catch (err) {
          console.error(err);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, [setUser, setLoading]);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const popUpSignIn = (provider) => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  const signOut = () => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      toast.promise(_signOut(auth), {
        loading: "Loading, Please wait ...",
        success: () => {
          resolve(true);
          return "Logout successfull!";
        },
        error: (err) => {
          reject(false);
          toast.error("Failed To Logout");
          return err.message;
        },
      });
    });
  };

  const updateProfile = (name, photo) => {
    return new Promise((resolve, reject) => {
      toast.promise(
        _updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        }),
        {
          loading: "Loading, Please wait ...",
          success: () => {
            resolve(true);
            toast.success(`Welcome ${name}!!!`);
            return "Profile Update Successfull!";
          },
          error: (err) => {
            reject(false);
            toast.error("Failed To Update Profile");
            return err.message;
          },
        }
      );
    });
  };

  const signUp = (email, password) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      toast.promise(createUserWithEmailAndPassword(auth, email, password), {
        loading: "Loading, Please wait ...",
        success: (userCredential) => {
          resolve(userCredential.user);
          return `Sign Up Successfull!`;
        },
        error: (err) => {
          reject(null);
          toast.error(`Failed To Sign Up!`);
          return err.message;
        },
      });
    });
  };

  const signIn = (email, password) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      toast.promise(signInWithEmailAndPassword(auth, email, password), {
        loading: "Loading, Please wait ...",
        success: (res) => {
          resolve(res.user);
          if (res.user?.displayName)
            toast.success(`Welcome ${res.user.displayName}!!!`);
          return "Login Successfull!";
        },
        error: (err) => {
          reject(null);
          toast.error("Failed To Login");
          return err.message;
        },
      });
    });
  };

  const popUp = (media) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      toast.promise(popUpSignIn(media), {
        loading: "Loading, Please wait ...",
        success: (res) => {
          resolve(res.user);
          if (res.user?.email) {
            const data = {
              name: res.user?.displayName || "",
              email: res.user.email,
              photo: res.user?.photoURL || "",
            };
            axiosPublic
              .post("/users", data)
              .then((res) => {
                setUser(res.data);
              })
              .catch(() => {});
            toast.success(`Welcome ${res.user.displayName}!!!`);
          }
          return "Login Successfull!";
        },
        error: (err) => {
          reject(null);
          toast.error("Failed To Login");
          return err.message;
        },
      });
    });
  };

  const googlePopUp = () => popUp(googleProvider);
  const githubPopUp = () => popUp(githubProvider);

  return (
    <AuthContext.Provider
      value={{
        googlePopUp,
        githubPopUp,
        user,
        setUser,
        signOut,
        signUp,
        signIn,
        updateProfile,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
