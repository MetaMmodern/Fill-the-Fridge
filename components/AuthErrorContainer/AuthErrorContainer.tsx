import { NextPage } from "next";
import React from "react";

export const errors = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  default: "Unable to sign in.",
};

interface Props {
  error: string | string[] | undefined;
}
const AuthErrorContainer: NextPage<Props> = ({ error }) => {
  const errorMessage =
    error &&
    !Array.isArray(error) &&
    (errors[error as keyof typeof errors] ?? errors.default);
  return (
    <>
      {error && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default AuthErrorContainer;
