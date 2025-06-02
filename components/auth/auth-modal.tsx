"use client"

import type React from "react"

import { useState } from "react"
import { X, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: "login" | "register" | "change-password"
}

export function AuthModal({ isOpen, onClose, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register" | "change-password">(initialMode)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    fullName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  })

  // Change password form state
  const [changePasswordForm, setChangePasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  if (!isOpen) return null

  const handleLoginChange = (field: string, value: any) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleRegisterChange = (field: string, value: any) => {
    setRegisterForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleChangePasswordChange = (field: string, value: any) => {
    setChangePasswordForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Mock API call - replace with actual API call
      const response = await fetch("http://localhost:3001/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      // Store token in localStorage or a secure cookie
      localStorage.setItem("token", data.token)

      toast({
        title: "Login successful",
        description: "You have been logged in successfully.",
        variant: "default",
      })

      onClose()
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An error occurred during login",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Mock API call - replace with actual API call
      const response = await fetch("http://localhost:3001/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: registerForm.fullName,
          email: registerForm.email,
          password: registerForm.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Registration failed")
      }

      toast({
        title: "Registration successful",
        description: "Your account has been created successfully. Please log in.",
        variant: "default",
      })

      // Switch to login tab
      setMode("login")
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An error occurred during registration",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords match
    if (changePasswordForm.newPassword !== changePasswordForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation password must match",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Get token from localStorage
      const token = localStorage.getItem("token")

      if (!token) {
        throw new Error("You must be logged in to change your password")
      }

      const response = await fetch("http://localhost:3001/api/v1/auth/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          oldPassword: changePasswordForm.oldPassword,
          newPassword: changePasswordForm.newPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password")
      }

      toast({
        title: "Password changed",
        description: "Your password has been changed successfully",
        variant: "default",
      })

      // Reset form and close modal
      setChangePasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      onClose()
    } catch (error) {
      toast({
        title: "Failed to change password",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4" onClick={onClose}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
      <div
        className="bg-white relative rounded-lg shadow-xl w-full max-w-md max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <Tabs defaultValue={mode} onValueChange={(value) => setMode(value as any)} className="w-full">
          <div className="px-6 pt-6">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
              <TabsTrigger value="change-password">Change Password</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="login" className="p-6 pt-4">
            <div className="text-center mb-6">
              <p className="text-gray-600">Enter your email and password to login</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <Label htmlFor="login-email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => handleLoginChange("email", e.target.value)}
                  className="mt-1 w-full"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <Label htmlFor="login-password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={loginForm.password}
                    onChange={(e) => handleLoginChange("password", e.target.value)}
                    className="w-full pr-10"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    checked={loginForm.rememberMe}
                    onChange={(e) => handleLoginChange("rememberMe", e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-green-600 hover:text-green-700">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" className="w-full bg-orange-500 hover:bg-green-700 text-white" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="p-6 pt-4">
            <div className="text-center mb-6">
              <p className="text-gray-600">Create your account to get started</p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <Label htmlFor="register-name" className="text-sm font-medium text-gray-700">
                  Full Name
                </Label>
                <Input
                  id="register-name"
                  type="text"
                  value={registerForm.fullName}
                  onChange={(e) => handleRegisterChange("fullName", e.target.value)}
                  className="mt-1 w-full"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="register-email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="register-email"
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => handleRegisterChange("email", e.target.value)}
                  className="mt-1 w-full"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <Label htmlFor="register-password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    value={registerForm.password}
                    onChange={(e) => handleRegisterChange("password", e.target.value)}
                    className="w-full pr-10"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-orange-500 focus:ring-green-500"
                  checked={registerForm.agreeToTerms}
                  onChange={(e) => handleRegisterChange("agreeToTerms", e.target.checked)}
                  required
                />
                <span className="ml-2 text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="#" className="text-green-600 hover:text-green-700">
                    Terms and Conditions
                  </a>
                </span>
              </div>

              <Button type="submit" className="w-full bg-orange-500 hover:bg-green-700 text-white" disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="change-password" className="p-6 pt-4">
            <div className="text-center mb-6">
              <p className="text-gray-600">Change your account password</p>
            </div>

            <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
              <div>
                <Label htmlFor="old-password" className="text-sm font-medium text-gray-700">
                  Current Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="old-password"
                    type={showPassword ? "text" : "password"}
                    value={changePasswordForm.oldPassword}
                    onChange={(e) => handleChangePasswordChange("oldPassword", e.target.value)}
                    className="w-full pr-10"
                    placeholder="Enter your current password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="new-password" className="text-sm font-medium text-gray-700">
                  New Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    value={changePasswordForm.newPassword}
                    onChange={(e) => handleChangePasswordChange("newPassword", e.target.value)}
                    className="w-full pr-10"
                    placeholder="Enter your new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
                  Confirm New Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="confirm-password"
                    type={showNewPassword ? "text" : "password"}
                    value={changePasswordForm.confirmPassword}
                    onChange={(e) => handleChangePasswordChange("confirmPassword", e.target.value)}
                    className="w-full pr-10"
                    placeholder="Confirm your new password"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-orange-600 hover:bg-green-700 text-white" disabled={isLoading}>
                {isLoading ? "Changing Password..." : "Change Password"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
