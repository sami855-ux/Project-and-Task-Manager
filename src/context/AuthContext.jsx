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
      value={{ session, signupNewUser, signOut, signInUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
