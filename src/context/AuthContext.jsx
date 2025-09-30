import { createContext, useContext, useEffect, useState } from "react";
import supabase from "@/supabase/supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);

  //Sign up
  const signupNewUser = async (username, email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
          },
        },
      });

      if (error) {
        console.log("Error during sign up:", error.message);
        return { error: error.message, success: false };
      }

      setSession(data.session);
      return { data, success: true };
    } catch (error) {
      console.error("Error signing up:", error.message);
      return { error: error.message };
    }
  };

  //SignOut and session management
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) console.log("Error signing out:", error.message);
    setSession(null);
  };

  //Signin
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.log("Error during sign in:", error.message);
        return { error: error.message, success: false };
      }

      setSession(data.session);
      return { data, success: true };
    } catch (error) {
      console.error("Error signing in:", error.message);
      return { error: error.message };
    }
  };

  //Signin with Google
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:5173/dashboard",
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  };

  //signin with github
  const signInWithGitHub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:5173/dashboard",
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        signupNewUser,
        signOut,
        signInUser,
        signInWithGoogle,
        signInWithGitHub,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
