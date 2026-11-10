import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  TrendingUp,
  FileCheck2,
  HardHat,
  ShieldCheck,
  Sparkles,
  HelpCircle,
  LogIn,
} from 'lucide-react';
import logo from '../assets/images/logoRev.png';

export const Hero: React.FC = () => {
  return (
    <main className="relative isolate flex min-h-screen w-full flex-col justify-between overflow-hidden bg-slate-50 selection:bg-blue-600 selection:text-white">
      {/* Background Decorative Ambient Gradients & Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Subtle Architectural Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_65%,transparent_100%)] opacity-70" />

        {/* Ambient Brand Glowing Orbs */}
        <div className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-gradient-to-br from-red-500/15 via-rose-500/10 to-transparent blur-3xl" />
        <div className="absolute top-1/4 -right-32 h-[520px] w-[520px] rounded-full bg-gradient-to-bl from-blue-600/15 via-indigo-500/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-blue-700/10 via-cyan-500/10 to-transparent blur-3xl" />
      </div>

      {/* Top Header / Branding Bar */}
      <header className="relative z-20 w-full border-b border-slate-200/80 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-12">
          {/* Logo & Brand Title */}
          <Link to="/" className="group flex items-center gap-3.5 focus:outline-none">
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

      {/* Main Hero Content (Proper 2-Column Responsive Grid) */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-6 py-12 sm:px-10 sm:py-16 lg:px-12">
        <div className="grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Headlines, Value Prop & CTA */}
          <div className="text-center lg:col-span-7 lg:text-left">
            {/* Announcement / Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 px-3.5 py-1.5 text-xs font-semibold text-blue-800 shadow-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
              </span>
              <span>Engineering & Project Supervision</span>
              <span className="text-blue-400">•</span>
              <span className="font-normal text-blue-700">Digital Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-6 text-4xl font-black leading-[1.12] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-6xl">
              Planning Better.
              <br />
              Building Smarter.
              <br />
              <span className="bg-gradient-to-r from-red-600 via-rose-600 to-blue-700 bg-clip-text text-transparent">
                Delivering Excellence.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Solusi digital terpadu untuk pengawasan proyek infrastruktur, monitoring kurva S
              real-time, pelaporan harian & mingguan, serta koordinasi transparan antara konsultan
              pengawas, kontraktor, dan dinas.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/login"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-slate-900 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-700/30 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
              >
                <span>Masuk ke Sistem</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/faq"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900"
              >
                <span>Panduan & FAQ</span>
              </Link>
            </div>

            {/* Feature Highlights Pills */}
            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-6 border-t border-slate-200/80">
              <div className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
                <FileCheck2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Laporan Harian & Mingguan Digital</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
                <TrendingUp className="h-3.5 w-3.5 text-blue-600" />
                <span>Monitoring Real-Time Kurva S</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
                <span>Multi-Role Terintegrasi</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Graphic (Logo Showcase + Floating Badges) */}
          <div className="relative mx-auto flex w-full max-w-md items-center justify-center lg:col-span-5 lg:max-w-none">
            
            <div className="relative flex w-full items-center justify-center p-4 sm:p-8">
              {/* Concentric Ambient Rings */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-red-500/20 via-white to-blue-700/20 blur-2xl" />
              <div className="absolute h-[78%] w-[78%] rounded-full border border-blue-700/15 border-dashed animate-[spin_60s_linear_infinite]" />
              <div className="absolute h-[90%] w-[90%] rounded-full border border-red-600/15" />

              {/* Main Visual Glass Card */}
              <div className="relative z-10 w-full max-w-sm rounded-3xl border border-white/80 bg-white/85 p-8 shadow-2xl shadow-blue-900/10 backdrop-blur-xl transition-transform duration-500 hover:scale-[1.02]">
                
                {/* Header Dots */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    CV. Tata Saka
                  </span>
                </div>

                {/* Centerpiece Logo */}
                <div className="relative my-6 flex items-center justify-center py-2">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-blue-50/60 via-transparent to-red-50/60" />
                  <img
                    src={logo}
                    alt="Logo Tata Saka Consultant"
                    className="relative z-10 aspect-square w-48 sm:w-56 object-contain mix-blend-multiply filter drop-shadow-md transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Progress Status Bar */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">Status Pengawasan</span>
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Aktif Berjalan
                    </span>
                  </div>
                  <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-blue-700" />
                  </div>
                  <div className="mt-1.5 flex justify-between text-[10px] text-slate-500">
                    <span>Realisasi Lapangan</span>
                    <span className="font-bold text-slate-800">84.2%</span>
                  </div>
                </div>

              </div>

              {/* Floating Badge 1: Top Right */}
              <div className="absolute -top-2 -right-2 sm:-right-4 z-20 hidden sm:flex items-center gap-3 rounded-2xl border border-white/90 bg-white/95 p-3 shadow-xl shadow-slate-900/10 backdrop-blur-md">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <div className="text-left pr-1">
                  <p className="text-xs font-bold text-slate-900">Laporan Lapangan</p>
                  <p className="text-[10px] text-slate-500">Terverifikasi Konsultan ✓</p>
                </div>
              </div>

              {/* Floating Badge 2: Bottom Left */}
              <div className="absolute -bottom-3 -left-2 sm:-left-4 z-20 flex items-center gap-3 rounded-2xl border border-white/90 bg-white/95 p-3 shadow-xl shadow-slate-900/10 backdrop-blur-md">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="text-left pr-2">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-slate-900">Kurva S Deviasi</p>
                    <span className="rounded bg-emerald-100 px-1 py-0.5 text-[9px] font-bold text-emerald-700">
                      +2.15%
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500">Ahead of Schedule</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Clean Bottom Bar / Footer */}
      <footer className="relative z-10 w-full border-t border-slate-200/80 bg-white/60 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-3 px-6 sm:px-10 lg:px-12 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Tata Saka Consultant</span>
            <span>&copy; {new Date().getFullYear()} Seluruh hak cipta dilindungi.</span>
          </div>

          <div className="flex items-center gap-5 font-medium">
            <span className="flex items-center gap-1.5">
              <HardHat className="h-3.5 w-3.5 text-blue-600" />
              Konsultan
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              Kontraktor
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              Dinas PPK
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Hero;
