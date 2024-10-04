import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LoginButton from "@/components/LoginButton";
export default async function LoginTest() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>Welcome to the App</h1>
      {/* Pass session data to the client-side component if needed */}
      <LoginButton session={session} />
    </div>
  );
}
