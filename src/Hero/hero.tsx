import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, HelpCircle, LogIn } from "lucide-react";
import logo from "../assets/images/logoRev.png";

export const Hero: React.FC = () => {
  return (
    <main className="relative isolate flex min-h-screen w-full flex-col justify-between overflow-hidden bg-slate-50 selection:bg-blue-600 selection:text-white">
      {/* Top Header*/}
      <header className="relative z-20 w-full border-b border-slate-200/80 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-12">
          {/* Logo & Brand Title */}
          <Link
            to="/"
            className="group flex items-center gap-3.5 focus:outline-none"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-slate-200/90 transition-transform duration-300 group-hover:scale-105">
              <img
                src={logo}
                alt="Logo Tata Saka Consultant"
                className="h-full w-full object-contain mix-blend-multiply"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                Tata Saka Consultant
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Sistem Pengawasan Konstruksi
              </span>
            </div>
          </Link>

          {/* Quick Action Navigation */}
          <div className="flex items-center gap-3">
            <Link
              to="/faq"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white/90 px-4 py-2.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
            >
              <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
              <span>Bantuan & FAQ</span>
            </Link>

            <Link
              to="/login"
              className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-slate-900/15 transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-700/25 active:scale-95"
            >
              <LogIn className="h-4 w-4" />
              <span>Login Portal</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Hero Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-6 py-12 sm:px-10 sm:py-16 lg:px-12">
        <div className="grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Headlines, Value Prop & CTA */}
          <div className="text-center lg:col-span-7 lg:text-left">
            {/* Announcement / Status Pill */}
            {/* Main Headline */}
            <h1 className="mt-6 text-4xl font-black leading-[1.12] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-6xl">
              Planning Better.
              <br />
              Building Smarter.
              <br />
              <span className="">Delivering Excellence.</span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Solusi digital terpadu untuk pengawasan proyek infrastruktur,
              monitoring kurva S real-time, pelaporan harian & mingguan, serta
              koordinasi transparan antara konsultan pengawas, kontraktor, dan
              dinas.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/login"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-slate-900 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-700/30 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
              >
                <span>Mulai</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/faq"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900"
              >
                <span>Panduan & FAQ</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic (Logo Besar di Sebelah Kanan Text) */}
          <div className="relative mx-auto flex w-full items-center justify-center lg:col-span-5 lg:justify-end">
            <div className="relative flex w-full items-center justify-center p-2 sm:p-6">
              {/* Glow Aura di Belakang Logo */}
              <div className="absolute h-72 w-72 sm:h-96 sm:w-96 rounded-full bg-gradient-to-br from-red-500/20 via-white to-blue-700/20 blur-3xl" />

              {/* Cincin Lingkaran Dekoratif Aksen Brand */}
              <div className="absolute aspect-square w-72 sm:w-96 md:w-[440px] lg:w-[480px] rounded-full border border-blue-700/10" />
              <div className="absolute aspect-square w-64 sm:w-80 md:w-[380px] lg:w-[420px] rounded-full border border-red-600/10" />

              {/* Logo Besar */}
              <img
                src={logo}
                alt="Logo Tata Saka Consultant"
                className="relative z-10 w-72 sm:w-96 md:w-[440px] lg:w-[480px] xl:w-[540px] max-w-full object-contain mix-blend-multiply "
              />
            </div>
          </div>
        </div>
      </div>
      {/* Clean Bottom Bar / Footer */}
      <footer className="relative z-10 w-full border-t border-slate-200/80 bg-white/60 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-3 px-6 sm:px-10 lg:px-12 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">
              Tata Saka Consultant
            </span>
            <span>
              &copy; {new Date().getFullYear()} Seluruh hak cipta dilindungi.
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Hero;
