import Image from "next/image";
import { signIn } from "@/auth";
import { geistMono, geistSans } from "@/utils/fonts";
import { Figma } from "@/component/logo/Figma";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("figma");
      }}
      className="pt-16 flex flex-col items-stretch min-h-screen justify-between"
    >
      {/* Header */}
      <div className="m-6">
        <Image src={"logo.svg"} alt={"image"} width={66} height={66} />
        <div className={`mt-4 ${geistMono.className}`}>
          <h1 className="text-5xl">Desyn.</h1>
          <h1 className="text-5xl">Reflect.</h1>
          <h1 className="text-5xl heading-highlight">Evolve.</h1>
        </div>
      </div>

      <div className="m-6 mt-auto flex flex-col gap-8  pt-6">
        <p
          className={`text-lg text-black/60 border-black/10 ${geistSans.className}`}
        >
          We turn your creative sessions into insights, celebrate your wins, and
          help you shape your unique design journey.
        </p>
      </div>

      <div className="border-[1px] border-black/10"></div>
      <div className="m-6">
        <button
          className={`flex items-center cursor-pointer justify-center gap-4 py-4 w-full bg-black text-white ${geistMono.className}`}
          type="submit"
        >
          <Figma />
          Continue with Figma
        </button>
      </div>
    </form>
  );
}
