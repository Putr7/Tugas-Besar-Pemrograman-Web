import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, LogIn, UserPlus, Lock, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../services/auth.service';
import { useToast } from '../../store/toastStore';
import { validateUsername, validatePassword } from '../../utils/validation';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const loginAction = useAuthStore((state) => state.login);
  const toast = useToast();

  const roles = ['Konsultan', 'Kontraktor', 'Dinas', 'Eksternal'];
  const [selectedRole, setSelectedRole] = useState('Konsultan');
  const [username, setUsername] = useState('konsultan');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<{ username?: string; password?: string }>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(
    searchParams.get('session_expired')
      ? 'Sesi Anda telah berakhir. Silakan login kembali.'
      : null
  );

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setUsername(role.toLowerCase());
    setFieldErrors((prev) => ({ ...prev, username: undefined }));
  };

  const validateForm = (): boolean => {
    const errors: { username?: string; password?: string } = {};

    const uErr = validateUsername(username);
    if (uErr) errors.username = uErr;

    const pErr = validatePassword(password);
    if (pErr) errors.password = pErr;

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validateForm()) {
      toast.error('Silakan perbaiki kesalahan input pada form terlebih dahulu.', 'Validasi Gagal');
      return;
    }

    try {
      setIsLoading(true);

      const res = await authService.login({
        username: username.trim(),
        password,
        role: selectedRole,
        rememberMe,
      });

      loginAction(res.data.token, res.data.user);

      toast.success(
        `Selamat datang kembali, ${res.data.user.name || username}!`,
        'Login Berhasil'
      );

      const redirectPath = searchParams.get('returnUrl') || '/dashboard';
      navigate(redirectPath, { replace: true });
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        'Gagal masuk. Silakan periksa kembali username dan kata sandi Anda.';
      setErrorMessage(msg);
      toast.error(msg, 'Autentikasi Gagal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-corporate-border p-8 sm:p-10">
      <div className="flex justify-center mb-6">
        <img
          src="/assets/images/logoRev.png"
          alt="Tata Saka Logo"
          className="h-24 object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/logoRev.png';
          }}
        />
      </div>

      <div className="text-center mb-6">
        <h1 className="text-2xl font-black text-corporate-navy tracking-tight">Selamat Datang</h1>
        <p className="text-xs text-corporate-slate mt-1.5 leading-relaxed">
          Sistem Informasi Pengawasan & Manajemen Proyek Konstruksi
          <br />
          <strong className="text-corporate-navy">CV. TATA SAKA CONSULTANT</strong>
        </p>
      </div>

      {errorMessage && (
        <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-status-danger text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-[11px] font-bold text-corporate-navy uppercase tracking-wider mb-2">
          Pilih Peran / Akses:
        </label>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {roles.map((role) => {
            const isSelected = selectedRole === role;
            return (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleChange(role)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
            Username Pengguna
          </label>
          <div
            className={`flex items-center px-3.5 py-2.5 bg-[#F8FAFC] border rounded-xl transition-all ${
              fieldErrors.username
                ? 'border-status-danger ring-1 ring-status-danger bg-red-50/20'
                : 'border-corporate-border focus-within:border-corporate-navy focus-within:bg-white'
            }`}
          >
            <UserIcon className="w-4 h-4 text-corporate-slate mr-2.5 shrink-0" />
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (fieldErrors.username) {
                  setFieldErrors((prev) => ({ ...prev, username: undefined }));
                }
              }}
              placeholder="Masukkan username"
              className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
            />
          </div>
          {fieldErrors.username && (
            <span className="text-[11px] font-medium text-status-danger mt-1 block">
              {fieldErrors.username}
            </span>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
            Kata Sandi
          </label>
          <div
            className={`flex items-center px-3.5 py-2.5 bg-[#F8FAFC] border rounded-xl transition-all ${
              fieldErrors.password
                ? 'border-status-danger ring-1 ring-status-danger bg-red-50/20'
                : 'border-corporate-border focus-within:border-corporate-navy focus-within:bg-white'
            }`}
          >
            <Lock className="w-4 h-4 text-corporate-slate mr-2.5 shrink-0" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) {
                  setFieldErrors((prev) => ({ ...prev, password: undefined }));
                }
              }}
              placeholder="••••••"
              className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-corporate-slate hover:text-corporate-navy focus:outline-none ml-2"
              aria-label={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {fieldErrors.password && (
            <span className="text-[11px] font-medium text-status-danger mt-1 block">
              {fieldErrors.password}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-corporate-navy focus:ring-corporate-navy cursor-pointer"
            />
            <span className="text-xs font-medium text-slate-700">Ingat sesi saya</span>
          </label>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-corporate-navy text-white rounded-xl font-bold text-sm hover:bg-corporate-slateDark transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
          >
            {isLoading ? (
              <span>Memproses Autentikasi...</span>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Masuk ke Sistem</span>
              </>
            )}
          </button>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-corporate-border text-center">
        <p className="text-xs text-corporate-slate">
          Belum memiliki akun pengawas atau kontraktor?
        </p>
        <Link
          to="/register"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-corporate-navy hover:underline mt-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Daftar Akun Baru Disini</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;
