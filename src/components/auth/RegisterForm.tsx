import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Calendar, Heart, Eye, EyeOff, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

export const RegisterForm: React.FC = () => {
  const { register, isLoading, isEmailRegistered } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleEmailBlur = () => {
    if (formData.email && isEmailRegistered(formData.email)) {
      setErrors(prev => ({ ...prev, email: 'This email is already registered.' }));
    }
  };

  const nextStep = () => {
    const stepErrors: Record<string, string> = {};

    if (!formData.firstName) stepErrors.firstName = 'First name is required';
    if (!formData.lastName) stepErrors.lastName = 'Last name is required';

    if (!formData.email) {
      stepErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      stepErrors.email = 'Email is invalid';
    } else if (isEmailRegistered(formData.email)) {
      stepErrors.email = 'This email is already registered.';
    }

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setCurrentStep(2);
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitErrors: Record<string, string> = {};

    if (!formData.phone) submitErrors.phone = 'Phone is required';
    if (!formData.dateOfBirth) submitErrors.dateOfBirth = 'Date of birth is required';

    if (!formData.password) {
      submitErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      submitErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      submitErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(submitErrors).length > 0) {
      setErrors(submitErrors);
      return;
    }

    const success = await register(formData);

    if (success) {
      navigate('/dashboard');
    } else {
      setErrors({ email: 'This email is already registered.' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-900 p-4">
      <Card className="w-full max-w-lg p-6 bg-white/10 backdrop-blur-lg border border-white/20 text-white">
        <div className="text-center mb-6">
          <Heart className="mx-auto text-green-400 w-12 h-12 animate-pulse" />
          <h1 className="text-2xl font-bold mt-2">Create Your Account</h1>
          <p className="text-sm text-gray-300 mb-2">Step {currentStep}/2</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  name="firstName"
                  label="First Name"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                  icon={<User className="h-5 w-5" />}
                />

                <Input
                  name="lastName"
                  label="Last Name"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                  icon={<User className="h-5 w-5" />}
                />
              </div>

              <Input
                type="email"
                name="email"
                label="Email Address"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleEmailBlur}
                error={errors.email}
                icon={<Mail className="h-5 w-5" />}
              />

              <Button type="button" onClick={nextStep} className="w-full">
                Continue
              </Button>
            </>
          )}

          {currentStep === 2 && (
            <>
              <Input
                name="phone"
                label="Phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                icon={<Phone className="h-5 w-5" />}
              />

              <Input
                type="date"
                name="dateOfBirth"
                label="Date of Birth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                error={errors.dateOfBirth}
                icon={<Calendar className="h-5 w-5" />}
              />

              <Input
                type="password"
                name="password"
                label="Password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                icon={<Lock className="h-5 w-5" />}
              />

              <Input
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                icon={<Lock className="h-5 w-5" />}
              />

              <div className="flex gap-2">
                <Button type="button" onClick={prevStep} variant="outline" className="w-1/2">
                  Back
                </Button>
                <Button type="submit" isLoading={isLoading} className="w-1/2">
                  <Check className="h-4 w-4 mr-1" /> Register
                </Button>
              </div>
            </>
          )}
        </form>

        <p className="mt-6 text-center text-sm text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-300 underline">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
};
