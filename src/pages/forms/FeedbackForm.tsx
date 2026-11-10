import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageSquare,
  Star,
  User,
  Mail,
  Phone,
  Building,
  Send,
  Upload,
} from 'lucide-react';
import { feedbackService, FeedbackPayload } from '../../services/feedback.service';
import { contractService } from '../../services/contract.service';
import { ContractData } from '../../data/sampleContractData';
import { useToast } from '../../store/toastStore';
import { SuccessStateModal } from '../../components/ui/SuccessStateModal';
import {
  validateRequired,
  validateEmail,
  validatePhone,
} from '../../utils/validation';

export const FeedbackForm: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const roleOptions = ['Dinas / PPK', 'Kontraktor Pelaksana', 'Masyarakat / Pengguna Jalan', 'Internal Konsultan'];
  const kategoriOptions = [
    'Apresiasi & Kepuasan',
    'Saran Peningkatan Mutu',
    'Evaluasi Respon Lapangan',
    'Keluhan & Pengaduan Teknis',
  ];

  const [contracts, setContracts] = useState<ContractData[]>([]);

  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [telepon, setTelepon] = useState('');
  const [roleStakeholder, setRoleStakeholder] = useState('Dinas / PPK');
  const [kontrakId, setKontrakId] = useState('');
  const [namaKontrak, setNamaKontrak] = useState('');
  const [kategori, setKategori] = useState('Apresiasi & Kepuasan');
  const [pesan, setPesan] = useState('');
  const [lampiranName, setLampiranName] = useState<string>('');

  const [ratingPengawasan, setRatingPengawasan] = useState(5);
  const [ratingKetepatanWaktu, setRatingKetepatanWaktu] = useState(5);
  const [ratingK3, setRatingK3] = useState(5);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successDetails, setSuccessDetails] = useState<Array<{ label: string; value: string }>>([]);

  useEffect(() => {
    const loadContracts = async () => {
      const list = await contractService.getContracts();
      setContracts(list);
      if (list.length > 0) {
        setKontrakId(list[0].id);
        setNamaKontrak(list[0].namaKontrak);
      }
    };
    loadContracts();
  }, []);

  const handleContractChange = (cId: string) => {
    setKontrakId(cId);
    const found = contracts.find((c) => c.id === cId);
    if (found) setNamaKontrak(found.namaKontrak);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const errNama = validateRequired(nama, 'Nama Lengkap');
    if (errNama) newErrors.nama = errNama;

    const errEmail = validateEmail(email);
    if (errEmail) newErrors.email = errEmail;

    const errPhone = validatePhone(telepon);
    if (errPhone) newErrors.telepon = errPhone;

    const errPesan = validateRequired(pesan, 'Isi masukan atau saran');
    if (errPesan) newErrors.pesan = errPesan;
    else if (pesan.trim().length < 15) {
      newErrors.pesan = 'Uraian masukan minimal 15 karakter agar informatif.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Mohon perbaiki kolom input formulir yang ditandai merah.', 'Validasi Form Gagal');
      return;
    }

    try {
      setIsLoading(true);

      const payload: FeedbackPayload = {
        nama: nama.trim(),
        email: email.trim(),
        telepon: telepon.trim(),
        roleStakeholder,
        kontrakId,
        namaKontrak,
        ratingPengawasan,
        ratingKetepatanWaktu,
        ratingK3,
        kategori,
        pesan: pesan.trim(),
        lampiranName: lampiranName || undefined,
      };

      await feedbackService.submitFeedback(payload);

      toast.success(
        'Terima kasih! Feedback dan evaluasi Anda telah berhasil kami terima.',
        'Feedback Terkirim'
      );

      setSuccessDetails([
        { label: 'Nama Pengisi', value: payload.nama },
        { label: 'Role Stakeholder', value: payload.roleStakeholder },
        { label: 'Proyek / Kontrak', value: payload.namaKontrak },
        { label: 'Kategori Masukan', value: payload.kategori },
        { label: 'Rating Rata-rata', value: `${((ratingPengawasan + ratingKetepatanWaktu + ratingK3) / 3).toFixed(1)} / 5.0 ⭐` },
      ]);
      setShowSuccessModal(true);
    } catch (err: any) {
      toast.error(err.message || 'Gagal mengirim evaluasi.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStarRating = (
    label: string,
    currentValue: number,
    setValue: (val: number) => void
  ) => {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-[#F8FAFC] border border-corporate-border rounded-xl gap-2">
        <span className="text-xs font-semibold text-corporate-navy">{label}</span>
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setValue(star)}
              className="p-1 text-slate-300 hover:text-amber-400 focus:outline-none transition-colors"
              title={`${star} Bintang`}
            >
              <Star
                className={`w-5 h-5 ${
                  star <= currentValue
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-300'
                }`}
              />
            </button>
          ))}
          <span className="text-xs font-bold text-corporate-navy ml-2 w-6 text-center">
            {currentValue}/5
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-xl bg-corporate-slateLighter text-corporate-navy flex items-center justify-center mx-auto shadow-sm border border-corporate-border">
          <MessageSquare className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black text-corporate-navy tracking-tight">
          Form Evaluasi & Saran Pengawasan
        </h1>
        <p className="text-xs text-corporate-slate max-w-lg mx-auto leading-relaxed">
          Umpan balik Anda sangat penting untuk menjamin mutu pengawasan teknis dan perbaikan berkelanjutan CV. Tata Saka Consultant.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-corporate-border p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-corporate-border text-corporate-navy font-bold text-sm">
            <User className="w-4 h-4 text-corporate-navy" />
            <span>1. Identitas Stakeholder / Penilai</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                Nama Lengkap & Gelar <span className="text-status-danger">*</span>
              </label>
              <div
                className={`flex items-center px-3.5 py-2.5 bg-[#F8FAFC] border rounded-xl ${
                  errors.nama
                    ? 'border-status-danger ring-1 ring-status-danger bg-red-50/20'
                    : 'border-corporate-border focus-within:border-corporate-navy focus-within:bg-white'
                }`}
              >
                <User className="w-4 h-4 text-corporate-slate mr-2.5 shrink-0" />
                <input
                  type="text"
                  value={nama}
                  onChange={(e) => {
                    setNama(e.target.value);
                    if (errors.nama) setErrors((prev) => ({ ...prev, nama: '' }));
                  }}
                  placeholder="Contoh: Ir. Bambang, ST"
                  className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                />
              </div>
              {errors.nama && (
                <span className="text-[11px] font-medium text-status-danger mt-1 block">
                  {errors.nama}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                Peran / Instansi Stakeholder
              </label>
              <select
                value={roleStakeholder}
                onChange={(e) => setRoleStakeholder(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-sm text-slate-800 focus:outline-none focus:border-corporate-navy focus:bg-white"
              >
                {roleOptions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                Email Korespondensi <span className="text-status-danger">*</span>
              </label>
              <div
                className={`flex items-center px-3.5 py-2.5 bg-[#F8FAFC] border rounded-xl ${
                  errors.email
                    ? 'border-status-danger ring-1 ring-status-danger bg-red-50/20'
                    : 'border-corporate-border focus-within:border-corporate-navy focus-within:bg-white'
                }`}
              >
                <Mail className="w-4 h-4 text-corporate-slate mr-2.5 shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  placeholder="bambang@purbalinggakab.go.id"
                  className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                />
              </div>
              {errors.email && (
                <span className="text-[11px] font-medium text-status-danger mt-1 block">
                  {errors.email}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                Nomor Telepon / WhatsApp <span className="text-status-danger">*</span>
              </label>
              <div
                className={`flex items-center px-3.5 py-2.5 bg-[#F8FAFC] border rounded-xl ${
                  errors.telepon
                    ? 'border-status-danger ring-1 ring-status-danger bg-red-50/20'
                    : 'border-corporate-border focus-within:border-corporate-navy focus-within:bg-white'
                }`}
              >
                <Phone className="w-4 h-4 text-corporate-slate mr-2.5 shrink-0" />
                <input
                  type="text"
                  value={telepon}
                  onChange={(e) => {
                    setTelepon(e.target.value);
                    if (errors.telepon) setErrors((prev) => ({ ...prev, telepon: '' }));
                  }}
                  placeholder="081234567890"
                  className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
                />
              </div>
              {errors.telepon && (
                <span className="text-[11px] font-medium text-status-danger mt-1 block">
                  {errors.telepon}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-corporate-border p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-corporate-border text-corporate-navy font-bold text-sm">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>2. Penilaian Indikator Pengawasan Konsultan</span>
          </div>

          <div className="space-y-3">
            {renderStarRating(
              'Akurasi Mutu & Verifikasi Laporan Pengawasan Teknis',
              ratingPengawasan,
              setRatingPengawasan
            )}
            {renderStarRating(
              'Ketepatan Waktu & Kecepatan Respon Komunikasi Tim',
              ratingKetepatanWaktu,
              setRatingKetepatanWaktu
            )}
            {renderStarRating(
              'Penegakan Prosedur K3 Konstruksi & Keamanan Lapangan',
              ratingK3,
              setRatingK3
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-corporate-border p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-corporate-border text-corporate-navy font-bold text-sm">
            <Building className="w-4 h-4 text-corporate-navy" />
            <span>3. Proyek Terkait & Rincian Masukan</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                Paket Kontrak yang Dievaluasi
              </label>
              <select
                value={kontrakId}
                onChange={(e) => handleContractChange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-sm text-slate-800 focus:outline-none focus:border-corporate-navy focus:bg-white"
              >
                {contracts.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.namaKontrak}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                Kategori Masukan / Evaluasi
              </label>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-sm text-slate-800 focus:outline-none focus:border-corporate-navy focus:bg-white"
              >
                {kategoriOptions.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-corporate-navy">
                Uraian Saran / Masukan / Catatan Lapangan <span className="text-status-danger">*</span>
              </label>
              <span className="text-[10px] text-corporate-slate">
                {pesan.length} karakter
              </span>
            </div>
            <textarea
              rows={4}
              value={pesan}
              onChange={(e) => {
                setPesan(e.target.value);
                if (errors.pesan) setErrors((prev) => ({ ...prev, pesan: '' }));
              }}
              placeholder="Tuliskan saran, masukan perbaikan, apresiasi atau hal yang perlu diperhatikan..."
              className={`w-full px-3.5 py-2.5 bg-[#F8FAFC] border rounded-xl text-sm text-slate-800 focus:outline-none focus:bg-white resize-none ${
                errors.pesan
                  ? 'border-status-danger ring-1 ring-status-danger bg-red-50/20'
                  : 'border-corporate-border focus:border-corporate-navy'
              }`}
            />
            {errors.pesan && (
              <span className="text-[11px] font-medium text-status-danger mt-1 block">
                {errors.pesan}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
              Lampiran Dokumen / Foto Pendukung (Opsional)
            </label>
            <div className="flex items-center gap-3">
              <label className="px-4 py-2 bg-corporate-slateLighter text-corporate-navy hover:bg-slate-200 border border-corporate-border rounded-xl text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5" />
                <span>Pilih Berkas</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setLampiranName(e.target.files[0].name);
                      toast.info(`Berkas "${e.target.files[0].name}" terlampir.`);
                    }
                  }}
                />
              </label>
              <span className="text-xs text-corporate-slate truncate max-w-xs">
                {lampiranName || 'Belum ada file dipilih (PDF / JPG / PNG)'}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-corporate-navy text-white rounded-xl font-bold text-sm hover:bg-corporate-slateDark transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
          >
            {isLoading ? (
              <span>Mengirim Evaluasi via HTTP POST...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Kirimkan Feedback & Evaluasi (POST)</span>
              </>
            )}
          </button>
        </div>
      </form>

      <SuccessStateModal
        isOpen={showSuccessModal}
        title="Umpan Balik Berhasil Terkirim!"
        description="Terima kasih telah memberikan masukan berharga. Data evaluasi telah berhasil dikirimkan via HTTP POST dan tersimpan pada arsip evaluasi konsultan."
        details={successDetails}
        primaryActionLabel="Kembali ke Dashboard"
        onPrimaryAction={() => {
          setShowSuccessModal(false);
          navigate('/dashboard');
        }}
        secondaryActionLabel="Kirim Feedback Lain"
        onSecondaryAction={() => {
          setShowSuccessModal(false);
          setPesan('');
          setLampiranName('');
        }}
      />
    </div>
  );
};

export default FeedbackForm;
