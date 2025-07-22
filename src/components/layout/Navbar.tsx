import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Heart,
  User,
  LogOut,
  Calendar,
  FileText,
  Menu,
  X,
  Bell,
  Settings
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext'; // ✅ import theme context
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme(); // ✅ use theme
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: User },
    { path: '/appointments', label: 'Appointments', icon: Calendar },
    { path: '/prescriptions', label: 'Prescriptions', icon: FileText }
  ];

  const notifications = [
    {
      id: 1,
      title: 'Appointment Reminder',
      message: 'Your appointment is tomorrow at 2:00 PM',
      time: '2h ago'
    },
    {
      id: 2,
      title: 'Prescription Ready',
      message: 'Your prescription is ready for pickup',
      time: '4h ago'
    },
    {
      id: 3,
      title: 'Health Report',
      message: 'Your latest test results are available',
      time: '1d ago'
    }
  ];

  return (
    <>
      <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-2xl border-b border-purple-500/20 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand */}
            <Link to="/dashboard" className="flex items-center space-x-3 group">
              <div className="relative">
                <Heart className="h-10 w-10 text-pink-400 group-hover:text-pink-300 transition-all duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 h-10 w-10 text-pink-400 animate-ping opacity-20 group-hover:opacity-30">
                  <Heart className="h-10 w-10" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  HealthTracker
                </span>
                <span className="text-xs text-purple-300 block -mt-1">Pro</span>
              </div>
            </Link>

            {/* User Navigation */}
            {user && (
              <>
                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden
                          ${
                            isActive
                              ? 'text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg'
                              : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                      >
                        {!isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        )}
                        <Icon
                          className={`h-4 w-4 relative z-10 ${
                            isActive ? 'animate-pulse' : 'group-hover:scale-110'
                          } transition-transform duration-300`}
                        />
                        <span className="relative z-10">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-4">
                  {/* Toggle Theme */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                    className="text-gray-300 hover:text-white hover:bg-white/10 transition"
                  >
                    {isDarkMode ? '☀️' : '🌙'}
                  </Button>

                  {/* Notifications */}
                  <div className="relative">
                    <button
                      onClick={() => setShowNotifications(!showNotifications)}
                      className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition"
                    >
                      <Bell className="h-5 w-5" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    </button>

                    {showNotifications && (
                      <div className="absolute right-0 mt-2 w-80 bg-slate-800/95 backdrop-blur-lg rounded-xl shadow-2xl border border-purple-500/20 z-50">
                        <div className="p-4">
                          <h3 className="text-white font-semibold mb-3">
                            Notifications
                          </h3>
                          <div className="space-y-3">
                            {notifications.map((n) => (
                              <div
                                key={n.id}
                                className="bg-white/10 rounded-lg p-3 hover:bg-white/15"
                              >
                                <div className="text-white text-sm font-medium">
                                  {n.title}
                                </div>
                                <div className="text-gray-300 text-xs mt-1">
                                  {n.message}
                                </div>
                                <div className="text-purple-300 text-xs mt-2">
                                  {n.time}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Settings */}
                  <Link
                    to="/settings"
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition"
                  >
                    <Settings className="h-5 w-5" />
                  </Link>

                  {/* User Info */}
                  <div className="flex items-center space-x-3 bg-white/10 rounded-xl px-4 py-2 backdrop-blur-sm">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user.firstName?.charAt(0)}
                        {user.lastName?.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-300">
                      Hello,{' '}
                      <span className="text-white font-medium">
                        {user.firstName}
                      </span>
                    </span>
                  </div>

                  {/* Logout */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 transition"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                  <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition"
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {user && isMobileMenuOpen && (
          <div className="md:hidden border-t border-purple-500/20 bg-slate-800/50 backdrop-blur-lg">
            <div className="px-4 pt-4 pb-6 space-y-3">
              {/* User Info */}
              <div className="flex items-center space-x-3 bg-white/10 rounded-xl px-4 py-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user.firstName?.charAt(0)}
                    {user.lastName?.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-white font-medium">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-gray-300 text-sm">{user.email}</div>
                </div>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 w-full transition"
              >
                <span>{isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
              </button>

              {/* Navigation Links */}
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-purple-600 to-pink-600'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Mobile Actions */}
              <Link
                to="/settings"
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-red-500/20 w-full transition"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Overlay for mobile or notifications */}
      {(isMobileMenuOpen || showNotifications) && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => {
            setIsMobileMenuOpen(false);
            setShowNotifications(false);
          }}
        />
      )}
    </>
  );
};
