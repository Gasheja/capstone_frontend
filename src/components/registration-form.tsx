// components/registration-form.tsx
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useAuthContext } from "./auth/useAuthContext"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Link } from "react-router-dom"

export function RegistrationForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [formData, setFormData] = useState({
    // User account fields
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  
  const { register } = useAuthContext()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: []
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setIsLoading(true)

    if (!register) {
      setIsLoading(false)
      toast.error("Registration service unavailable")
      return
    }

    const promise = register({ ...formData, role: 'citizen' })

    toast.promise(
      promise,
      {
        loading: "Creating your account...",
        success: () => {
          navigate("/", { replace: true })
          return "Registration successful! Welcome to the system."
        },
        error: (err: any) => {
          if (err.response?.data?.errors) {
            setErrors(err.response.data.errors)
            return "Please fix the errors below."
          }
          return err.response?.data?.message || "Registration failed. Please try again."
        },
        finally: () => {
          setIsLoading(false)
        }
      }
    )
  }

  const getFieldError = (fieldName: string) => {
    return errors[fieldName]?.[0] || ""
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Citizen Registration</CardTitle>
          <CardDescription>
            Create your citizen account to access government services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {/* Account Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                  Account Information
                </h3>
                
                {/* Name and Email on same row */}
                <div className="space-y-2">
                  <Field>
                    <FieldLabel htmlFor="name">Full Name *</FieldLabel>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className={getFieldError('name') ? 'border-red-500' : ''}
                    />
                    {getFieldError('name') && (
                      <p className="text-sm text-red-600 mt-1">{getFieldError('name')}</p>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="email">Email Address *</FieldLabel>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className={getFieldError('email') ? 'border-red-500' : ''}
                    />
                    {getFieldError('email') && (
                      <p className="text-sm text-red-600 mt-1">{getFieldError('email')}</p>
                    )}
                  </Field>
                </div>

                {/* Password and Confirm Password on same row */}
               <div className="space-y-2">
                  <Field>
                    <FieldLabel htmlFor="password">Password *</FieldLabel>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      minLength={6}
                      className={getFieldError('password') ? 'border-red-500' : ''}
                    />
                    {getFieldError('password') && (
                      <p className="text-sm text-red-600 mt-1">{getFieldError('password')}</p>
                    )}
                    <FieldDescription>
                      Min. 6 characters
                    </FieldDescription>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="password_confirmation">Confirm Password *</FieldLabel>
                    <Input
                      id="password_confirmation"
                      name="password_confirmation"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.password_confirmation}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className={getFieldError('password_confirmation') ? 'border-red-500' : ''}
                    />
                    {getFieldError('password_confirmation') && (
                      <p className="text-sm text-red-600 mt-1">{getFieldError('password_confirmation')}</p>
                    )}
                    <FieldDescription>
                      Must match password
                    </FieldDescription>
                  </Field>
                </div>
              </div>

             

              {/* Submit Button */}
              <Field className="pt-4">
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-3 text-base font-medium"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating Account...
                    </>
                  ) : (
                    "Register as Citizen"
                  )}
                </Button>
                <FieldDescription className="text-center pt-2">
                  Already have an account?{" "}
                  <Link
                    to="/login" 
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Login here
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}