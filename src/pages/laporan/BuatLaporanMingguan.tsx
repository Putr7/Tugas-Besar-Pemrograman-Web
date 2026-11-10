import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  Percent,
  Calendar,
  FileSpreadsheet,
  CheckCircle,
} from 'lucide-react';

export const BuatLaporanMingguan: React.FC = () => {
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
            <span className="font-semibold text-corporate-navy">Buat Laporan Mingguan</span>
          </div>
          <h1 className="text-2xl font-black text-corporate-navy tracking-tight">
            Buat Laporan Mingguan
          </h1>
          <p className="text-xs text-corporate-slate">
            Ringkasan Kegiatan Mingguan (bobot rencana, realisasi fisik, deviasi, & tabel mingguan).
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
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto text-amber-600 shadow-inner">
            <BarChart3 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Halaman Kosong (Formulir Siap Dirancang)
            </div>
            <h2 className="text-lg font-bold text-corporate-navy">
              Formulir Rekapitulasi Laporan Mingguan
            </h2>
            <p className="text-xs text-corporate-slate leading-relaxed">
              Halaman ini sementara dikosongkan sesuai instruksi. Nanti dapat Anda isi
              dengan tabel capaian bobot rencana mingguan, realisasi fisik kumulatif,
              perhitungan deviasi (+/-), dan rekap kurva S.
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

        {/* Wireframe Placeholder Preview */}
        <div className="mt-10 pt-8 border-t border-dashed border-corporate-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-corporate-slate">
              <CheckCircle className="w-4 h-4 text-amber-600" />
              <span>Komponen yang Direncanakan (Rekap Progres Mingguan)</span>
            </div>
            <span className="text-[11px] text-slate-400">Placeholder Form</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-left">
            <div className="p-4 rounded-xl border border-dashed border-amber-200/70 bg-amber-50/20 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100/60 flex items-center justify-center text-amber-600">
                <Calendar className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-slate-700">Periode Minggu Ke-n</p>
              <p className="text-[11px] text-slate-400">
                Rentang tanggal awal & akhir minggu berjalan.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-dashed border-amber-200/70 bg-amber-50/20 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100/60 flex items-center justify-center text-amber-600">
                <Percent className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-slate-700">Bobot Rencana (%)</p>
              <p className="text-[11px] text-slate-400">
                Target progres sesuai jadwal schedule kontrak.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-dashed border-amber-200/70 bg-amber-50/20 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100/60 flex items-center justify-center text-amber-600">
                <TrendingUp className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-slate-700">Realisasi Fisik (%)</p>
              <p className="text-[11px] text-slate-400">
                Volume aktual lapangan yang telah disetujui konsultan.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-dashed border-amber-200/70 bg-amber-50/20 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100/60 flex items-center justify-center text-amber-600">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-slate-700">Deviasi & Evaluasi</p>
              <p className="text-[11px] text-slate-400">
                Selisih deviasi positif/negatif & catatan tindak lanjut.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuatLaporanMingguan;
