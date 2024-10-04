// app/components/LoginButton.tsx
"use client";

import { signIn, signOut } from "next-auth/react";
import React from "react";

// Accept session as a prop from the server component
const LoginButton: React.FC<{ session: any }> = ({ session }) => {
  return (
    <div style={{ textAlign: "center", paddingTop: "50px" }}>
      {!session ? (
        <>
          <h1>You are not signed in</h1>
          <button onClick={() => signIn("google")}>Sign in with Google</button>
        </>
      ) : (
        <>
          <h1>Welcome, {session?.user?.email}</h1>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </div>
  );
};

export default LoginButton;
