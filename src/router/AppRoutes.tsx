import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import GuestRoute from './GuestRoute';
import GlobalLayout from '../components/layout/GlobalLayout';
import AuthLayout from '../layouts/AuthLayout';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Import Halaman
import UserProfile from '../pages/akun/UserProfile';
import Settings from '../pages/akun/Settings';
import FAQ from '../pages/FAQ';

const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const NotFound = lazy(() => import('../pages/NotFound'));

const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));

// Modul Form
const FormKontrak = lazy(() => import('../pages/forms/FormKontrak'));
const FormKegiatan = lazy(() => import('../pages/forms/FormKegiatan'));
const FormLaporan = lazy(() => import('../pages/forms/FormLaporan'));
const FeedbackForm = lazy(() => import('../pages/forms/FeedbackForm'));

// Modul Laporan 
const Laporan = lazy(() => import('../pages/laporan/Laporan'));
const DataLaporan = lazy(() => import('../pages/laporan/DataLaporan'));
const BuatLaporanHarian = lazy(() => import('../pages/laporan/BuatLaporanHarian'));
const BuatLaporanMingguan = lazy(() => import('../pages/laporan/BuatLaporanMingguan'));

interface PlaceholderProps {
  title: string;
  assignee: string;
  actionButtons?: Array<{ label: string; to: string }>;
}

const ModulePlaceholder: React.FC<PlaceholderProps> = ({ title, assignee, actionButtons }) => (
  <div className="bg-white rounded-2xl border border-corporate-border p-8 text-center max-w-lg mx-auto my-12 space-y-4 shadow-sm">
    <div className="w-12 h-12 rounded-xl bg-corporate-slateLighter text-corporate-navy flex items-center justify-center mx-auto font-bold text-sm">
      TS
    </div>
    <div>
      <h2 className="text-base font-bold text-corporate-navy">{title}</h2>
      <p className="text-xs text-corporate-slate leading-relaxed mt-1">
        Halaman ini disiapkan sebagai wadah integrasi modul sistem untuk{' '}
        <strong className="text-corporate-navy">{assignee}</strong>.
      </p>
    </div>

    {actionButtons && actionButtons.length > 0 && (
      <div className="pt-3 border-t border-corporate-border/70 space-y-2">
        <p className="text-[11px] font-semibold text-corporate-slate">
          Uji Coba Formulir:
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {actionButtons.map((btn, idx) => (
            <Link
              key={idx}
              to={btn.to}
              className="px-3.5 py-1.5 bg-corporate-navy text-white text-xs font-bold rounded-xl hover:bg-corporate-slateDark transition-colors shadow-sm"
            >
              {btn.label}
            </Link>
          ))}
        </div>
      </div>
    )}
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-corporate-softGray">
          <LoadingSpinner size="lg" label="Memuat modul sistem..." />
        </div>
      }
    >
      <Routes>
        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<GlobalLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route
              path="/kontrak"
              element={
                <ModulePlaceholder
                  title="Daftar Kontrak Pengawasan"
                  assignee="Anggota 2"
                  actionButtons={[
                    { label: '+ Tambah Kontrak', to: '/kontrak/tambah' },
                    { label: 'Edit Kontrak', to: '/kontrak/kontrak-mt-haryono-demo/edit' },
                  ]}
                />
              }
            />

            <Route path="/kontrak/tambah" element={<FormKontrak />} />

            <Route
              path="/kontrak/:id"
              element={
                <ModulePlaceholder
                  title="Detail Kontrak & Lingkup Kegiatan"
                  assignee="Anggota 3"
                  actionButtons={[
                    { label: 'Edit Kontrak Ini', to: '/kontrak/kontrak-mt-haryono-demo/edit' },
                    { label: '+ Tambah Ruas Kegiatan', to: '/kontrak/kontrak-mt-haryono-demo/kegiatan/tambah' },
                  ]}
                />
              }
            />

            <Route path="/kontrak/:id/edit" element={<FormKontrak />} />

            <Route path="/kontrak/:contractId/kegiatan/tambah" element={<FormKegiatan />} />

            <Route
              path="/kontrak/:contractId/kegiatan/:kegiatanIndex/edit"
              element={<FormKegiatan />}
            />

            {/* Modul Laporan */}
            <Route path="/laporan" element={<Laporan />} />
            <Route path="/laporan/data" element={<DataLaporan />} />
            <Route path="/laporan/harian" element={<BuatLaporanHarian />} />
            <Route path="/laporan/harian/buat" element={<BuatLaporanHarian />} />
            <Route path="/laporan/mingguan" element={<BuatLaporanMingguan />} />
            <Route path="/laporan/mingguan/buat" element={<BuatLaporanMingguan />} />

            <Route path="/laporan/buat" element={<FormLaporan />} />

            <Route path="/laporan/:id/edit" element={<FormLaporan />} />

            <Route path="/feedback" element={<FeedbackForm />} />

            <Route
              path="/timeline"
              element={
                <ModulePlaceholder
                  title="Jadwal Pelaksanaan & Kurva S"
                  assignee="Modul Timeline Proyek"
                />
              }
            />

            <Route path="/pengaturan" element={<UserProfile />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/akun" element={<UserProfile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/faq" element={<FAQ />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;