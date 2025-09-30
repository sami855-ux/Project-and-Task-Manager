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

  //Save the username if the user logged in with OAuth or provider
  const saveOAuthMetadata = async (user) => {
    const defaultUsername =
      user.user_metadata.username ||
      user.user_metadata.full_name ||
      user.user_metadata.user_name ||
      user.email.split("@")[0];

    const defaultAvatar =
      user.user_metadata.avatar_url ||
      "https://ui-avatars.com/api/?name=" + encodeURIComponent(defaultUsername);

    const { data, error } = await supabase.auth.updateUser({
      data: {
        username: defaultUsername,
        avatar: defaultAvatar,
      },
    });

    if (error) {
      console.error("Error setting metadata:", error.message);
    }
  };

  //Create a project
  const createProject = async (title, description, due_date, color, tags) => {
    try {
      const { data, error } = await supabase.from("projects").insert([
        {
          title,
          description,
          due_date,
          color,
          tags,
          user_id: session.user.id,
        },
      ]);

      if (error) {
        console.log("Error creating project:", error.message);
        return { error: error.message, success: false };
      }

      return { data, success: true };
    } catch (error) {
      console.log("Error creating project:", error.message);

      return { error: error.message, success: false };
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);

        if (session?.user) {
          await saveOAuthMetadata(session.user);
        }
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
        createProject,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
