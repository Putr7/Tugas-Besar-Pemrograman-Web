import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-corporate-softGray flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white border border-corporate-border rounded-2xl shadow-sm p-8 space-y-4">
        <div className="w-16 h-16 bg-slate-100 text-corporate-slate rounded-2xl flex items-center justify-center mx-auto">
          <FileQuestion className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-corporate-navy">404</h1>
        <h2 className="text-base font-bold text-corporate-navy">Halaman Tidak Ditemukan</h2>
        <p className="text-xs text-corporate-slate leading-relaxed">
          Tautan yang Anda tuju tidak tersedia atau telah dipindahkan ke alamat lain dalam sistem Tata Saka.
        </p>
        <div className="pt-2">
          <Button
            variant="primary"
            size="md"
            className="w-full"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => navigate('/dashboard')}
          >
            Kembali ke Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

