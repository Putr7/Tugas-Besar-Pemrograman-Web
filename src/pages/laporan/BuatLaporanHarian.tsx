import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FileEdit,
  CloudSun,
  HardHat,
  Truck,
  Wrench,
  CheckCircle,
} from 'lucide-react';

export const BuatLaporanHarian: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* 1. Header Navigation & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-corporate-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-corporate-slate">
            <button
              onClick={() => navigate('/laporan')}
              className="hover:text-corporate-navy font-medium transition-colors"
            >
              Laporan Proyek
            </button>
            <span>/</span>
            <span className="font-semibold text-corporate-navy">Buat Laporan Harian</span>
          </div>
          <h1 className="text-2xl font-black text-corporate-navy tracking-tight">
            Buat Laporan Harian
          </h1>
          <p className="text-xs text-corporate-slate">
            Buku Harian Standar (pekerjaan, material, alat, personil, cuaca & kejadian lapangan).
          </p>
        </div>

        {/* Back button */}
        <button
          onClick={() => navigate('/laporan')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-corporate-border text-corporate-navy text-xs font-bold rounded-xl hover:bg-corporate-slateLighter transition-colors self-start sm:self-auto shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Laporan</span>
        </button>
      </div>

      {/* 2. Empty State Canvas / Page Kosong */}
      <div className="bg-white rounded-2xl border border-corporate-border p-8 sm:p-12 shadow-sm text-center">
        <div className="max-w-md mx-auto space-y-5">
          {/* Icon Badge */}
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600 shadow-inner">
            <FileEdit className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Halaman Kosong (Formulir Siap Dirancang)
            </div>
            <h2 className="text-lg font-bold text-corporate-navy">
              Formulir Laporan Harian
            </h2>
            <p className="text-xs text-corporate-slate leading-relaxed">
              Halaman ini sementara dikosongkan sesuai instruksi. Nanti dapat Anda isi
              dengan input data pekerjaan, volume harian, daftar tenaga kerja/personil,
              alat berat yang beroperasi, serta catatan kondisi cuaca.
            </p>
          </div>

          {/* Quick Action */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => navigate('/laporan')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-corporate-navy text-white text-xs font-semibold hover:bg-corporate-slateDark transition-colors"
            >
              <span>← Kembali ke Menu Utama</span>
            </button>
          </div>
        </div>

        {/* Wireframe Placeholder Preview of Future Fields */}
        <div className="mt-10 pt-8 border-t border-dashed border-corporate-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-corporate-slate">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Komponen yang Direncanakan (Buku Harian Standar)</span>
            </div>
            <span className="text-[11px] text-slate-400">Placeholder Form</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-left">
            <div className="p-4 rounded-xl border border-dashed border-emerald-200/70 bg-emerald-50/20 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100/60 flex items-center justify-center text-emerald-600">
                <CloudSun className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-slate-700">Kondisi Cuaca</p>
              <p className="text-[11px] text-slate-400">
                Pagi, siang, sore (Cerah, Hujan Ringan/Lebat).
              </p>
            </div>
            <div className="p-4 rounded-xl border border-dashed border-emerald-200/70 bg-emerald-50/20 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100/60 flex items-center justify-center text-emerald-600">
                <HardHat className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-slate-700">Tenaga Kerja</p>
              <p className="text-[11px] text-slate-400">
                Mandor, tukang batu/kayu, pekerja, operator.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-dashed border-emerald-200/70 bg-emerald-50/20 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100/60 flex items-center justify-center text-emerald-600">
                <Truck className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-slate-700">Material & Bahan</p>
              <p className="text-[11px] text-slate-400">
                Pasir, semen, batu belah, aspal, agregat.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-dashed border-emerald-200/70 bg-emerald-50/20 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100/60 flex items-center justify-center text-emerald-600">
                <Wrench className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-slate-700">Peralatan Kerja</p>
              <p className="text-[11px] text-slate-400">
                Excavator, dump truck, roller, concrete mixer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuatLaporanHarian;
