import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <SignUp signInForceRedirectUrl="/new-user" forceRedirectUrl="/new-user" />
  );
};

export default SignUpPage;
