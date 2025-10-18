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
    
    // Citizen-specific fields
    national_id: "",
    full_name: "",
    date_of_birth: "",
    address: "",
    phone_number: "",
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              {/* Citizen Information */}
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-semibold text-foreground border-b pb-2">
                  Citizen Information
                </h3>
                
                {/* National ID and Full Name on same row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="national_id">National ID *</FieldLabel>
                    <Input
                      id="national_id"
                      name="national_id"
                      type="text"
                      placeholder="1234567890"
                      value={formData.national_id}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className={getFieldError('national_id') ? 'border-red-500' : ''}
                    />
                    {getFieldError('national_id') && (
                      <p className="text-sm text-red-600 mt-1">{getFieldError('national_id')}</p>
                    )}
                    <FieldDescription>
                      Your national identification
                    </FieldDescription>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="full_name">Legal Full Name *</FieldLabel>
                    <Input
                      id="full_name"
                      name="full_name"
                      type="text"
                      placeholder="John Michael Doe"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className={getFieldError('full_name') ? 'border-red-500' : ''}
                    />
                    {getFieldError('full_name') && (
                      <p className="text-sm text-red-600 mt-1">{getFieldError('full_name')}</p>
                    )}
                    <FieldDescription>
                      As on official ID
                    </FieldDescription>
                  </Field>
                </div>

                {/* Date of Birth and Phone Number on same row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="date_of_birth">Date of Birth *</FieldLabel>
                    <Input
                      id="date_of_birth"
                      name="date_of_birth"
                      type="date"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className={getFieldError('date_of_birth') ? 'border-red-500' : ''}
                    />
                    {getFieldError('date_of_birth') && (
                      <p className="text-sm text-red-600 mt-1">{getFieldError('date_of_birth')}</p>
                    )}
                    <FieldDescription>
                      Your birth date
                    </FieldDescription>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="phone_number">Phone Number *</FieldLabel>
                    <Input
                      id="phone_number"
                      name="phone_number"
                      type="tel"
                      placeholder="+1234567890"
                      value={formData.phone_number}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className={getFieldError('phone_number') ? 'border-red-500' : ''}
                    />
                    {getFieldError('phone_number') && (
                      <p className="text-sm text-red-600 mt-1">{getFieldError('phone_number')}</p>
                    )}
                    <FieldDescription>
                      Your contact number
                    </FieldDescription>
                  </Field>
                </div>

                {/* Address - Full width */}
                <Field>
                  <FieldLabel htmlFor="address">Complete Address *</FieldLabel>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Enter your complete residential address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className={getFieldError('address') ? 'border-red-500' : ''}
                  />
                  {getFieldError('address') && (
                    <p className="text-sm text-red-600 mt-1">{getFieldError('address')}</p>
                  )}
                  <FieldDescription>
                    Street, City, State, ZIP Code
                  </FieldDescription>
                </Field>
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
                  <a 
                    href="/login" 
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Login here
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}