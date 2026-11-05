import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import GuestRoute from './GuestRoute';
import GlobalLayout from '../components/layout/GlobalLayout';
import AuthLayout from '../layouts/AuthLayout';
import LoadingSpinner from '../components/common/LoadingSpinner';

// Lazy loaded page components (Tanggung Jawab Anggota 1)
const Login = lazy(() => import('../pages/auth/Login'));
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Placeholder modul untuk integrasi rekan kelompok (Anggota 2, 3, dan 4)
const ModulePlaceholder: React.FC<{ title: string; assignee: string }> = ({ title, assignee }) => (
  <div className="bg-white rounded-2xl border border-corporate-border p-8 text-center max-w-lg mx-auto my-12 space-y-3 shadow-sm">
    <div className="w-12 h-12 rounded-xl bg-corporate-slateLighter text-corporate-navy flex items-center justify-center mx-auto font-bold text-sm">
      TS
    </div>
    <h2 className="text-base font-bold text-corporate-navy">{title}</h2>
    <p className="text-xs text-corporate-slate leading-relaxed">
      Halaman ini disiapkan sebagai wadah integrasi modul sistem untuk{' '}
      <strong className="text-corporate-navy">{assignee}</strong>.
    </p>
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
        {/* 1. Public Guest Route: /login (Anggota 1) */}
        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Route>

        {/* 2. Protected Routes (Wrapped in ProtectedRoute + GlobalLayout) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<GlobalLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Dashboard (Anggota 1) */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Modul Kontrak (Anggota 2) */}
            <Route
              path="/kontrak"
              element={
                <ModulePlaceholder
                  title="Daftar Kontrak Pengawasan"
                  assignee="Anggota 2 (Modul Kontrak)"
                />
              }
            />
            <Route
              path="/kontrak/:id"
              element={
                <ModulePlaceholder
                  title="Detail Kontrak & Lingkup Kegiatan"
                  assignee="Anggota 2 (Modul Kontrak Detail)"
                />
              }
            />

            {/* Modul Laporan (Anggota 3) */}
            <Route
              path="/laporan"
              element={
                <ModulePlaceholder
                  title="Pusat Laporan & Back-Up Quantity (BOQ)"
                  assignee="Anggota 3 (Modul Laporan)"
                />
              }
            />

            {/* Modul Timeline & Jadwal (Anggota 4) */}
            <Route
              path="/timeline"
              element={
                <ModulePlaceholder
                  title="Jadwal Pelaksanaan & Kurva S"
                  assignee="Anggota 4 (Modul Timeline)"
                />
              }
            />

            {/* Modul Akun & Pengaturan (Anggota 4) */}
            <Route
              path="/pengaturan"
              element={
                <ModulePlaceholder
                  title="Pengaturan Akun & Preferensi Sistem"
                  assignee="Anggota 4 (Modul Settings)"
                />
              }
            />
          </Route>
        </Route>

        {/* 3. Fallback Route: 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
