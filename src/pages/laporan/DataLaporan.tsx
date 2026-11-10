import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  FolderOpen,
  PlusCircle,
  FileText,
  Calendar,
  Layers,
} from 'lucide-react';

export const DataLaporan: React.FC = () => {
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
            <span className="font-semibold text-corporate-navy">Data Laporan</span>
          </div>
          <h1 className="text-2xl font-black text-corporate-navy tracking-tight">
            Data Laporan Proyek
          </h1>
          <p className="text-xs text-corporate-slate">
            Daftar seluruh arsip laporan harian dan mingguan pengawasan lapangan.
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
          <div className="w-16 h-16 rounded-2xl bg-corporate-slateLighter border border-corporate-border flex items-center justify-center mx-auto text-corporate-navy shadow-inner">
            <FolderOpen className="w-8 h-8 opacity-75" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-corporate-border text-corporate-slate text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              Halaman Kosong (Template Disiapkan)
            </div>
            <h2 className="text-lg font-bold text-corporate-navy">
              Belum Ada Konten Data Laporan
            </h2>
            <p className="text-xs text-corporate-slate leading-relaxed">
              Halaman ini sementara dikosongkan sesuai instruksi. Siap untuk diisi
              dengan tabel daftar proyek, filter tanggal, status approval, atau arsip
              laporan harian & mingguan.
            </p>
          </div>

          {/* Quick Action Shortcuts */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate('/laporan/harian')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Input Laporan Harian</span>
            </button>
            <button
              onClick={() => navigate('/laporan/mingguan')}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold hover:bg-amber-100 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Input Laporan Mingguan</span>
            </button>
          </div>
        </div>

        {/* Wireframe Placeholder Preview */}
        <div className="mt-10 pt-8 border-t border-dashed border-corporate-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-bold text-corporate-slate">
              <Layers className="w-4 h-4" />
              <span>Area Pratinjau Struktur (Placeholder)</span>
            </div>
            <span className="text-[11px] text-slate-400">Siap diintegrasikan</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <div className="p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-slate-200/60 flex items-center justify-center text-slate-400">
                <FileText className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-slate-700">Tabel Laporan Harian</p>
              <p className="text-[11px] text-slate-400">
                Filter ruas jalan, tanggal pekerjaan, dan status cuaca.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-slate-200/60 flex items-center justify-center text-slate-400">
                <Calendar className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-slate-700">Rekap Mingguan</p>
              <p className="text-[11px] text-slate-400">
                Data realisasi bobot fisik dan deviasi per minggu pelaksanaan.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-slate-200/60 flex items-center justify-center text-slate-400">
                <FolderOpen className="w-4 h-4" />
              </div>
              <p className="text-xs font-bold text-slate-700">Export & Cetak PDF</p>
              <p className="text-[11px] text-slate-400">
                Fitur cetak buku harian standar dan format rekap mingguan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataLaporan;
