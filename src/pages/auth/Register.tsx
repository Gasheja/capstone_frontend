// pages/auth/Register.tsx
import { RegistrationForm } from "@/components/registration-form"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function Register() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-4 md:p-8 border-2 border-red-500">
      <div className="text-center">
        <h2 className="font-bold text-2xl md:text-3xl mb-2">Congo Decision Support System</h2>
        <p className="text-muted-foreground text-sm md:text-base">Citizen Registration Portal</p>
      </div>
      
      <div className="flex w-full max-w-3xl flex-col gap-6"> {/* Increased max-width */}
        <RegistrationForm />
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Already have an account?
          </p>
          <Button asChild variant="outline" className="w-full max-w-md mx-auto">
            <Link to="/login">
              Login to Your Account
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}