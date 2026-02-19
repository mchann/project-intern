import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    // Background gradient halus biar estetik dikit
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center p-4">
      <div className="w-full">
        {/* Panggil komponen form  */}
        <LoginForm />
      </div>
    </main>
  );
}