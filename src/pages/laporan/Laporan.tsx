import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderOpen,
  FileEdit,
  BarChart3,
  ChevronRight,
} from 'lucide-react';

interface LaporanMenuCard {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  path: string;
}

const menuCards: LaporanMenuCard[] = [
  {
    id: 'data-laporan',
    icon: <FolderOpen className="w-5 h-5" />,
    iconBg: 'bg-corporate-slateLighter',
    iconColor: 'text-corporate-navy',
    title: 'Data Laporan',
    description:
      'Lihat daftar proyek dan semua data laporan harian & mingguan tersedia.',
    path: '/laporan/data',
  },
  {
    id: 'laporan-harian',
    icon: <FileEdit className="w-5 h-5" />,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    title: 'Buat Laporan Harian',
    description:
      'Buku Harian Standar (pekerjaan, material, alat, personil, cuaca & kejadian).',
    path: '/laporan/harian',
  },
  {
    id: 'laporan-mingguan',
    icon: <BarChart3 className="w-5 h-5" />,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    title: 'Buat Laporan Mingguan',
    description:
      'Ringkasan Kegiatan Mingguan (bobot rencana, realisasi fisik, deviasi, & tabel mingguan).',
    path: '/laporan/mingguan',
  },
];

// ── Halaman Kosong Placeholder ──────────────────────────────────────────────

const ComingSoonPage: React.FC<{ title: string }> = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-corporate-slateLighter flex items-center justify-center">
        <FolderOpen className="w-8 h-8 text-corporate-navy opacity-50" />
      </div>
      <div className="space-y-2 max-w-xs">
        <h2 className="text-lg font-extrabold text-corporate-navy">{title}</h2>
        <p className="text-sm text-corporate-slate leading-relaxed">
          Halaman ini sedang dalam tahap pengembangan dan akan segera tersedia.
        </p>
      </div>
      <button
        onClick={() => navigate('/laporan')}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-corporate-navy text-white text-sm font-semibold rounded-xl hover:bg-corporate-slateDark transition-colors"
      >
        ← Kembali ke Laporan
      </button>
    </div>
  );
};

export const LaporanDataPage: React.FC = () => (
  <ComingSoonPage title="Data Laporan" />
);

export const LaporanHarianPage: React.FC = () => (
  <ComingSoonPage title="Buat Laporan Harian" />
);

export const LaporanMingguanPage: React.FC = () => (
  <ComingSoonPage title="Buat Laporan Mingguan" />
);

// ── Halaman Utama Laporan ────────────────────────────────────────────────────

export const Laporan: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      {menuCards.map((card) => (
        <button
          key={card.id}
          onClick={() => navigate(card.path)}
          className="w-full text-left bg-white rounded-2xl border border-corporate-border shadow-sm p-5 flex items-center gap-4 hover:border-slate-300 hover:shadow-md transition-all duration-200 group"
        >
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${card.iconBg} ${card.iconColor} transition-transform duration-200 group-hover:scale-105`}
          >
            {card.icon}
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-extrabold text-corporate-navy leading-snug">
              {card.title}
            </h3>
            <p className="text-xs text-corporate-slate mt-1 leading-relaxed line-clamp-2">
              {card.description}
            </p>
          </div>

          {/* Chevron */}
          <ChevronRight className="w-4 h-4 text-corporate-slate shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>
      ))}
    </div>
  );
};

export default Laporan;
