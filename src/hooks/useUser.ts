import { useState } from "react";
import { supabase } from "../api/supabaseClient";

export function useUser() {
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<null | string>(null);

  async function login(email: string): Promise<boolean> {
    setLoggingIn(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setLoginError(error.message);
      setLoggingIn(false);
      return false;
    }

    setLoginError(null);
    setLoggingIn(false);
    return true;
  }

  return { loggingIn, loginError, login };
}
