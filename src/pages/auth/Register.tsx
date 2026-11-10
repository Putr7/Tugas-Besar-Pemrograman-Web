import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  Building,
  Lock,
  Eye,
  EyeOff,
  UserCheck,
  ArrowLeft,
} from 'lucide-react';
import { authService } from '../../services/auth.service';
import { useToast } from '../../store/toastStore';
import { SuccessStateModal } from '../../components/ui/SuccessStateModal';
import {
  validateRequired,
  validateEmail,
  validateUsername,
  validatePassword,
  validatePhone,
} from '../../utils/validation';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const roles = ['Konsultan', 'Kontraktor', 'Dinas', 'Eksternal'];

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    role: 'Konsultan',
    agency: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [registeredSummary, setRegisteredSummary] = useState<Array<{ label: string; value: string }>>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    const nameErr = validateRequired(formData.name, 'Nama lengkap');
    if (nameErr) errors.name = nameErr;

    const usernameErr = validateUsername(formData.username);
    if (usernameErr) errors.username = usernameErr;

    const emailErr = validateEmail(formData.email);
    if (emailErr) errors.email = emailErr;

    const phoneErr = validatePhone(formData.phone);
    if (phoneErr) errors.phone = phoneErr;

    const passErr = validatePassword(formData.password);
    if (passErr) errors.password = passErr;

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Konfirmasi kata sandi tidak cocok dengan kata sandi.';
    }

    if (!formData.agreeTerms) {
      errors.agreeTerms = 'Anda harus menyetujui ketentuan dan kebijakan privasi.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Mohon lengkapi dan perbaiki isian form yang ditandai merah.', 'Validasi Form Gagal');
      return;
    }

    try {
      setIsLoading(true);

      const response = await authService.register({
        name: formData.name.trim(),
        username: formData.username.trim().toLowerCase(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        role: formData.role,
        agency: formData.agency.trim() || undefined,
        password: formData.password,
      });

      toast.success(
        'Akun Anda berhasil didaftarkan ke sistem CV. Tata Saka Consultant.',
        'Pendaftaran Berhasil'
      );

      setRegisteredSummary([
        { label: 'Nama Lengkap', value: response.data.user.name },
        { label: 'Username', value: response.data.user.username },
        { label: 'Peran / Hak Akses', value: response.data.user.role },
        { label: 'Email Terdaftar', value: response.data.user.email || formData.email },
      ]);
      setIsSuccessModalOpen(true);
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Terjadi kesalahan saat mendaftarkan akun. Coba lagi nanti.';
      toast.error(msg, 'Registrasi Gagal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-corporate-border p-8 sm:p-10 my-8">
      <Link
        to="/login"
        className="inline-flex items-center gap-2 text-xs font-semibold text-corporate-slate hover:text-corporate-navy mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Halaman Masuk</span>
      </Link>

      <div className="text-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-corporate-slateLighter text-corporate-navy flex items-center justify-center mx-auto mb-3 shadow-sm border border-corporate-border">
          <UserCheck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black text-corporate-navy tracking-tight">
          Daftar Akun Baru
        </h1>
        <p className="text-xs text-corporate-slate mt-1.5 leading-relaxed">
          Registrasi Akun Anggota Tim Pengawasan, Rekan Kontraktor, atau Dinas
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-corporate-navy uppercase tracking-wider mb-2">
            Peran Pengguna (Role) <span className="text-status-danger">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {roles.map((role) => {
              const isSelected = formData.role === role;
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, role }))}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all text-center border ${
                    isSelected
                      ? 'bg-corporate-navy text-white border-corporate-navy shadow-sm'
                      : 'bg-[#F8FAFC] text-corporate-slate border-corporate-border hover:bg-slate-100'
                  }`}
                >
                  {role}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
              Nama Lengkap <span className="text-status-danger">*</span>
            </label>
            <div
              className={`flex items-center px-3.5 py-2.5 bg-[#F8FAFC] border rounded-xl ${
                fieldErrors.name
                  ? 'border-status-danger ring-1 ring-status-danger bg-red-50/20'
                  : 'border-corporate-border focus-within:border-corporate-navy focus-within:bg-white'
              }`}
            >
              <User className="w-4 h-4 text-corporate-slate mr-2.5 shrink-0" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Contoh: Budi Santoso, ST"
                className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>
            {fieldErrors.name && (
              <span className="text-[11px] font-medium text-status-danger mt-1 block">
                {fieldErrors.name}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
              Username <span className="text-status-danger">*</span>
            </label>
            <div
              className={`flex items-center px-3.5 py-2.5 bg-[#F8FAFC] border rounded-xl ${
                fieldErrors.username
                  ? 'border-status-danger ring-1 ring-status-danger bg-red-50/20'
                  : 'border-corporate-border focus-within:border-corporate-navy focus-within:bg-white'
              }`}
            >
              <span className="text-xs text-corporate-slate font-bold mr-1.5">@</span>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="budisantoso"
                className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>
            {fieldErrors.username && (
              <span className="text-[11px] font-medium text-status-danger mt-1 block">
                {fieldErrors.username}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
              Alamat Email (RFC) <span className="text-status-danger">*</span>
            </label>
            <div
              className={`flex items-center px-3.5 py-2.5 bg-[#F8FAFC] border rounded-xl ${
                fieldErrors.email
                  ? 'border-status-danger ring-1 ring-status-danger bg-red-50/20'
                  : 'border-corporate-border focus-within:border-corporate-navy focus-within:bg-white'
              }`}
            >
              <Mail className="w-4 h-4 text-corporate-slate mr-2.5 shrink-0" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="nama@email.com"
                className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>
            {fieldErrors.email && (
              <span className="text-[11px] font-medium text-status-danger mt-1 block">
                {fieldErrors.email}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
              Nomor WhatsApp / HP <span className="text-status-danger">*</span>
            </label>
            <div
              className={`flex items-center px-3.5 py-2.5 bg-[#F8FAFC] border rounded-xl ${
                fieldErrors.phone
                  ? 'border-status-danger ring-1 ring-status-danger bg-red-50/20'
                  : 'border-corporate-border focus-within:border-corporate-navy focus-within:bg-white'
              }`}
            >
              <Phone className="w-4 h-4 text-corporate-slate mr-2.5 shrink-0" />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="081234567890"
                className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>
            {fieldErrors.phone && (
              <span className="text-[11px] font-medium text-status-danger mt-1 block">
                {fieldErrors.phone}
              </span>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
            Instansi / Dinas / Perusahaan Asal (Opsional)
          </label>
          <div className="flex items-center px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl focus-within:border-corporate-navy focus-within:bg-white">
            <Building className="w-4 h-4 text-corporate-slate mr-2.5 shrink-0" />
            <input
              type="text"
              name="agency"
              value={formData.agency}
              onChange={handleChange}
              placeholder="Contoh: DPUPR Kab. Purbalingga / PT. Kontraktor Maju"
              className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
              Kata Sandi <span className="text-status-danger">*</span>
            </label>
            <div
              className={`flex items-center px-3.5 py-2.5 bg-[#F8FAFC] border rounded-xl ${
                fieldErrors.password
                  ? 'border-status-danger ring-1 ring-status-danger bg-red-50/20'
                  : 'border-corporate-border focus-within:border-corporate-navy focus-within:bg-white'
              }`}
            >
              <Lock className="w-4 h-4 text-corporate-slate mr-2.5 shrink-0" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min 6 karakter"
                className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-corporate-slate hover:text-corporate-navy ml-2 focus:outline-none"
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

          <div>
            <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
              Konfirmasi Sandi <span className="text-status-danger">*</span>
            </label>
            <div
              className={`flex items-center px-3.5 py-2.5 bg-[#F8FAFC] border rounded-xl ${
                fieldErrors.confirmPassword
                  ? 'border-status-danger ring-1 ring-status-danger bg-red-50/20'
                  : 'border-corporate-border focus-within:border-corporate-navy focus-within:bg-white'
              }`}
            >
              <Lock className="w-4 h-4 text-corporate-slate mr-2.5 shrink-0" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Ulangi kata sandi"
                className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-corporate-slate hover:text-corporate-navy ml-2 focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {fieldErrors.confirmPassword && (
              <span className="text-[11px] font-medium text-status-danger mt-1 block">
                {fieldErrors.confirmPassword}
              </span>
            )}
          </div>
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="w-4 h-4 mt-0.5 rounded border-slate-300 text-corporate-navy focus:ring-corporate-navy cursor-pointer"
            />
            <span className="text-xs text-corporate-slate leading-relaxed select-none">
              Saya menyatakan data yang diisikan benar dan setuju mematuhi Prosedur Mutu Pengawasan CV. Tata Saka Consultant.
            </span>
          </label>
          {fieldErrors.agreeTerms && (
            <span className="text-[11px] font-medium text-status-danger mt-1 block">
              {fieldErrors.agreeTerms}
            </span>
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-corporate-navy text-white rounded-xl font-bold text-sm hover:bg-corporate-slateDark transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
          >
            {isLoading ? (
              <span>Mengirim Data Akun...</span>
            ) : (
              <>
                <UserCheck className="w-4 h-4" />
                <span>Daftar Akun Sekarang</span>
              </>
            )}
          </button>
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-corporate-border text-center">
        <p className="text-xs text-corporate-slate">
          Sudah terdaftar di sistem pengawasan?{' '}
          <Link to="/login" className="font-bold text-corporate-navy hover:underline">
            Masuk ke Akun
          </Link>
        </p>
      </div>

      <SuccessStateModal
        isOpen={isSuccessModalOpen}
        title="Registrasi Akun Berhasil!"
        description="Akun Anda telah berhasil terdaftar pada portal digital CV. Tata Saka Consultant. Anda dapat langsung masuk menggunakan akun ini."
        details={registeredSummary}
        primaryActionLabel="Masuk ke Sistem Sekarang"
        onPrimaryAction={() => {
          setIsSuccessModalOpen(false);
          navigate('/login');
        }}
        secondaryActionLabel="Daftar Akun Lain"
        onSecondaryAction={() => {
          setIsSuccessModalOpen(false);
          setFormData({
            name: '',
            username: '',
            email: '',
            phone: '',
            role: 'Konsultan',
            agency: '',
            password: '',
            confirmPassword: '',
            agreeTerms: false,
          });
        }}
      />
    </div>
  );
};

export default Register;
