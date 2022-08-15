import { initializeApp } from "firebase/app";
import store from "../store";
import { loginUser, logoutUser } from "../store/auth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { useEffect, useState } from "react";
import { setNewsContent } from "../store/newsContent";
import { openModal } from "../store/modal";
import {
  toastErrorNotify,
  toastSuccessNotify,
  toastWarnNotify,
} from "../utils/customToastify";
import { setAnouncementsContent } from "../store/anouncementsContent";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth();

// New user add function
export const register = async (email, password, displayName, navigate) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(auth.currentUser, { displayName: displayName });
    toastSuccessNotify("SignUp Completed Success");
    navigate("/");
    return user;
  } catch (error) {
    toastErrorNotify(error.message);
  }
};

// Login function. firebase function
export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    loginUser(user);
    toastSuccessNotify("Login successful");

    return user;
  } catch (error) {
    toastErrorNotify(error.message);
  }
};

// re-login for reset password.
export const reAuth = async (password) => {
  try {
    const credential = await EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );
    const { user } = await reauthenticateWithCredential(
      auth.currentUser,
      credential
    );
    toastSuccessNotify("Relogin success");

    return user;
  } catch (error) {
    toastErrorNotify(error.message);
  }
};

// Logout user function. firebase function
export const logout = async () => {
  try {
    await signOut(auth);
    toastWarnNotify("Logouted");
    return true;
  } catch (error) {
    toastWarnNotify(error.message);
  }
};

// If the user is logged in, to keep it all the time.. firebase function
onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(loginUser(user));
  } else {
    store.dispatch(logoutUser());
  }
});

// Login user to google  function. firebase function
export const signUpGoogle = async (navigate) => {
  try {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigate("/");

        toastSuccessNotify("Logged in successfully!");
      })
      .catch((error) => {
        toastErrorNotify(error);
      });
  } catch (error) {
    toastErrorNotify(error.message);
  }
};

// Update Profile function
export const updateUser = async (data) => {
  try {
    await updateProfile(auth.currentUser, data);
    toastSuccessNotify("Profile Updated");
  } catch (error) {
    toastErrorNotify(error.message);
  }
};

// Change password function
export const changePassword = async (password) => {
  try {
    await updatePassword(auth.currentUser, password);
    toastSuccessNotify("Your password changed ");
    return true;
  } catch (error) {
    if (error.code === "auth/requires-recent-login") {
      store.dispatch(
        openModal({
          name: "re-auth-modal",
        })
      );
    }
    toastErrorNotify(error.message);
  }
};

//--------- DATABASE FUNCTIONS ---------------

const db = getDatabase(app);
const contentRefNews = ref(db, "news/");
const contentRefAnouncements = ref(db, "anouncements/");

// write database function add new content
export const AddNewsToDatabase = async (info, navigate) => {
  try {
    const newContentRefNews = push(contentRefNews);
    set(newContentRefNews, {
      userId: info.userId,
      userEmail: info.userEmail,
      title: info.title,
      imgUrl: info.imgUrl,
      textContent: info.textContent,
      contentType: "news",
      date: info.date,
    });
    toastSuccessNotify("Success added");
    navigate("/");
  } catch (error) {
    toastErrorNotify(error.message);
  }
};
export const AddAnouncementsToDatabase = async (info, navigate) => {
  try {
    const newContentRefAnouncements = push(contentRefAnouncements);
    set(newContentRefAnouncements, {
      userId: info.userId,
      userEmail: info.userEmail,
      title: info.title,
      imgUrl: info.imgUrl,
      textContent: info.textContent,
      contentType: "anouncement",
      date: info.date,
    });
    toastSuccessNotify("Success added");
    navigate("/");
  } catch (error) {
    toastErrorNotify(error.message);
  }
};

// read database function
export const useFetch = () => {
  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    const db = getDatabase(app);
    const userRefNews = ref(db, "news/");
    onValue(userRefNews, (snapshot) => {
      const data = snapshot.val();
      const contentId = [];

      for (let id in data) {
        contentId.push({ id, ...data[id] });
      }
      store.dispatch(setNewsContent(contentId));

      const userRefAnouncements = ref(db, "anouncements/");
      onValue(userRefAnouncements, (snapshot) => {
        const data = snapshot.val();
        const contentId = [];
  
        for (let id in data) {
          contentId.push({ id, ...data[id] });
        }
        store.dispatch(setAnouncementsContent(contentId));
      })
      setIsLoading(false);
    });
  }, []);
  return { isLoading };
};

// Update database function
export const UpdateNewsContent = async (info, navigate) => {
  const db = getDatabase(app);
  const updates = {};
  updates["news/" + info.id] = info;
  toastSuccessNotify("Successfully Changed");
  navigate("/");
  return update(ref(db), updates);
};
export const UpdateAnouncementsContent = async (info, navigate) => {
  const db = getDatabase(app);
  const updates = {};
  updates["anouncements/" + info.id] = info;
  toastSuccessNotify("Successfully Changed");
  navigate("/");
  return update(ref(db), updates);
};

// Delete content on database function
export const DeleteNewsContent = (id, navigate) => {
  const db = getDatabase(app);
  remove(ref(db, "news/" + id));
  navigate("/");
  toastSuccessNotify("Deleted Successfully");
};
export const DeleteAnouncementContent = (id, navigate) => {
  const db = getDatabase(app);
  remove(ref(db, "anouncements/" + id));
  navigate("/");
  toastSuccessNotify("Deleted Successfully");
};

export default app;
