
import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
 
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("figma")
      }}
    >
      <Button className="bg-secondary" type="submit">Signin with Figma</Button>
    </form>
  )
} 
