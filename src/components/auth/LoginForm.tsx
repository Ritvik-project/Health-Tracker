import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

export const LoginForm: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const result = await login(email, password);

    if (result === 'success') {
      navigate('/dashboard');
    } else if (result === 'not_registered') {
      setErrorMessage('You are not registered. Please register first.');
    } else if (result === 'invalid_password') {
      setErrorMessage('Incorrect password. Please try again.');
    } else {
      setErrorMessage('An unknown error occurred.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-900 p-4">
      <Card className="w-full max-w-md p-6 bg-white/10 backdrop-blur-lg border border-white/20 text-white">
        <div className="text-center mb-6">
          <Heart className="mx-auto text-pink-400 w-12 h-12 animate-pulse" />
          <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
          <p className="text-gray-300">Sign in to your account</p>
        </div>

        {errorMessage && (
          <div className="mb-4 bg-red-600 bg-opacity-30 text-red-300 px-4 py-2 rounded">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="Email Address"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="h-5 w-5" />}
          />

          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="h-5 w-5" />}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-300 hover:text-gray-200"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full bg-pink-500 hover:bg-pink-600">
            Login
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-300">
          Don't have an account?{' '}
          <Link to="/register" className="text-pink-400 underline hover:text-pink-300">
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
};
