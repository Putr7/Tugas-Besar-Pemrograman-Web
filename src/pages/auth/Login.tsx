import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../services/auth.service';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const loginAction = useAuthStore((state) => state.login);

  const roles = ['Konsultan', 'Kontraktor', 'Dinas', 'Eksternal'];
  const [selectedRole, setSelectedRole] = useState('Konsultan');
  const [username, setUsername] = useState('konsultan');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    searchParams.get('session_expired')
      ? 'Sesi Anda telah berakhir. Silakan login kembali.'
      : null
  );

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setUsername(role.toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      setIsLoading(true);
      const res = await authService.login({
        username: username || selectedRole.toLowerCase(),
        password,
        role: selectedRole,
        rememberMe,
      });

      loginAction(res.data.token, res.data.user);
      const redirectPath = searchParams.get('returnUrl') || '/dashboard';
      navigate(redirectPath, { replace: true });
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || 'Gagal masuk. Silakan periksa kembali kredensial Anda.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-corporate-border p-8 sm:p-10">
      {/* 1. Logo */}
      <div className="flex justify-center mb-8">
        <img
          src="/assets/images/logoRev.png"
          alt="Tata Saka Logo"
          className="h-28 object-contain"
          onError={(e) => {
            // fallback if path issues
            (e.target as HTMLImageElement).src = '/images/logoRev.png';
          }}
        />
      </div>

      {/* 2. Welcome Text */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Selamat Datang</h1>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
          Silahkan masuk ke akun anda
          <br />
          untuk melanjutkan.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-status-danger text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 3. Role Selector */}
      <div className="mb-6">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {roles.map((role) => {
            const isSelected = selectedRole === role;
            return (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleChange(role)}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-corporate-navy text-white shadow-sm'
                    : 'bg-corporate-slateLighter text-corporate-slate border border-corporate-border hover:bg-slate-200'
                }`}
              >
                {role}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Username */}
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={selectedRole.toLowerCase()}
            className="w-full px-4 py-3.5 bg-[#F8FAFC] border border-transparent focus:border-corporate-navy focus:bg-white rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
            required
          />
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
            className="w-full px-4 py-3.5 bg-[#F8FAFC] border border-transparent focus:border-corporate-navy focus:bg-white rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all pr-11"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-slate-300 text-corporate-navy focus:ring-corporate-navy cursor-pointer"
          />
          <label htmlFor="rememberMe" className="text-sm font-medium text-slate-700 cursor-pointer select-none">
            Ingat saya
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-corporate-navy text-white rounded-xl font-bold text-sm hover:bg-corporate-slateDark transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-corporate-navy disabled:opacity-60"
          >
            {isLoading ? 'Memproses...' : 'Masuk'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
