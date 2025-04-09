import SignUpForm from '@/components/forms/form-signup';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Authentication | Sign Up",
    description: 'Sign Up page for authentication.',
  };

function SignUp() {
  return <SignUpForm />
}

export default SignUp;