import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Folder,
  TrendingUp,
  CheckCircle2,
  FolderOpen,
  PlusCircle,
  FileText,
  MessageSquare,
} from 'lucide-react';
import { sampleContractData } from '../../data/sampleContractData';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const contract = sampleContractData;

  const activities = [
    {
      title: 'Laporan Harian Ditambahkan',
      desc: 'Kamis, 29 Oktober 2026 - Ruas Jalan A',
      time: 'Hari ini',
    },
    {
      title: 'Laporan Harian Ditambahkan',
      desc: 'Jumat, 30 Oktober 2026 - Ruas Jalan A',
      time: 'Hari ini',
    },
    {
      title: 'Laporan Mingguan Dibuat',
      desc: 'Minggu ke-1 - Ruas Jalan A',
      time: '01 November 2026',
    },
    {
      title: 'Laporan Harian Ditambahkan',
      desc: 'Jumat, 30 Oktober 2026 - Ruas Jalan B',
      time: 'Hari ini',
    },
    {
      title: 'Laporan Mingguan Dibuat',
      desc: 'Minggu ke-1 - Ruas Jalan B',
      time: '01 November 2026',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-corporate-slate font-semibold">Selamat Datang,</p>
          <h1 className="text-2xl font-black text-corporate-navy tracking-tight mt-0.5">
            CV. Tata Saka
          </h1>
          <p className="text-xs text-corporate-slate font-semibold mt-0.5">
            Konsultan Pengawas & Perencana
          </p>
        </div>
        <div className="w-14 h-14 bg-white rounded-xl border border-corporate-border p-1.5 shadow-sm flex items-center justify-center">
          <img
            src="/assets/images/logoRev.png"
            alt="CV. Tata Saka"
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/logoRev.png';
            }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-corporate-border p-4 sm:p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-corporate-navy">
          <span>Formulir Pengawasan</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            to="/kontrak/tambah"
            className="flex items-center gap-3 p-3 rounded-xl bg-corporate-slateLighter hover:bg-slate-200 text-corporate-navy font-bold text-xs transition-colors border border-corporate-border"
          >
            <PlusCircle className="w-5 h-5 shrink-0" />
            <div className="truncate">
              <span className="block truncate">Tambah Kontrak Baru</span>
              <span className="text-[10px] text-corporate-slate font-normal">HTTP POST / Form Kontrak</span>
            </div>
          </Link>

          <Link
            to="/laporan/buat"
            className="flex items-center gap-3 p-3 rounded-xl bg-corporate-slateLighter hover:bg-slate-200 text-corporate-navy font-bold text-xs transition-colors border border-corporate-border"
          >
            <FileText className="w-5 h-5 shrink-0" />
            <div className="truncate">
              <span className="block truncate">Buat Laporan Harian</span>
              <span className="text-[10px] text-corporate-slate font-normal">HTTP POST / Form Laporan</span>
            </div>
          </Link>

          <Link
            to="/feedback"
            className="flex items-center gap-3 p-3 rounded-xl bg-corporate-slateLighter hover:bg-slate-200 text-corporate-navy font-bold text-xs transition-colors border border-corporate-border"
          >
            <MessageSquare className="w-5 h-5 shrink-0" />
            <div className="truncate">
              <span className="block truncate">Feedback & Evaluasi</span>
              <span className="text-[10px] text-corporate-slate font-normal">HTTP POST / Star Rating</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-corporate-border shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs font-bold text-corporate-slate">Total Kontrak</span>
            <div className="p-2 bg-corporate-slateLighter rounded-lg text-corporate-navy">
              <Folder className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-corporate-navy mt-3">1</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-corporate-border shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs font-bold text-corporate-slate">Kontrak Aktif</span>
            <div className="p-2 bg-[#E6F4EA] rounded-lg text-status-success">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-corporate-navy mt-3">1</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-corporate-border shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs font-bold text-corporate-slate">Kontrak Selesai</span>
            <div className="p-2 bg-corporate-slateLighter rounded-lg text-corporate-slate">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-corporate-navy mt-3">0</p>
        </div>
      </div>

      <div
        onClick={() => navigate(`/kontrak/${contract.id}`)}
        className="bg-white rounded-2xl border border-corporate-border p-6 shadow-sm cursor-pointer hover:border-slate-300 transition-all"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-extrabold text-base text-corporate-navy leading-snug line-clamp-2">
            {contract.namaKontrak}
          </h3>
          <span className="px-2.5 py-1 rounded-lg bg-corporate-slateLighter text-corporate-navy border border-corporate-border text-[11px] font-bold whitespace-nowrap">
            {contract.jenisKegiatan}
          </span>
        </div>

        <div className="flex items-center gap-6 mt-6">
          <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-corporate-slateLighter"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-corporate-navy"
                strokeDasharray={`${contract.progressFisik * 100}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-sm font-black text-corporate-navy leading-none">
                {Math.round(contract.progressFisik * 100)}%
              </span>
              <span className="text-[9px] font-semibold text-corporate-slate mt-0.5">
                Progres
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-corporate-navy inline-block" />
              <span className="text-xs font-semibold text-corporate-slate">Total Kegiatan</span>
            </div>
            <p className="text-2xl font-black text-corporate-navy pl-4">
              {contract.kegiatans.length}
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-1.5 mt-5">
          <div className="w-6 h-1.5 bg-corporate-navy rounded-full" />
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-800">Aktivitas Terkini</h2>
        <div className="space-y-3">
          {activities.map((act, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-corporate-border p-4 shadow-sm flex items-start gap-4 hover:bg-slate-50/60 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-corporate-slateLighter flex items-center justify-center text-corporate-navy shrink-0">
                <FolderOpen className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-800 truncate">{act.title}</h4>
                  <span className="text-xs text-slate-400 shrink-0 font-medium">{act.time}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 truncate">{act.desc}</p>
                <p className="text-[11px] text-slate-400 font-medium mt-1">
                  Oleh: CV. Tata Saka (Konsultan)
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
