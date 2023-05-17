import { FormEvent, useState } from "react";
import { useUser } from "../hooks/useUser";
import { Logo } from "../components/shared/Logo";
import { FaEnvelope } from "react-icons/fa";
import { Button } from "../components/shared/Button";

export const Login = () => {
  const [email, setEmail] = useState("");
  const { login, loggingIn } = useUser();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    let res = await login(email);
    if (!res) {
      window.alert("Error");
    }
    window.alert("Check your email inbox");
    setEmail("");
  }

  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center p-5">
      <Logo size="lg" />
      <form
        className="w-full m-4 rounded-xl bg-emerald-100 flex flex-col p-8"
        onSubmit={handleSubmit}
      >
        <input
          required
          type="email"
          value={email}
          placeholder="youremail@domain.com"
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 px-4 w-full rounded-lg bg-black bg-opacity-10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600 mb-4 text-xl text-gray-700"
        />
        <Button type="submit" loading={loggingIn}>
          <span>Send link</span>
          <FaEnvelope />
        </Button>
        <div className="text-sm text-gray-500 mt-4">
          <p>Login as simple as just clicking a link.</p>
          <p>Type in your email in the input and check your email inbox 😌</p>
        </div>
      </form>
    </div>
  );
};
