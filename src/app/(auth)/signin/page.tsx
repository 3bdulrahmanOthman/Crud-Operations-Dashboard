import LoginForm from '@/components/forms/form-login';

export default async function Signin() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-muted/40">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
