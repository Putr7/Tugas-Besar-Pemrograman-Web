import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  FileText,
  Calendar,
  Building2,
  DollarSign,
  Users,
  Plus,
  Trash2,
  ArrowLeft,
  Save,
  Clock,
} from 'lucide-react';
import { contractService, CreateContractPayload } from '../../services/contract.service';
import { useToast } from '../../store/toastStore';
import { SuccessStateModal } from '../../components/ui/SuccessStateModal';
import {
  validateRequired,
  validateDocumentNumber,
  validatePositiveInteger,
  formatRupiah,
  parseRupiahToNumber,
} from '../../utils/validation';

export const FormKontrak: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const toast = useToast();

  const jenisKegiatanOptions = [
    'Pengawasan Teknis',
    'Perencanaan Teknis',
    'Manajemen Konstruksi',
    'Pengawasan Berkala',
  ];

  const [jenisKegiatan, setJenisKegiatan] = useState('Pengawasan Teknis');
  const [namaKontrak, setNamaKontrak] = useState('');
  const [nomorSpk, setNomorSpk] = useState('');
  const [tglMulaiSpk, setTglMulaiSpk] = useState('');
  const [nomorSpmk, setNomorSpmk] = useState('');
  const [tglMulaiSpmk, setTglMulaiSpmk] = useState('');
  const [hariKalender, setHariKalender] = useState<string>('90');
  const [tglSelesaiSpmk, setTglSelesaiSpmk] = useState('');
  const [nilaiKontrakDisplay, setNilaiKontrakDisplay] = useState('');
  const [dinasList, setDinasList] = useState<string[]>(['DPUPR Kab. Purbalingga']);
  const [sumberDana, setSumberDana] = useState('APBD Kab. Purbalingga');
  const [deskripsi, setDeskripsi] = useState('');

  const [siteEngineer, setSiteEngineer] = useState('');
  const [inspektors, setInspektors] = useState<string[]>(['']);
  const [administrasi, setAdministrasi] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successDetails, setSuccessDetails] = useState<Array<{ label: string; value: string }>>([]);

  useEffect(() => {
    if (tglMulaiSpmk && hariKalender) {
      const days = parseInt(hariKalender, 10);
      if (!isNaN(days) && days > 0) {
        const startDate = new Date(tglMulaiSpmk);
        if (!isNaN(startDate.getTime())) {
          const endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + days);
          setTglSelesaiSpmk(endDate.toISOString().split('T')[0]);
        }
      }
    }
  }, [tglMulaiSpmk, hariKalender]);

  useEffect(() => {
    if (isEditMode && id) {
      const loadContract = async () => {
        try {
          setIsFetching(true);
          const data = await contractService.getContractById(id);
          if (data) {
            setJenisKegiatan(data.jenisKegiatan || 'Pengawasan Teknis');
            setNamaKontrak(data.namaKontrak || '');
            setNomorSpk(data.nomorSpk || '');
            setTglMulaiSpk(data.tglMulaiSpk || '');
            setNomorSpmk(data.nomorSpmk || '');
            setTglMulaiSpmk(data.tglMulaiSpmk || '');
            setHariKalender(data.hariKalender?.toString() || '90');
            setTglSelesaiSpmk(data.tglSelesaiSpmk || '');
            setNilaiKontrakDisplay(data.nilaiKontrak || '');
            setDinasList(data.instansiDinas && data.instansiDinas.length ? data.instansiDinas : ['']);
            setSumberDana(data.sumberDana || '');
            setDeskripsi(data.deskripsi || '');
            if (data.strukturOrganisasi) {
              setSiteEngineer(data.strukturOrganisasi.siteEngineer || '');
              setInspektors(
                data.strukturOrganisasi.inspektors && data.strukturOrganisasi.inspektors.length
                  ? data.strukturOrganisasi.inspektors
                  : ['']
              );
              setAdministrasi(data.strukturOrganisasi.administrasi || '');
            }
          }
        } catch {
          toast.error('Gagal mengambil data kontrak yang akan diedit.');
        } finally {
          setIsFetching(false);
        }
      };
      loadContract();
    }
  }, [isEditMode, id]);

  const handleAddDinas = () => setDinasList((prev) => [...prev, '']);
  const handleRemoveDinas = (index: number) => {
    if (dinasList.length > 1) {
      setDinasList((prev) => prev.filter((_, i) => i !== index));
    }
  };
  const handleDinasChange = (index: number, val: string) => {
    setDinasList((prev) => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const handleAddInspektor = () => {
    if (inspektors.length < 4) {
      setInspektors((prev) => [...prev, '']);
    } else {
      toast.warning('Maksimal 4 orang Tenaga Ahli / Inspektor Pengawas.');
    }
  };
  const handleRemoveInspektor = (index: number) => {
    if (inspektors.length > 1) {
      setInspektors((prev) => prev.filter((_, i) => i !== index));
    }
  };
  const handleInspektorChange = (index: number, val: string) => {
    setInspektors((prev) => {
      const copy = [...prev];
      copy[index] = val;
      return copy;
    });
  };

  const handleNilaiKontrakChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatRupiah(raw);
    setNilaiKontrakDisplay(formatted);
    if (errors.nilaiKontrak) {
      setErrors((prev) => ({ ...prev, nilaiKontrak: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const errNama = validateRequired(namaKontrak, 'Nama Paket Kontrak');
    if (errNama) newErrors.namaKontrak = errNama;
    else if (namaKontrak.trim().length < 5) {
      newErrors.namaKontrak = 'Nama kontrak minimal 5 karakter.';
    }

    const errSpk = validateDocumentNumber(nomorSpk, 'Nomor SPK');
    if (errSpk) newErrors.nomorSpk = errSpk;

    const errTglSpk = validateRequired(tglMulaiSpk, 'Tanggal Mulai SPK');
    if (errTglSpk) newErrors.tglMulaiSpk = errTglSpk;

    const errSpmk = validateDocumentNumber(nomorSpmk, 'Nomor SPMK');
    if (errSpmk) newErrors.nomorSpmk = errSpmk;

    const errTglSpmk = validateRequired(tglMulaiSpmk, 'Tanggal Mulai SPMK');
    if (errTglSpmk) newErrors.tglMulaiSpmk = errTglSpmk;

    const errHari = validatePositiveInteger(hariKalender, 'Jangka Waktu Hari Kalender');
    if (errHari) newErrors.hariKalender = errHari;

    const numericNilai = parseRupiahToNumber(nilaiKontrakDisplay);
    if (!nilaiKontrakDisplay || numericNilai <= 0) {
      newErrors.nilaiKontrak = 'Nilai Kontrak harus lebih besar dari Rp 0.';
    }

    const validDinas = dinasList.filter((d) => d.trim() !== '');
    if (validDinas.length === 0) {
      newErrors.dinas = 'Minimal 1 Instansi / Dinas harus diisi.';
    }

    const errDana = validateRequired(sumberDana, 'Sumber Dana');
    if (errDana) newErrors.sumberDana = errDana;

    const errSite = validateRequired(siteEngineer, 'Nama Site Engineer');
    if (errSite) newErrors.siteEngineer = errSite;

    const validInspektors = inspektors.filter((i) => i.trim() !== '');
    if (validInspektors.length === 0) {
      newErrors.inspektor = 'Minimal 1 Tenaga Ahli / Inspektor harus diisi.';
    }

    const errAdm = validateRequired(administrasi, 'Tenaga Administrasi');
    if (errAdm) newErrors.administrasi = errAdm;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Mohon periksa kolom formulir yang belum sesuai ketentuan.', 'Validasi Form Gagal');
      return;
    }

    try {
      setIsLoading(true);

      const payload: CreateContractPayload = {
        jenisKegiatan,
        namaKontrak: namaKontrak.trim().toUpperCase(),
        nomorSpk: nomorSpk.trim(),
        tglMulaiSpk,
        nomorSpmk: nomorSpmk.trim(),
        tglMulaiSpmk,
        tglSelesaiSpmk: tglSelesaiSpmk || tglMulaiSpmk,
        hariKalender: parseInt(hariKalender, 10),
        nilaiKontrak: nilaiKontrakDisplay,
        instansiDinas: dinasList.filter((d) => d.trim() !== ''),
        sumberDana: sumberDana.trim(),
        deskripsi: deskripsi.trim(),
        strukturOrganisasi: {
          siteEngineer: siteEngineer.trim(),
          inspektors: inspektors.filter((i) => i.trim() !== ''),
          administrasi: administrasi.trim(),
        },
      };

      if (isEditMode && id) {
        const res = await contractService.updateContract(id, payload);
        toast.success(res.message || 'Kontrak pengawasan berhasil diperbarui via HTTP PUT.', 'Berhasil Diperbarui');
        setSuccessDetails([
          { label: 'Nomor SPK', value: payload.nomorSpk },
          { label: 'Nama Paket', value: payload.namaKontrak },
          { label: 'Nilai Kontrak', value: payload.nilaiKontrak },
          { label: 'Metode Pengiriman', value: 'HTTP PUT (Update)' },
        ]);
      } else {
        const res = await contractService.createContract(payload);
        toast.success(res.message || 'Kontrak pengawasan baru berhasil disimpan via HTTP POST.', 'Kontrak Baru Tersimpan');
        setSuccessDetails([
          { label: 'ID Kontrak', value: res.data.id },
          { label: 'Nomor SPK', value: payload.nomorSpk },
          { label: 'Nama Paket', value: payload.namaKontrak },
          { label: 'Nilai Kontrak', value: payload.nilaiKontrak },
          { label: 'Metode Pengiriman', value: 'HTTP POST (Create)' },
        ]);
      }

      setShowSuccessModal(true);
    } catch (err: any) {
      toast.error(err.message || 'Gagal menyimpan data kontrak. Silakan coba kembali.', 'Terjadi Kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-corporate-navy border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm font-semibold text-corporate-slate">Memuat data kontrak...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/kontrak"
            className="p-2 rounded-xl text-corporate-slate hover:text-corporate-navy hover:bg-white border border-corporate-border transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-corporate-navy tracking-tight">
              {isEditMode ? 'Edit Kontrak Pengawasan' : 'Tambah Kontrak Pengawasan'}
            </h1>
            <p className="text-xs text-corporate-slate mt-0.5">
              Modul formulir manajemen kontrak konsultan pengawas CV. Tata Saka Consultant
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-corporate-border p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-corporate-border text-corporate-navy font-bold text-sm">
            <FileText className="w-4 h-4 text-corporate-navy" />
            <span>1. Data Pokok Kontrak Pengawasan</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                Jenis Kegiatan / Layanan <span className="text-status-danger">*</span>
              </label>
              <select
                value={jenisKegiatan}
                onChange={(e) => setJenisKegiatan(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-sm text-slate-800 focus:outline-none focus:border-corporate-navy focus:bg-white transition-all cursor-pointer"
              >
                {jenisKegiatanOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                Sumber Pendanaan <span className="text-status-danger">*</span>
              </label>
              <input
                type="text"
                value={sumberDana}
                onChange={(e) => {
                  setSumberDana(e.target.value);
                  if (errors.sumberDana) setErrors((prev) => ({ ...prev, sumberDana: '' }));
                }}
                placeholder="Contoh: APBD Kab. Purbalingga TA 2026"
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-sm text-slate-800 focus:outline-none focus:border-corporate-navy focus:bg-white transition-all"
              />
              {errors.sumberDana && (
                <span className="text-[11px] font-medium text-status-danger mt-1 block">
                  {errors.sumberDana}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
              Nama Paket Kontrak Pengawasan <span className="text-status-danger">*</span>
            </label>
            <input
              type="text"
              value={namaKontrak}
              onChange={(e) => {
                setNamaKontrak(e.target.value);
                if (errors.namaKontrak) setErrors((prev) => ({ ...prev, namaKontrak: '' }));
              }}
              placeholder="Contoh: PENGAWASAN TEKNIS PEMELIHARAAN BERKALA JL. MT HARYONO"
              className={`w-full px-3.5 py-2.5 bg-[#F8FAFC] border rounded-xl text-sm text-slate-800 focus:outline-none focus:bg-white uppercase ${
                errors.namaKontrak
                  ? 'border-status-danger ring-1 ring-status-danger bg-red-50/20'
                  : 'border-corporate-border focus:border-corporate-navy'
              }`}
            />
            {errors.namaKontrak && (
              <span className="text-[11px] font-medium text-status-danger mt-1 block">
                {errors.namaKontrak}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
              Nilai Kontrak Pengawasan (IDR) <span className="text-status-danger">*</span>
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-corporate-slate absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={nilaiKontrakDisplay}
                onChange={handleNilaiKontrakChange}
                placeholder="Rp 2.450.000.000"
                className={`w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:bg-white ${
                  errors.nilaiKontrak
                    ? 'border-status-danger ring-1 ring-status-danger bg-red-50/20'
                    : 'border-corporate-border focus:border-corporate-navy'
                }`}
              />
            </div>
            {errors.nilaiKontrak && (
              <span className="text-[11px] font-medium text-status-danger mt-1 block">
                {errors.nilaiKontrak}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
              Deskripsi Singkat Lingkup Kegiatan
            </label>
            <textarea
              rows={3}
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Uraikan lingkup pekerjaan pengawasan, ruas yang ditangani, dsb."
              className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-sm text-slate-800 focus:outline-none focus:border-corporate-navy focus:bg-white transition-all resize-none"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-corporate-border p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-corporate-border text-corporate-navy font-bold text-sm">
            <Calendar className="w-4 h-4 text-corporate-navy" />
            <span>2. Legalitas Surat & Jangka Waktu Pelaksanaan (SPK & SPMK)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                Nomor Surat Perintah Kerja (SPK) <span className="text-status-danger">*</span>
              </label>
              <input
                type="text"
                value={nomorSpk}
                onChange={(e) => {
                  setNomorSpk(e.target.value);
                  if (errors.nomorSpk) setErrors((prev) => ({ ...prev, nomorSpk: '' }));
                }}
                placeholder="000.3.3/1128/KONST/BM/X/2026"
                className={`w-full px-3.5 py-2.5 bg-[#F8FAFC] border rounded-xl text-sm text-slate-800 focus:outline-none focus:bg-white ${
                  errors.nomorSpk
                    ? 'border-status-danger ring-1 ring-status-danger bg-red-50/20'
                    : 'border-corporate-border focus:border-corporate-navy'
                }`}
              />
              {errors.nomorSpk && (
                <span className="text-[11px] font-medium text-status-danger mt-1 block">
                  {errors.nomorSpk}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                Tanggal Mulai SPK <span className="text-status-danger">*</span>
              </label>
              <input
                type="date"
                value={tglMulaiSpk}
                onChange={(e) => {
                  setTglMulaiSpk(e.target.value);
                  if (errors.tglMulaiSpk) setErrors((prev) => ({ ...prev, tglMulaiSpk: '' }));
                }}
                className={`w-full px-3.5 py-2.5 bg-[#F8FAFC] border rounded-xl text-sm text-slate-800 focus:outline-none focus:bg-white ${
                  errors.tglMulaiSpk
                    ? 'border-status-danger ring-1 ring-status-danger bg-red-50/20'
                    : 'border-corporate-border focus:border-corporate-navy'
                }`}
              />
              {errors.tglMulaiSpk && (
                <span className="text-[11px] font-medium text-status-danger mt-1 block">
                  {errors.tglMulaiSpk}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                Nomor SPMK <span className="text-status-danger">*</span>
              </label>
              <input
                type="text"
                value={nomorSpmk}
                onChange={(e) => {
                  setNomorSpmk(e.target.value);
                  if (errors.nomorSpmk) setErrors((prev) => ({ ...prev, nomorSpmk: '' }));
                }}
                placeholder="000.3.3/1128/KONST/BM/X/2026"
                className={`w-full px-3.5 py-2.5 bg-[#F8FAFC] border rounded-xl text-sm text-slate-800 focus:outline-none focus:bg-white ${
                  errors.nomorSpmk
                    ? 'border-status-danger ring-1 ring-status-danger bg-red-50/20'
                    : 'border-corporate-border focus:border-corporate-navy'
                }`}
              />
              {errors.nomorSpmk && (
                <span className="text-[11px] font-medium text-status-danger mt-1 block">
                  {errors.nomorSpmk}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                Tanggal Mulai SPMK <span className="text-status-danger">*</span>
              </label>
              <input
                type="date"
                value={tglMulaiSpmk}
                onChange={(e) => {
                  setTglMulaiSpmk(e.target.value);
                  if (errors.tglMulaiSpmk) setErrors((prev) => ({ ...prev, tglMulaiSpk: '' }));
                }}
                className={`w-full px-3.5 py-2.5 bg-[#F8FAFC] border rounded-xl text-sm text-slate-800 focus:outline-none focus:bg-white ${
                  errors.tglMulaiSpmk
                    ? 'border-status-danger ring-1 ring-status-danger bg-red-50/20'
                    : 'border-corporate-border focus:border-corporate-navy'
                }`}
              />
              {errors.tglMulaiSpmk && (
                <span className="text-[11px] font-medium text-status-danger mt-1 block">
                  {errors.tglMulaiSpmk}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                Hari Kalender (Durasi) <span className="text-status-danger">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={hariKalender}
                  onChange={(e) => {
                    setHariKalender(e.target.value);
                    if (errors.hariKalender) setErrors((prev) => ({ ...prev, hariKalender: '' }));
                  }}
                  placeholder="90"
                  className={`w-full px-3.5 py-2.5 bg-[#F8FAFC] border rounded-xl text-sm text-slate-800 focus:outline-none focus:bg-white pr-14 ${
                    errors.hariKalender
                      ? 'border-status-danger ring-1 ring-status-danger bg-red-50/20'
                      : 'border-corporate-border focus:border-corporate-navy'
                  }`}
                />
                <span className="text-xs text-corporate-slate font-semibold absolute right-3.5 top-1/2 -translate-y-1/2">
                  Hari
                </span>
              </div>
              {errors.hariKalender && (
                <span className="text-[11px] font-medium text-status-danger mt-1 block">
                  {errors.hariKalender}
                </span>
              )}
            </div>
          </div>

          <div className="bg-corporate-slateLighter/70 p-3.5 rounded-xl border border-corporate-border flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-corporate-slate">
              <Clock className="w-4 h-4 text-corporate-navy" />
              <span>Estimasi Tanggal Selesai SPMK (Otomatis):</span>
            </div>
            <span className="text-xs font-bold text-corporate-navy">
              {tglSelesaiSpmk || 'Pilih tgl mulai & durasi'}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-corporate-border p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-corporate-border">
            <div className="flex items-center gap-2.5 text-corporate-navy font-bold text-sm">
              <Building2 className="w-4 h-4 text-corporate-navy" />
              <span>3. Instansi / Dinas Pemberi Tugas</span>
            </div>
            <button
              type="button"
              onClick={handleAddDinas}
              className="text-xs font-bold text-corporate-navy hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah Dinas
            </button>
          </div>

          <div className="space-y-3">
            {dinasList.map((dinas, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={dinas}
                  onChange={(e) => handleDinasChange(idx, e.target.value)}
                  placeholder={`Nama Dinas / Instansi #${idx + 1}`}
                  className="flex-1 px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-sm text-slate-800 focus:outline-none focus:border-corporate-navy focus:bg-white transition-all"
                />
                {dinasList.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveDinas(idx)}
                    className="p-2.5 text-status-danger hover:bg-red-50 rounded-xl transition-colors"
                    title="Hapus baris dinas"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            {errors.dinas && (
              <span className="text-[11px] font-medium text-status-danger block">{errors.dinas}</span>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-corporate-border p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-corporate-border text-corporate-navy font-bold text-sm">
            <Users className="w-4 h-4 text-corporate-navy" />
            <span>4. Struktur Organisasi Tim Konsultan Pengawas</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
              Site Engineer (SE / Pimpinan Teknis) <span className="text-status-danger">*</span>
            </label>
            <input
              type="text"
              value={siteEngineer}
              onChange={(e) => {
                setSiteEngineer(e.target.value);
                if (errors.siteEngineer) setErrors((prev) => ({ ...prev, siteEngineer: '' }));
              }}
              placeholder="Contoh: SENDAYU GALIH K., ST"
              className={`w-full px-3.5 py-2.5 bg-[#F8FAFC] border rounded-xl text-sm text-slate-800 focus:outline-none focus:bg-white uppercase ${
                errors.siteEngineer
                  ? 'border-status-danger ring-1 ring-status-danger bg-red-50/20'
                  : 'border-corporate-border focus:border-corporate-navy'
              }`}
            />
            {errors.siteEngineer && (
              <span className="text-[11px] font-medium text-status-danger mt-1 block">
                {errors.siteEngineer}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-corporate-navy">
                Tenaga Ahli / Inspektor Lapangan (Maks. 4) <span className="text-status-danger">*</span>
              </label>
              {inspektors.length < 4 && (
                <button
                  type="button"
                  onClick={handleAddInspektor}
                  className="text-xs font-bold text-corporate-navy hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Inspektor
                </button>
              )}
            </div>

            {inspektors.map((inspektor, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={inspektor}
                  onChange={(e) => handleInspektorChange(idx, e.target.value)}
                  placeholder={`Inspektor #${idx + 1} (Contoh: MUBALLIGH, ST., M.Sc.)`}
                  className="flex-1 px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-sm text-slate-800 focus:outline-none focus:border-corporate-navy focus:bg-white transition-all uppercase"
                />
                {inspektors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveInspektor(idx)}
                    className="p-2.5 text-status-danger hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            {errors.inspektor && (
              <span className="text-[11px] font-medium text-status-danger block">
                {errors.inspektor}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
              Tenaga Administrasi Proyek <span className="text-status-danger">*</span>
            </label>
            <input
              type="text"
              value={administrasi}
              onChange={(e) => {
                setAdministrasi(e.target.value);
                if (errors.administrasi) setErrors((prev) => ({ ...prev, administrasi: '' }));
              }}
              placeholder="Contoh: HANGGORO AJI"
              className={`w-full px-3.5 py-2.5 bg-[#F8FAFC] border rounded-xl text-sm text-slate-800 focus:outline-none focus:bg-white uppercase ${
                errors.administrasi
                  ? 'border-status-danger ring-1 ring-status-danger bg-red-50/20'
                  : 'border-corporate-border focus:border-corporate-navy'
              }`}
            />
            {errors.administrasi && (
              <span className="text-[11px] font-medium text-status-danger mt-1 block">
                {errors.administrasi}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            to="/kontrak"
            className="px-5 py-2.5 rounded-xl border border-corporate-border bg-white text-corporate-slate hover:bg-corporate-slateLighter text-sm font-semibold transition-colors"
          >
            Batal
          </Link>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2.5 rounded-xl bg-corporate-navy text-white text-sm font-bold hover:bg-corporate-slateDark transition-all flex items-center gap-2 shadow-sm disabled:opacity-60"
          >
            {isLoading ? (
              <span>Menyimpan...</span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isEditMode ? 'Simpan Perubahan' : 'Buat Kontrak Baru'}</span>
              </>
            )}
          </button>
        </div>
      </form>

      <SuccessStateModal
        isOpen={showSuccessModal}
        title={isEditMode ? 'Kontrak Berhasil Diperbarui!' : 'Kontrak Baru Berhasil Dibuat!'}
        description={
          isEditMode
            ? 'Perubahan data kontrak pengawasan telah tersimpan dan terintegrasi ke seluruh modul sistem.'
            : 'Data kontrak baru telah berhasil disimpan dan ditambahkan ke daftar kontrak aktif CV. Tata Saka.'
        }
        details={successDetails}
        primaryActionLabel="Lihat Daftar Kontrak"
        onPrimaryAction={() => {
          setShowSuccessModal(false);
          navigate('/kontrak');
        }}
        secondaryActionLabel={isEditMode ? 'Tetap di Halaman Ini' : 'Tambah Kontrak Lain'}
        onSecondaryAction={() => {
          setShowSuccessModal(false);
          if (!isEditMode) {
            setNamaKontrak('');
            setNomorSpk('');
            setNomorSpmk('');
            setNilaiKontrakDisplay('');
          }
        }}
      />
    </div>
  );
};

export default FormKontrak;
