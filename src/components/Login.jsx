import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Chrome, Mail, Lock, Eye, EyeOff, Sparkles, Zap } from 'lucide-react';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      console.log('Login data:', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'Login failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login');
  };

  const handleGithubLogin = () => {
    console.log('GitHub login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      

      <Card className="w-full max-w-lg relative overflow-hidden border-0 ">
        {/* Gradient border effect */}
        <div className="relative bg-white/95 backdrop-blur-sm rounded-lg">
          <CardHeader className="space-y-1 text-center pb-9">
            <CardTitle className="font-bold text-2xl font-jakarta">Welcome</CardTitle>
            <CardDescription className="text-gray-800 capitalize font-semibold text-xl font-mozilla ">
              Sign in to your account
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center">
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10 py-4 border-1 border-gray-100  transition-all duration-300"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
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
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 border-1 border-gray-200 focus:border-purple-500 transition-all duration-300"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 flex items-center">
                    <Zap className="h-3 w-3 mr-1" />
                    {errors.password.message}
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
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-sm transition-all duration-300 font-jakarta cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Sign In
                  </div>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-3 text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                type="button" 
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="border-2 border-gray-200 hover:bg-gray-200 hover:border-gray-200 hover:text-gray-800 cursor-pointer transition-all duration-300 py-3"
              >
                <Chrome className="mr-2 h-5 w-5 text-red-500" />
                <span className="font-medium">Google</span>
              </Button>
              <Button 
                variant="outline" 
                type="button" 
                onClick={handleGithubLogin}
                disabled={isLoading}
                className="border-2 border-gray-200 hover:bg-gray-200 hover:border-gray-200 hover:text-gray-800 cursor-pointer  transition-all duration-300 py-3"
              >
                <Github className="mr-2 h-5 w-5 text-gray-800" />
                <span className="font-medium">GitHub</span>
              </Button>
            </div>

            {/* Sign up link */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Button variant="link" className="p-0 text-blue-500 hover:text-blue-600 font-semibold">
                  Sign up now
                </Button>
              </p>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;