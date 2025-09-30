import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Github,
  Chrome,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Zap,
  User,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { session, signupNewUser } = useAuth();

  console.log(session);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const res = await signupNewUser(data.username, data.email, data.password);

      // Handle successful registration
      if (res.success) {
        console.log("Registration successful:", res.data);

        navigate("/dashboard");
      }
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "Registration failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-8 px-2 sm:px-4 lg:px-6">
      <Card className="w-full max-w-lg relative overflow-hidden border-0 shadow-none">
        <div className="relative bg-white/95 backdrop-blur-sm rounded-lg">
          <CardHeader className="space-y-1 text-center pb-6">
            <CardTitle className="text-3xl font-mozilla font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Create Account
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg font-geist">
              Join us today and get started
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Username Field */}
              <div className="space-y-3">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700 flex items-center"
                >
                  Username
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className="pl-10 border-2 border-gray-200 focus:border-green-500 transition-all duration-300"
                    {...register("username", {
                      required: "Username is required",
                      minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Username must be less than 20 characters",
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9_]+$/,
                        message:
                          "Username can only contain letters, numbers, and underscores",
                      },
                    })}
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.username && (
                  <p className="text-sm text-red-500 flex items-center">
                    <Zap className="h-3 w-3 mr-1" />
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-3">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 flex items-center"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10 border-2 border-gray-200 focus:border-blue-500 transition-all duration-300"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500 flex items-center">
                    <Zap className="h-3 w-3 mr-1" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 flex items-center"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="pl-10 pr-10 border-2 border-gray-200 focus:border-purple-500 transition-all duration-300"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                        message:
                          "Password must contain uppercase, lowercase, and number",
                      },
                    })}
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 flex items-center">
                    <Zap className="h-3 w-3 mr-1" />
                    {errors.password.message}
                  </p>
                )}

                {/* Password strength indicator */}
                <div className="text-xs text-gray-500 space-y-1">
                  <div className="flex items-center">
                    <Zap className="h-3 w-3 mr-1 text-gray-400" />
                    At least 8 characters
                  </div>
                  <div className="flex items-center">
                    <Zap className="h-3 w-3 mr-1 text-gray-400" />
                    Uppercase & lowercase letters
                  </div>
                  <div className="flex items-center">
                    <Zap className="h-3 w-3 mr-1 text-gray-400" />
                    At least one number
                  </div>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-3">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700 flex items-center"
                >
                  <Lock className="h-4 w-4 mr-2 text-purple-500" />
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pl-10 border-2 border-gray-200 focus:border-purple-500 transition-all duration-300"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 flex items-center">
                    <Zap className="h-3 w-3 mr-1" />
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {errors.root && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 text-center flex items-center justify-center">
                    <Zap className="h-4 w-4 mr-2" />
                    {errors.root.message}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3 rounded-md tshadow-none cursor-pointer font-geist"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create Account
                  </div>
                )}
              </Button>
            </form>

            {/* Login link */}
            <div className="text-center border-t border-gray-200">
              <p className="text-gray-600 text-sm mt-2">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="p-0 text-green-500 hover:text-green-600 font-semibold"
                >
                  Sign in instead
                </Link>
              </p>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default RegisterForm;
