import { User, Lock, Bell, Save } from 'lucide-react';

export default function Settings() {
    return (
    <main className="min-h-screen bg-corporate-softGray flex flex-col p-4 sm:p-6 md:p-8">
        <header className="mb-8 text-center mt-6">
        <h1 className="text-3xl font-bold text-corporate-navy font-sans">
            Pengaturan & Keamanan
        </h1>
        <p className="text-corporate-slate mt-2 text-sm sm:text-base">
            Kelola preferensi akun, kata sandi, dan notifikasi aplikasi Anda.
        </p>
        </header>

        <section className="max-w-3xl w-full mx-auto flex-grow space-y-6" aria-label="Formulir Pengaturan dan Keamanan">
        
        {/* Informasi Akun */}
        <article className="bg-corporate-surface rounded-2xl shadow-sm border border-corporate-border p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-bold text-corporate-navy flex items-center gap-2 border-b border-corporate-border pb-3">
            <User className="w-5 h-5 text-corporate-slate" aria-hidden="true" />
            Informasi Akun
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-corporate-slate mb-1">
                Nama Lengkap
                </label>
                <input
                type="text"
                id="fullName"
                defaultValue="CV. Tata Saka"
                className="w-full p-2.5 border border-corporate-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-navy" 
                aria-label="Input nama lengkap"
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-corporate-slate mb-1">
                Email Kontak
                </label>
                <input
                type="email"
                id="email"
                defaultValue="konsultan@tatasaka.id"
                className="w-full p-2.5 border border-corporate-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-navy" 
                aria-label="Input email"
                />
                </div>
            </div>
        </article>

        {/* Keamanan & Kata Sandi */}
        <article className="bg-corporate-surface rounded-2xl shadow-sm border border-corporate-border p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-bold text-corporate-navy flex items-center gap-2 border-b border-corporate-border pb-3">
            <Lock className="w-5 h-5 text-corporate-slate" aria-hidden="true" />
            Keamanan & Kata Sandi
            </h2>
            <div className="space-y-4 pt-2">
            <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-corporate-slate mb-1">
                Kata Sandi Saat Ini
                </label>
                <input
                    type="password"
                    id="currentPassword"
                    placeholder="••••••••"
                    className="w-full p-2.5 border border-corporate-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-navy" 
                    />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-corporate-slate mb-1">
                    Kata Sandi Baru
                </label>
                <input
                    type="password"
                    id="newPassword"
                    placeholder="••••••••"
                    className="w-full p-2.5 border border-corporate-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-navy" 
                />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-corporate-slate mb-1">
                        Konfirmasi Kata Sandi Baru
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="w-full p-2.5 border border-corporate-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-corporate-navy" 
                    />
                    </div>
                </div>
            </div>
        </article>

        {/* Preferensi Notifikasi */}
        <article className="bg-corporate-surface rounded-2xl shadow-sm border border-corporate-border p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-bold text-corporate-navy flex items-center gap-2 border-b border-corporate-border pb-3">
            <Bell className="w-5 h-5 text-corporate-slate" aria-hidden="true" />
                Notifikasi Sistem
            </h2>
            <div className="pt-2">
            <div className="flex items-center justify-between">
                <div>
                <div className="text-sm font-medium text-corporate-navy">Notifikasi Email</div>
                <div className="text-xs text-corporate-slate">Terima pembaruan proyek dan laporan harian lewat email</div>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-corporate-navy cursor-pointer" />
            </div>
            </div>
        </article>

        {/* Tombol Simpan */}
        <div className="flex justify-end pt-2 pb-8">
            <button
            type="button"
            aria-label="Simpan perubahan pengaturan"
            className="inline-flex items-center justify-center gap-2 bg-corporate-navy text-white px-6 py-2.5 rounded-xl hover:bg-corporate-slateDark transition-colors w-full sm:w-auto font-medium text-sm shadow-sm"
            >
            <Save className="w-4 h-4" aria-hidden="true" />
            <span>Simpan Perubahan</span>
            </button>
        </div>
        </section>
        </main>
    );
}