import { useNavigate } from 'react-router-dom';
import {
    User,
    Contact,
    ShieldCheck,
    Briefcase,
    Settings,
    Shield,
    HelpCircle,
    ChevronRight,
    Pencil,
    Camera
} from 'lucide-react';

export default function UserProfile() {
    const navigate = useNavigate();

    return (
    <main className="min-h-screen bg-corporate-softGray pb-12">
      {/* Header Bar Top */}
        <header className="bg-white border-b border-corporate-border px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="w-5"></div>
        <h1 className="text-lg font-bold text-corporate-navy font-sans">
            Akun
        </h1>
        <button
            onClick={() => navigate('/settings')}
            aria-label="Edit Akun"
            className="text-corporate-navy hover:text-corporate-slate transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-corporate-navy"
        >
            <Pencil className="w-5 h-5" />
        </button>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Profile Card Header */}
        <section className="flex items-center gap-4 py-2" aria-label="Informasi Pengguna">
            <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                <User className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
            </div>
            <button
                onClick={() => navigate('/settings')}
                aria-label="Ubah foto profil"
                className="absolute bottom-0 right-0 bg-corporate-navy text-white p-1 rounded-full border-2 border-white hover:bg-corporate-slateDark transition-colors"
            >
                <Camera className="w-3.5 h-3.5" />
            </button>
            </div>

            <div>
            <h2 className="text-lg sm:text-xl font-bold text-corporate-navy">
                CV. Tata Saka
                </h2>
            <p className="text-sm text-corporate-slate font-medium">Konsultan</p>
            </div>
        </section>

        {/* Informasi Profil Section */}
        <section aria-labelledby="informasi-profil-heading">
            <h3 id="informasi-profil-heading" className="text-sm font-bold text-corporate-navy mb-3">
            Informasi Profil
            </h3>
            <article className="bg-white rounded-2xl border border-corporate-border divide-y divide-corporate-border shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-corporate-slate" />
                <span className="text-sm font-medium text-corporate-navy">Nama Lengkap</span>
                </div>
                <span className="text-sm text-corporate-slate">CV. Tata Saka</span>
            </div>

            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                <Contact className="w-5 h-5 text-corporate-slate" />
                <span className="text-sm font-medium text-corporate-navy">Username</span>
                </div>
                <span className="text-sm text-corporate-slate">konsultan</span>
            </div>

            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-corporate-slate" />
                <span className="text-sm font-medium text-corporate-navy">Role</span>
                </div>
                <span className="text-sm text-corporate-slate">Konsultan</span>
            </div>
            </article>
        </section>

        {/* Proyek Terkait Section */}
        <section aria-labelledby="proyek-terkait-heading">
            <h3 id="proyek-terkait-heading" className="text-sm font-bold text-corporate-navy mb-3">
            Proyek Terkait
            </h3>
            <article className="bg-white rounded-2xl border border-corporate-border p-4 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Briefcase className="w-6 h-6" />
            </div>
            <div>
                <h4 className="text-sm font-bold text-corporate-navy">
                PEMELIHARAAN BERKALA JL. MT HARYONO
                </h4>
                <p className="text-xs text-corporate-slate mt-1">
                3 Kegiatan • Pengawasan Teknis
                </p>
            </div>
            </article>
        </section>

        {/* Menu Lainnya Section */}
        <section aria-labelledby="menu-lainnya-heading">
            <h3 id="menu-lainnya-heading" className="text-sm font-bold text-corporate-navy mb-3">
            Menu Lainnya
            </h3>
            <article className="bg-white rounded-2xl border border-corporate-border divide-y divide-corporate-border shadow-sm overflow-hidden">
            
            {/* Pengaturan -> Ke /settings */}
            <button 
                onClick={() => navigate('/settings')}
                className="w-full flex items-center justify-between p-4 hover:bg-corporate-slateLighter transition-colors text-left focus:outline-none focus:bg-corporate-slateLighter"
                aria-label="Buka Pengaturan"
            >
                <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-corporate-slate">
                    <Settings className="w-5 h-5" />
                </div>
                <div>
                    <div className="text-sm font-bold text-corporate-navy">Pengaturan</div>
                    <div className="text-xs text-corporate-slate">Notifikasi, Tema, dan lainnya</div>
                </div>
                </div>
                <ChevronRight className="w-5 h-5 text-corporate-slate" />
            </button>

            {/* Keamanan -> Ke /settings */}
            <button 
                onClick={() => navigate('/settings')}
                className="w-full flex items-center justify-between p-4 hover:bg-corporate-slateLighter transition-colors text-left focus:outline-none focus:bg-corporate-slateLighter"
                aria-label="Buka Keamanan"
            >
                <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-corporate-slate">
                    <Shield className="w-5 h-5" />
                </div>
                <div>
                    <div className="text-sm font-bold text-corporate-navy">Keamanan</div>
                    <div className="text-xs text-corporate-slate">Password, login & aktivitas</div>
                </div>
                </div>
                    <ChevronRight className="w-5 h-5 text-corporate-slate" />
            </button>

            {/* Bantuan & FAQ -> Ke /faq */}
            <button 
                onClick={() => navigate('/faq')}
                className="w-full flex items-center justify-between p-4 hover:bg-corporate-slateLighter transition-colors text-left focus:outline-none focus:bg-corporate-slateLighter"
                aria-label="Buka Bantuan dan FAQ"
            >
                <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-corporate-slate">
                    <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                    <div className="text-sm font-bold text-corporate-navy">Bantuan & FAQ</div>
                    <div className="text-xs text-corporate-slate">Pusat bantuan dan pertanyaan</div>
                </div>
                </div>
                    <ChevronRight className="w-5 h-5 text-corporate-slate" />
                </button>

                </article>
            </section>
        </div>
    </main>
    );
}