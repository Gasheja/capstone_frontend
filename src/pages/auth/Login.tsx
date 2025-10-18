// pages/auth/Login.tsx
import { LoginForm } from "@/components/login-form"
// import { Button } from "@/components/ui/button"
// import { Link } from "react-router-dom"

export default function Login() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="text-center">
        <h2 className="font-bold text-2xl mb-2">Congo Decision Support System</h2>
        <p className="text-muted-foreground">Government Citizen Management Platform</p>
      </div>
      
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
        
        
      </div>
    </div>
  )
}