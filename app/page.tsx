import { signOutAction } from "./action";

export default function Home() {
  return (
    <div>
      welcome to desyn

      <form action={signOutAction}>
        <button type="submit">sign out</button>
      </form>
    </div>
  );
}

