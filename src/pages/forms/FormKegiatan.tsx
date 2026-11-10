import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  MapPin,
  HardHat,
  Users,
  ArrowLeft,
  Save,
} from 'lucide-react';
import { contractService } from '../../services/contract.service';
import { useToast } from '../../store/toastStore';
import { SuccessStateModal } from '../../components/ui/SuccessStateModal';
import { validateRequired } from '../../utils/validation';

export const FormKegiatan: React.FC = () => {
  const navigate = useNavigate();
  const { contractId, kegiatanIndex } = useParams<{ contractId: string; kegiatanIndex?: string }>();
  const isEditMode = kegiatanIndex !== undefined;
  const parsedIndex = kegiatanIndex !== undefined ? parseInt(kegiatanIndex, 10) : -1;
  const toast = useToast();

  const [namaKegiatan, setNamaKegiatan] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [sumberDana, setSumberDana] = useState('');

  const [kontraktor, setKontraktor] = useState('');

  const [penggunaAnggaran, setPenggunaAnggaran] = useState('');
  const [stafTeknis1, setStafTeknis1] = useState('');
  const [stafTeknis2, setStafTeknis2] = useState('');
  const [siteEngineerKegiatan, setSiteEngineerKegiatan] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [contractName, setContractName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successDetails, setSuccessDetails] = useState<Array<{ label: string; value: string }>>([]);

  useEffect(() => {
    if (contractId) {
      const loadData = async () => {
        try {
          setIsFetching(true);
          const contract = await contractService.getContractById(contractId);
          if (contract) {
            setContractName(contract.namaKontrak);
            setSumberDana(contract.sumberDana);
            setSiteEngineerKegiatan(contract.strukturOrganisasi?.siteEngineer || '');

            if (isEditMode && parsedIndex >= 0 && contract.kegiatans && contract.kegiatans[parsedIndex]) {
              const k = contract.kegiatans[parsedIndex];
              setNamaKegiatan(k.namaKegiatan || '');
              setLokasi(k.lokasi || '');
              setSumberDana(k.sumberDana || contract.sumberDana);
              setKontraktor(k.kontraktor || '');
              setPenggunaAnggaran(k.penggunaAnggaran || '');
              setStafTeknis1(k.stafTeknis1 || '');
              setStafTeknis2(k.stafTeknis2 || '');
              setSiteEngineerKegiatan(k.siteEngineerKegiatan || contract.strukturOrganisasi?.siteEngineer || '');
            }
          }
        } catch {
          toast.error('Gagal mengambil informasi kontrak untuk kegiatan.');
        } finally {
          setIsFetching(false);
        }
      };
      loadData();
    }
  }, [contractId, isEditMode, parsedIndex]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const errNama = validateRequired(namaKegiatan, 'Nama Ruas / Kegiatan');
    if (errNama) newErrors.namaKegiatan = errNama;

    const errLokasi = validateRequired(lokasi, 'Lokasi STA / Wilayah');
    if (errLokasi) newErrors.lokasi = errLokasi;

    const errKontraktor = validateRequired(kontraktor, 'Nama Kontraktor Pelaksana');
    if (errKontraktor) newErrors.kontraktor = errKontraktor;

    const errPa = validateRequired(penggunaAnggaran, 'Pengguna Anggaran / PPK');
    if (errPa) newErrors.penggunaAnggaran = errPa;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contractId) {
      toast.error('ID Kontrak tidak valid.');
      return;
    }

    if (!validateForm()) {
      toast.error('Lengkapi semua data wajib yang ditandai merah.', 'Validasi Form');
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        namaKegiatan: namaKegiatan.trim().toUpperCase(),
        lokasi: lokasi.trim(),
        sumberDana: sumberDana.trim(),
        kontraktor: kontraktor.trim().toUpperCase(),
        penggunaAnggaran: penggunaAnggaran.trim().toUpperCase(),
        stafTeknis1: stafTeknis1.trim().toUpperCase(),
        stafTeknis2: stafTeknis2.trim().toUpperCase(),
        siteEngineerKegiatan: siteEngineerKegiatan.trim().toUpperCase(),
      };

      if (isEditMode && parsedIndex >= 0) {
        const res = await contractService.updateKegiatan(contractId, parsedIndex, payload);
        toast.success(res.message || 'Kegiatan ruas berhasil diperbarui via HTTP PUT.', 'Berhasil Diperbarui');
        setSuccessDetails([
          { label: 'Ruas / Kegiatan', value: payload.namaKegiatan },
          { label: 'Kontraktor', value: payload.kontraktor },
          { label: 'Metode Pengiriman', value: 'HTTP PUT (Update)' },
        ]);
      } else {
        const res = await contractService.createKegiatan(contractId, payload);
        toast.success(res.message || 'Kegiatan ruas berhasil ditambahkan via HTTP POST.', 'Tersimpan');
        setSuccessDetails([
          { label: 'Ruas / Kegiatan', value: payload.namaKegiatan },
          { label: 'Lokasi STA', value: payload.lokasi },
          { label: 'Kontraktor', value: payload.kontraktor },
          { label: 'Metode Pengiriman', value: 'HTTP POST (Create)' },
        ]);
      }

      setShowSuccessModal(true);
    } catch (err: any) {
      toast.error(err.message || 'Gagal menyimpan kegiatan ruas.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-corporate-navy border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm font-semibold text-corporate-slate">Memuat data kegiatan...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          to={`/kontrak/${contractId || ''}`}
          className="p-2 rounded-xl text-corporate-slate hover:text-corporate-navy hover:bg-white border border-corporate-border transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-corporate-navy tracking-tight">
            {isEditMode ? 'Edit Ruas / Kegiatan Pengawasan' : 'Tambah Ruas / Kegiatan Baru'}
          </h1>
          <p className="text-xs text-corporate-slate mt-0.5">
            Kontrak: <strong className="text-corporate-navy">{contractName || 'CV. Tata Saka'}</strong>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-corporate-border p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-corporate-border text-corporate-navy font-bold text-sm">
            <MapPin className="w-4 h-4 text-corporate-navy" />
            <span>1. Data Pokok Ruas Jalan / Kegiatan</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                Nama Ruas Jalan / Kegiatan <span className="text-status-danger">*</span>
              </label>
              <input
                type="text"
                value={namaKegiatan}
                onChange={(e) => {
                  setNamaKegiatan(e.target.value);
                  if (errors.namaKegiatan) setErrors((prev) => ({ ...prev, namaKegiatan: '' }));
                }}
                placeholder="Contoh: RUAS 1: JL. MT HARYONO STA 0+000 - 1+200"
                className={`w-full px-3.5 py-2.5 bg-[#F8FAFC] border rounded-xl text-sm text-slate-800 focus:outline-none focus:bg-white uppercase ${
                  errors.namaKegiatan
                    ? 'border-status-danger ring-1 ring-status-danger bg-red-50/20'
                    : 'border-corporate-border focus:border-corporate-navy'
                }`}
              />
              {errors.namaKegiatan && (
                <span className="text-[11px] font-medium text-status-danger mt-1 block">
                  {errors.namaKegiatan}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                Lokasi / Wilayah Kecamatan <span className="text-status-danger">*</span>
              </label>
              <input
                type="text"
                value={lokasi}
                onChange={(e) => {
                  setLokasi(e.target.value);
                  if (errors.lokasi) setErrors((prev) => ({ ...prev, lokasi: '' }));
                }}
                placeholder="Contoh: Kec. Purbalingga, Kab. Purbalingga"
                className={`w-full px-3.5 py-2.5 bg-[#F8FAFC] border rounded-xl text-sm text-slate-800 focus:outline-none focus:bg-white ${
                  errors.lokasi
                    ? 'border-status-danger ring-1 ring-status-danger bg-red-50/20'
                    : 'border-corporate-border focus:border-corporate-navy'
                }`}
              />
              {errors.lokasi && (
                <span className="text-[11px] font-medium text-status-danger mt-1 block">
                  {errors.lokasi}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
              Sumber Pendanaan
            </label>
            <input
              type="text"
              value={sumberDana}
              onChange={(e) => setSumberDana(e.target.value)}
              placeholder="APBD Kab. Purbalingga"
              className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-sm text-slate-800 focus:outline-none focus:border-corporate-navy focus:bg-white"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-corporate-border p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-corporate-border text-corporate-navy font-bold text-sm">
            <HardHat className="w-4 h-4 text-corporate-navy" />
            <span>2. Rekan Penyedia Jasa (Kontraktor Pelaksana)</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
              Nama Perusahaan Kontraktor <span className="text-status-danger">*</span>
            </label>
            <input
              type="text"
              value={kontraktor}
              onChange={(e) => {
                setKontraktor(e.target.value);
                if (errors.kontraktor) setErrors((prev) => ({ ...prev, kontraktor: '' }));
              }}
              placeholder="Contoh: PT. BUMI REJEKI ABADI"
              className={`w-full px-3.5 py-2.5 bg-[#F8FAFC] border rounded-xl text-sm text-slate-800 focus:outline-none focus:bg-white uppercase ${
                errors.kontraktor
                  ? 'border-status-danger ring-1 ring-status-danger bg-red-50/20'
                  : 'border-corporate-border focus:border-corporate-navy'
              }`}
            />
            {errors.kontraktor && (
              <span className="text-[11px] font-medium text-status-danger mt-1 block">
                {errors.kontraktor}
              </span>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-corporate-border p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-corporate-border text-corporate-navy font-bold text-sm">
            <Users className="w-4 h-4 text-corporate-navy" />
            <span>3. Pejabat & Pengawas Teknis Kegiatan</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                Pengguna Anggaran / PPK <span className="text-status-danger">*</span>
              </label>
              <input
                type="text"
                value={penggunaAnggaran}
                onChange={(e) => {
                  setPenggunaAnggaran(e.target.value);
                  if (errors.penggunaAnggaran) setErrors((prev) => ({ ...prev, penggunaAnggaran: '' }));
                }}
                placeholder="Contoh: GUNAWAN WIBOWO, ST"
                className={`w-full px-3.5 py-2.5 bg-[#F8FAFC] border rounded-xl text-sm text-slate-800 focus:outline-none focus:bg-white uppercase ${
                  errors.penggunaAnggaran
                    ? 'border-status-danger ring-1 ring-status-danger bg-red-50/20'
                    : 'border-corporate-border focus:border-corporate-navy'
                }`}
              />
              {errors.penggunaAnggaran && (
                <span className="text-[11px] font-medium text-status-danger mt-1 block">
                  {errors.penggunaAnggaran}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                Site Engineer Pengawas (Konsultan)
              </label>
              <input
                type="text"
                value={siteEngineerKegiatan}
                onChange={(e) => setSiteEngineerKegiatan(e.target.value)}
                placeholder="SENDAYU GALIH K., ST"
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-sm text-slate-800 focus:outline-none focus:border-corporate-navy focus:bg-white uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                Staf Teknis Dinas 1
              </label>
              <input
                type="text"
                value={stafTeknis1}
                onChange={(e) => setStafTeknis1(e.target.value)}
                placeholder="Contoh: TRI HARYANTO, ST"
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-sm text-slate-800 focus:outline-none focus:border-corporate-navy focus:bg-white uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                Staf Teknis Dinas 2
              </label>
              <input
                type="text"
                value={stafTeknis2}
                onChange={(e) => setStafTeknis2(e.target.value)}
                placeholder="Contoh: BAGUS PRAMONO, A.Md"
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-sm text-slate-800 focus:outline-none focus:border-corporate-navy focus:bg-white uppercase"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            to={`/kontrak/${contractId || ''}`}
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
              <span>Mengirim via HTTP {isEditMode ? 'PUT' : 'POST'}...</span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isEditMode ? 'Simpan Perubahan Ruas (PUT)' : 'Tambah Ruas Baru (POST)'}</span>
              </>
            )}
          </button>
        </div>
      </form>

      <SuccessStateModal
        isOpen={showSuccessModal}
        title={isEditMode ? 'Kegiatan Ruas Diperbarui!' : 'Kegiatan Ruas Berhasil Ditambahkan!'}
        description={
          isEditMode
            ? 'Perubahan data ruas kegiatan telah berhasil diperbarui via HTTP PUT.'
            : 'Ruas kegiatan baru telah tersimpan via HTTP POST di bawah kontrak pengawasan ini.'
        }
        details={successDetails}
        primaryActionLabel="Kembali ke Detail Kontrak"
        onPrimaryAction={() => {
          setShowSuccessModal(false);
          navigate(`/kontrak/${contractId || ''}`);
        }}
        secondaryActionLabel={isEditMode ? undefined : 'Tambah Ruas Lain'}
        onSecondaryAction={() => {
          setShowSuccessModal(false);
          setNamaKegiatan('');
          setLokasi('');
          setKontraktor('');
        }}
      />
    </div>
  );
};

export default FormKegiatan;
