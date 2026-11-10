import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  FileText,
  Plus,
  Trash2,
  ArrowLeft,
  Save,
  AlertTriangle,
  Layers,
} from 'lucide-react';
import { reportService, CreateReportPayload } from '../../services/report.service';
import { contractService } from '../../services/contract.service';
import { ContractData } from '../../data/sampleContractData';
import { useToast } from '../../store/toastStore';
import { SuccessStateModal } from '../../components/ui/SuccessStateModal';
import { validateRequired } from '../../utils/validation';

export const FormLaporan: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const toast = useToast();

  const cuacaOptions = ['Cerah', 'Cerah Berawan', 'Berawan', 'Hujan Ringan', 'Hujan Lebat'];

  const [contracts, setContracts] = useState<ContractData[]>([]);
  const [selectedContractId, setSelectedContractId] = useState('');
  const [selectedKegiatanNama, setSelectedKegiatanNama] = useState('');
  const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [cuaca, setCuaca] = useState('Cerah');
  const [lokasiSta, setLokasiSta] = useState('STA 0+000 - 0+350');
  const [kontraktor, setKontraktor] = useState('PT. BUMI REJEKI ABADI');
  const [catatan, setCatatan] = useState('');
  const [kejadian, setKejadian] = useState('Pekerjaan berjalan lancar tanpa kendala cuaca.');

  const [pekerjaanList, setPekerjaanList] = useState<
    Array<{ no: string; jenis: string; volume: string; lokasi: string; satuan: string }>
  >([
    {
      no: '1',
      jenis: 'Lapis Perekat (Tack Coat)',
      volume: '350',
      lokasi: 'STA 0+000 - 0+350',
      satuan: 'Liter',
    },
    {
      no: '2',
      jenis: 'Aspal AC-WC Manual / Finisher',
      volume: '42.5',
      lokasi: 'STA 0+000 - 0+350',
      satuan: 'Ton',
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successDetails, setSuccessDetails] = useState<Array<{ label: string; value: string }>>([]);

  useEffect(() => {
    const initData = async () => {
      try {
        setIsFetching(true);
        const contractList = await contractService.getContracts();
        setContracts(contractList);

        if (contractList.length > 0) {
          setSelectedContractId(contractList[0].id);
          if (contractList[0].kegiatans && contractList[0].kegiatans.length > 0) {
            setSelectedKegiatanNama(contractList[0].kegiatans[0].namaKegiatan);
            setKontraktor(contractList[0].kegiatans[0].kontraktor || 'PT. BUMI REJEKI ABADI');
          }
        }

        if (isEditMode && id) {
          const report = await reportService.getDailyReportById(id);
          if (report) {
            setTanggal(report.tanggal);
            setSelectedKegiatanNama(report.kegiatanNama);
            setLokasiSta(report.lokasiSta);
            setKontraktor(report.kontraktor);
            setCuaca(report.cuaca);
            setKejadian(report.kejadian);
            setCatatan(report.catatan);
            if (report.pekerjaan && report.pekerjaan.length > 0) {
              setPekerjaanList(report.pekerjaan);
            }
          }
        }
      } catch {
        toast.error('Gagal memuat data formulir laporan.');
      } finally {
        setIsFetching(false);
      }
    };
    initData();
  }, [isEditMode, id]);

  const handleContractChange = (contractId: string) => {
    setSelectedContractId(contractId);
    const found = contracts.find((c) => c.id === contractId);
    if (found && found.kegiatans && found.kegiatans.length > 0) {
      setSelectedKegiatanNama(found.kegiatans[0].namaKegiatan);
      setKontraktor(found.kegiatans[0].kontraktor);
    }
  };

  const handleAddPekerjaan = () => {
    const newNo = (pekerjaanList.length + 1).toString();
    setPekerjaanList((prev) => [
      ...prev,
      { no: newNo, jenis: '', volume: '', lokasi: lokasiSta, satuan: 'M2' },
    ]);
  };

  const handleRemovePekerjaan = (index: number) => {
    if (pekerjaanList.length > 1) {
      setPekerjaanList((prev) =>
        prev.filter((_, i) => i !== index).map((item, idx) => ({ ...item, no: (idx + 1).toString() }))
      );
    } else {
      toast.warning('Minimal harus ada 1 item jenis pekerjaan dalam laporan harian.');
    }
  };

  const handlePekerjaanChange = (
    index: number,
    field: 'jenis' | 'volume' | 'lokasi' | 'satuan',
    value: string
  ) => {
    setPekerjaanList((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const errTgl = validateRequired(tanggal, 'Tanggal Laporan');
    if (errTgl) newErrors.tanggal = errTgl;

    const errLokasi = validateRequired(lokasiSta, 'Lokasi STA');
    if (errLokasi) newErrors.lokasiSta = errLokasi;

    const errKegiatan = validateRequired(selectedKegiatanNama, 'Nama Ruas / Kegiatan');
    if (errKegiatan) newErrors.kegiatanNama = errKegiatan;

    const hasEmptyItem = pekerjaanList.some((p) => !p.jenis.trim() || !p.volume.trim());
    if (hasEmptyItem) {
      newErrors.pekerjaan = 'Semua baris item pekerjaan harus memiliki jenis uraian dan volume.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Periksa isian formulir yang belum lengkap.', 'Validasi Gagal');
      return;
    }

    try {
      setIsLoading(true);

      const formattedDate = new Date(tanggal).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      const payload: CreateReportPayload = {
        contractId: selectedContractId,
        kegiatanNama: selectedKegiatanNama,
        tanggal,
        tanggalFormatted: formattedDate,
        lokasiSta: lokasiSta.trim(),
        kontraktor,
        cuaca,
        kejadian: kejadian.trim(),
        catatan: catatan.trim(),
        pekerjaan: pekerjaanList,
      };

      if (isEditMode && id) {
        const res = await reportService.updateDailyReport(id, payload);
        toast.success(res.message || 'Laporan harian berhasil diperbarui via HTTP PUT.', 'Berhasil Diperbarui');
        setSuccessDetails([
          { label: 'Tanggal Laporan', value: formattedDate },
          { label: 'Ruas / Kegiatan', value: payload.kegiatanNama },
          { label: 'Jumlah Item Pekerjaan', value: `${pekerjaanList.length} Pekerjaan` },
          { label: 'Metode Pengiriman', value: 'HTTP PUT (Update)' },
        ]);
      } else {
        const res = await reportService.createDailyReport(payload);
        toast.success(res.message || 'Laporan harian pengawasan berhasil dibuat via HTTP POST.', 'Laporan Tersimpan');
        setSuccessDetails([
          { label: 'ID Laporan', value: res.data.id },
          { label: 'Tanggal Laporan', value: formattedDate },
          { label: 'Ruas / Kegiatan', value: payload.kegiatanNama },
          { label: 'Cuaca Lapangan', value: payload.cuaca },
          { label: 'Metode Pengiriman', value: 'HTTP POST (Create)' },
        ]);
      }

      setShowSuccessModal(true);
    } catch (err: any) {
      toast.error(err.message || 'Gagal menyimpan laporan harian.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="py-20 text-center">
        <div className="w-10 h-10 border-4 border-corporate-navy border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm font-semibold text-corporate-slate">Memuat formulir laporan...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link
          to="/laporan"
          className="p-2 rounded-xl text-corporate-slate hover:text-corporate-navy hover:bg-white border border-corporate-border transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-corporate-navy tracking-tight">
            {isEditMode ? 'Edit Laporan Harian Pengawasan' : 'Buat Laporan Harian Pengawasan'}
          </h1>
          <p className="text-xs text-corporate-slate mt-0.5">
            Dokumentasi pengawasan mutu, volume dan cuaca pekerjaan harian di lapangan
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border border-corporate-border p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-corporate-border text-corporate-navy font-bold text-sm">
            <FileText className="w-4 h-4 text-corporate-navy" />
            <span>1. Identitas Kontrak & Ruas Pekerjaan</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                Pilih Kontrak Pengawasan
              </label>
              <select
                value={selectedContractId}
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
                Ruas Jalan / Kegiatan <span className="text-status-danger">*</span>
              </label>
              <input
                type="text"
                value={selectedKegiatanNama}
                onChange={(e) => setSelectedKegiatanNama(e.target.value)}
                placeholder="Ruas Jalan MT Haryono"
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-sm text-slate-800 focus:outline-none focus:border-corporate-navy focus:bg-white"
              />
              {errors.kegiatanNama && (
                <span className="text-[11px] font-medium text-status-danger mt-1 block">
                  {errors.kegiatanNama}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                Tanggal Laporan <span className="text-status-danger">*</span>
              </label>
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-sm text-slate-800 focus:outline-none focus:border-corporate-navy focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                Lokasi / STA Lapangan <span className="text-status-danger">*</span>
              </label>
              <input
                type="text"
                value={lokasiSta}
                onChange={(e) => setLokasiSta(e.target.value)}
                placeholder="STA 0+000 - 0+350"
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-sm text-slate-800 focus:outline-none focus:border-corporate-navy focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                Kondisi Cuaca Lapangan
              </label>
              <select
                value={cuaca}
                onChange={(e) => setCuaca(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-sm text-slate-800 focus:outline-none focus:border-corporate-navy focus:bg-white"
              >
                {cuacaOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-corporate-border p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-corporate-border">
            <div className="flex items-center gap-2.5 text-corporate-navy font-bold text-sm">
              <Layers className="w-4 h-4 text-corporate-navy" />
              <span>2. Jenis & Realisasi Volume Pekerjaan Harian</span>
            </div>
            <button
              type="button"
              onClick={handleAddPekerjaan}
              className="text-xs font-bold text-corporate-navy hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah Item Pekerjaan
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] text-corporate-navy border-b border-corporate-border uppercase text-[10px] font-bold">
                <tr>
                  <th className="py-2.5 px-3 w-12 text-center">No</th>
                  <th className="py-2.5 px-3 min-w-[200px]">Uraian Jenis Pekerjaan</th>
                  <th className="py-2.5 px-3 w-28">Volume</th>
                  <th className="py-2.5 px-3 w-24">Satuan</th>
                  <th className="py-2.5 px-3 min-w-[140px]">Lokasi STA</th>
                  <th className="py-2.5 px-2 w-10 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-corporate-border">
                {pekerjaanList.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-2 px-3 text-center font-bold text-corporate-slate">
                      {item.no}
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={item.jenis}
                        onChange={(e) => handlePekerjaanChange(idx, 'jenis', e.target.value)}
                        placeholder="Contoh: Lapis Resap Pengikat"
                        className="w-full px-2.5 py-1.5 bg-[#F8FAFC] border border-corporate-border rounded-lg text-xs focus:bg-white focus:outline-none focus:border-corporate-navy"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={item.volume}
                        onChange={(e) => handlePekerjaanChange(idx, 'volume', e.target.value)}
                        placeholder="120"
                        className="w-full px-2.5 py-1.5 bg-[#F8FAFC] border border-corporate-border rounded-lg text-xs font-bold text-corporate-navy focus:bg-white focus:outline-none focus:border-corporate-navy"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <select
                        value={item.satuan}
                        onChange={(e) => handlePekerjaanChange(idx, 'satuan', e.target.value)}
                        className="w-full px-2 py-1.5 bg-[#F8FAFC] border border-corporate-border rounded-lg text-xs focus:bg-white focus:outline-none"
                      >
                        <option value="M2">M2</option>
                        <option value="M3">M3</option>
                        <option value="Ton">Ton</option>
                        <option value="Liter">Liter</option>
                        <option value="Kg">Kg</option>
                        <option value="Meter">Meter</option>
                        <option value="Ls">Ls</option>
                      </select>
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={item.lokasi}
                        onChange={(e) => handlePekerjaanChange(idx, 'lokasi', e.target.value)}
                        placeholder="STA 0+000"
                        className="w-full px-2.5 py-1.5 bg-[#F8FAFC] border border-corporate-border rounded-lg text-xs focus:bg-white focus:outline-none"
                      />
                    </td>
                    <td className="py-2 px-2 text-center">
                      <button
                        type="button"
                        onClick={() => handleRemovePekerjaan(idx)}
                        className="p-1.5 text-status-danger hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus baris"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {errors.pekerjaan && (
            <span className="text-[11px] font-medium text-status-danger block">{errors.pekerjaan}</span>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-corporate-border p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-corporate-border text-corporate-navy font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-corporate-navy" />
            <span>3. Kejadian Lapangan & Catatan Konsultan</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
              Hambatan / Kejadian yang Mempengaruhi Progres
            </label>
            <textarea
              rows={2}
              value={kejadian}
              onChange={(e) => setKejadian(e.target.value)}
              placeholder="Misal: Hujan lebat pukul 14:00 - 16:00 pekerjaan pemadatan dihentikan sementara."
              className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-sm text-slate-800 focus:outline-none focus:border-corporate-navy focus:bg-white resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
              Instruksi / Catatan Pengawas Teknis (CV. Tata Saka)
            </label>
            <textarea
              rows={2}
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Instruksi untuk rekan kontraktor..."
              className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-sm text-slate-800 focus:outline-none focus:border-corporate-navy focus:bg-white resize-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            to="/laporan"
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
              <span>Menyimpan Laporan...</span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isEditMode ? 'Simpan Perubahan Laporan (PUT)' : 'Kirim Laporan Harian (POST)'}</span>
              </>
            )}
          </button>
        </div>
      </form>

      <SuccessStateModal
        isOpen={showSuccessModal}
        title={isEditMode ? 'Laporan Harian Diperbarui!' : 'Laporan Harian Berhasil Disimpan!'}
        description={
          isEditMode
            ? 'Perubahan rincian pekerjaan dan volume telah diperbarui via HTTP PUT.'
            : 'Laporan harian pengawasan telah berhasil dikirim via HTTP POST dan tercatat pada rekap mingguan.'
        }
        details={successDetails}
        primaryActionLabel="Lihat Daftar Laporan"
        onPrimaryAction={() => {
          setShowSuccessModal(false);
          navigate('/laporan');
        }}
        secondaryActionLabel={isEditMode ? undefined : 'Buat Laporan Baru'}
        onSecondaryAction={() => {
          setShowSuccessModal(false);
          setCatatan('');
        }}
      />
    </div>
  );
};

export default FormLaporan;
