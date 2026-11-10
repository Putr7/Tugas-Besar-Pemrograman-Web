import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Building2,
  HardHat,
  Plus,
  Trash2,
  CloudSun,
  FileText,
  PenTool,
  Camera,
  Truck,
  RotateCcw,
  Sparkles,
  Layers,
  Wrench,
  Users,
  CheckCircle2,
  Flame,
} from 'lucide-react';
import { sampleContractData } from '../../data/sampleContractData';

interface MaterialItem {
  id: string;
  jenis: string;
  volume: string;
  lokasiAwal: string;
  lokasiTujuan: string;
}

interface PeralatanItem {
  id: string;
  jenis: string;
  cacahAktif: string;
  jumlah: string;
  kode: string;
  rusak: string;
}

interface PersonilItem {
  id: string;
  role: string;
  cacah: string;
  lokasi: string;
}

interface PekerjaanRow {
  id: string;
  jenis: string;
  volume: string;
  satuan: string;
  lokasi: string;
  materials: MaterialItem[];
  peralatans: PeralatanItem[];
  personils: PersonilItem[];
}

interface CuacaRow {
  id: string;
  cuaca: string;
  jenisKejadian: string;
  jam: string;
  lokasi: string;
  tanggungJawab: string;
  akibat: string;
}

interface RitaseAspalRow {
  id: string;
  nomorKendaraan: string;
  jamPergiAmp: string;
  suhuAmp: string;
  jamDatangLap: string;
  suhuDatang: string;
  jamMulaiTuang: string;
  suhuLap: string;
  jamSelesaiTuang: string;
  suhuPemadatanAkhir: string;
  jamPulangLap: string;
  tonaseTiket: string;
}

interface ReadyMixBetonRow {
  id: string;
  nomorKendaraan: string;
  batchingPlant: string;
  jamBerangkat: string;
  jamDatang: string;
  slumpTest: string;
  volume: string;
}

interface CustomField {
  id: string;
  nama: string;
  isi: string;
}

export const BuatLaporanHarian: React.FC = () => {
  const navigate = useNavigate();
  const contract = sampleContractData;

  // 1. Tanggal Pengawasan
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // 2. Kontrak & Kegiatan
  const [selectedKegiatanIdx, setSelectedKegiatanIdx] = useState<number>(0);
  const currentKegiatan = contract.kegiatans[selectedKegiatanIdx] || contract.kegiatans[0];

  // 3. A - D. Pekerjaan & Sumber Daya
  const [pekerjaanList, setPekerjaanList] = useState<PekerjaanRow[]>([
    {
      id: 'pek-1',
      jenis: 'Galian Tanah untuk Saluran Drainase U-Ditch',
      volume: '42.00',
      satuan: 'm³',
      lokasi: 'STA 0+000 - STA 0+200',
      materials: [
        {
          id: 'mat-1',
          jenis: 'U-Ditch Precast DS 2 (40x40 cm)',
          volume: '25 Unit',
          lokasiAwal: 'Pabrik Precast',
          lokasiTujuan: 'STA 0+100',
        },
        {
          id: 'mat-2',
          jenis: 'Pasir Urug / Pasang',
          volume: '5 m³',
          lokasiAwal: 'Quarry',
          lokasiTujuan: 'STA 0+050',
        },
      ],
      peralatans: [
        {
          id: 'alt-1',
          jenis: 'Excavator Mini PC75',
          cacahAktif: '1 Unit',
          jumlah: '1 Unit',
          kode: 'EX-01',
          rusak: 'Kondisi Baik / Siap Operasi',
        },
        {
          id: 'alt-2',
          jenis: 'Dump Truck 8 Ton',
          cacahAktif: '2 Unit',
          jumlah: '2 Unit',
          kode: 'DT-03',
          rusak: 'Kondisi Baik',
        },
      ],
      personils: [
        {
          id: 'per-1',
          role: 'Pelaksana Lapangan',
          cacah: '1 Orang',
          lokasi: 'STA 0+000 - STA 0+200',
        },
        {
          id: 'per-2',
          role: 'Mandor Pekerja',
          cacah: '1 Orang',
          lokasi: 'STA 0+000',
        },
        {
          id: 'per-3',
          role: 'Pekerja Terampil',
          cacah: '5 Orang',
          lokasi: 'STA 0+000 - STA 0+150',
        },
      ],
    },
  ]);

  // 4. E. Cuaca & Kejadian
  const [cuacaList, setCuacaList] = useState<CuacaRow[]>([
    {
      id: 'c-1',
      cuaca: 'Cerah',
      jenisKejadian: 'Pekerjaan Berjalan Normal',
      jam: '08:00 - 17:00',
      lokasi: 'STA 0+000 - STA 0+350',
      tanggungJawab: 'Tidak',
      akibat: 'Tidak ada hambatan cuaca pada progres hari ini.',
    },
  ]);

  // 5. F. Instruksi Konsultan
  const [instruksiKonsultan, setInstruksiKonsultan] = useState<string>(
    '1. Pastikan kedalaman elevasi kemiringan saluran drainase dicek berkala dengan waterpass.\n2. Seluruh pekerja wajib mengenakan APD (rompi & helm pengaman) di area manuver excavator.\n3. Material galian tanah dibersihkan agar tidak menutup bahu jalan.'
  );

  // 6. G. TTD Pengawas
  const [ttdNama, setTtdNama] = useState<string>(
    contract.strukturOrganisasi.siteEngineer || 'SENDAYU GALIH K., ST'
  );
  const [ttdJabatan, setTtdJabatan] = useState<string>('Site Engineer (Konsultan Supervisi)');
  const [isSigned, setIsSigned] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // 7. H. Dokumentasi Foto Lapangan
  const [fotoList, setFotoList] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 8. Dokumen Rekapitulasi Aspal (Opsional)
  const [enableAspal, setEnableAspal] = useState<boolean>(false);
  const [jenisMaterialAspal, setJenisMaterialAspal] = useState('AC - WC');
  const [penyediaAmp, setPenyediaAmp] = useState('CV. SATYA WIGUNA');
  const [jarakTempuh, setJarakTempuh] = useState('35.5');
  const [ritaseAspalList, setRitaseAspalList] = useState<RitaseAspalRow[]>([
    {
      id: 'dt-1',
      nomorKendaraan: 'R 8076 OE',
      jamPergiAmp: '08:30:00',
      suhuAmp: '155',
      jamDatangLap: '09:20:00',
      suhuDatang: '150',
      jamMulaiTuang: '09:30:00',
      suhuLap: '145',
      jamSelesaiTuang: '09:55:00',
      suhuPemadatanAkhir: '95',
      jamPulangLap: '10:05:00',
      tonaseTiket: '8.50',
    },
  ]);

  // 9. Dokumen Rekapitulasi Beton (Opsional)
  const [enableBeton, setEnableBeton] = useState<boolean>(false);
  const [penyediaJasaBeton, setPenyediaJasaBeton] = useState('PT. VARIA USAHA BETON');
  const [jenisBeton, setJenisBeton] = useState("Fc' 20 MPa / Rigid Pavement");
  const [betonList, setBetonList] = useState<ReadyMixBetonRow[]>([
    {
      id: 'bt-1',
      nomorKendaraan: 'R 9102 AB',
      batchingPlant: 'Plant Purbalingga',
      jamBerangkat: '08:15:00',
      jamDatang: '08:50:00',
      slumpTest: '10 ± 2 cm',
      volume: '6.0',
    },
  ]);

  // 10. Field Kustom
  const [customFields, setCustomFields] = useState<CustomField[]>([]);

  // ── Helper Canvas TTD ──────────────────────────────────────────────────────
  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    setIsDrawing(true);
    setIsSigned(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#202938';
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsSigned(false);
  };

  // ── Helper Foto ────────────────────────────────────────────────────────────
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFotoList((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (idx: number) => {
    setFotoList((prev) => prev.filter((_, i) => i !== idx));
  };

  // ── Helper Format Tanggal Indonesia ────────────────────────────────────────
  const formatIndoDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    return `${days[date.getDay()]}, ${String(date.getDate()).padStart(2, '0')} ${
      months[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  // ── Action Handlers Pekerjaan ──────────────────────────────────────────────
  const addPekerjaanRow = () => {
    setPekerjaanList((prev) => [
      ...prev,
      {
        id: `pek-${Date.now()}`,
        jenis: '',
        volume: '',
        satuan: 'm²',
        lokasi: currentKegiatan.lokasi,
        materials: [],
        peralatans: [],
        personils: [],
      },
    ]);
  };

  const removePekerjaanRow = (index: number) => {
    setPekerjaanList((prev) => prev.filter((_, i) => i !== index));
  };

  const addMaterial = (pIdx: number) => {
    setPekerjaanList((prev) => {
      const copy = [...prev];
      copy[pIdx].materials.push({
        id: `mat-${Date.now()}`,
        jenis: '',
        volume: '',
        lokasiAwal: '',
        lokasiTujuan: '',
      });
      return copy;
    });
  };

  const removeMaterial = (pIdx: number, mIdx: number) => {
    setPekerjaanList((prev) => {
      const copy = [...prev];
      copy[pIdx].materials = copy[pIdx].materials.filter((_, i) => i !== mIdx);
      return copy;
    });
  };

  const addPeralatan = (pIdx: number) => {
    setPekerjaanList((prev) => {
      const copy = [...prev];
      copy[pIdx].peralatans.push({
        id: `alt-${Date.now()}`,
        jenis: '',
        cacahAktif: '1 Unit',
        jumlah: '1 Unit',
        kode: '',
        rusak: 'Normal',
      });
      return copy;
    });
  };

  const removePeralatan = (pIdx: number, aIdx: number) => {
    setPekerjaanList((prev) => {
      const copy = [...prev];
      copy[pIdx].peralatans = copy[pIdx].peralatans.filter((_, i) => i !== aIdx);
      return copy;
    });
  };

  const addPersonil = (pIdx: number) => {
    setPekerjaanList((prev) => {
      const copy = [...prev];
      copy[pIdx].personils.push({
        id: `per-${Date.now()}`,
        role: '',
        cacah: '1 Orang',
        lokasi: currentKegiatan.lokasi,
      });
      return copy;
    });
  };

  const removePersonil = (pIdx: number, prIdx: number) => {
    setPekerjaanList((prev) => {
      const copy = [...prev];
      copy[pIdx].personils = copy[pIdx].personils.filter((_, i) => i !== prIdx);
      return copy;
    });
  };

  // ── Cuaca Handlers ─────────────────────────────────────────────────────────
  const addCuacaRow = () => {
    setCuacaList((prev) => [
      ...prev,
      {
        id: `c-${Date.now()}`,
        cuaca: 'Cerah',
        jenisKejadian: '',
        jam: '12:00 - 15:00',
        lokasi: currentKegiatan.lokasi,
        tanggungJawab: 'Tidak',
        akibat: '',
      },
    ]);
  };

  // ── Simpan Laporan Dummy ───────────────────────────────────────────────────
  const handleSimpan = () => {
    alert(
      `Formulir Laporan Harian (${formatIndoDate(
        selectedDate
      )}) siap diintegrasikan!\nData belum disimpan ke database sesuai arahan.`
    );
    navigate('/laporan');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* ── Top Bar Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between pb-4 border-b border-corporate-border">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/laporan')}
            className="p-2 rounded-xl text-corporate-slate hover:text-corporate-navy hover:bg-white border border-corporate-border transition-colors shadow-sm"
            title="Kembali ke Laporan"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Buku Harian Standar
              </span>
              <span className="text-xs text-corporate-slate">Konsultan Supervisi</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-corporate-navy tracking-tight mt-0.5">
              Form Buku Harian Standar
            </h1>
          </div>
        </div>

        <button
          onClick={handleSimpan}
          className="px-5 py-2.5 bg-corporate-navy text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-corporate-slateDark transition-colors shadow-sm flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Simpan Laporan</span>
        </button>
      </div>

      {/* ── 1. Tanggal Pengawasan ───────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-corporate-border p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-corporate-navy font-bold text-sm pb-2 border-b border-corporate-border">
          <Calendar className="w-4 h-4 text-corporate-navy" />
          <span>Hari / Tanggal Pengawasan</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-corporate-slate">Tanggal Pelaksanaan Lapangan</p>
            <p className="text-base font-extrabold text-corporate-navy mt-0.5">
              {formatIndoDate(selectedDate)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 bg-[#F8FAFC] border border-corporate-border rounded-xl text-xs font-semibold text-corporate-navy focus:outline-none focus:bg-white focus:border-corporate-navy transition-all"
            />
          </div>
        </div>
      </div>

      {/* ── 2. Pilih Kontrak & Kegiatan ─────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-corporate-border p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-corporate-navy font-bold text-sm pb-2 border-b border-corporate-border">
          <Building2 className="w-4 h-4 text-corporate-navy" />
          <span>Pilih Kontrak & Kegiatan</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
              Kontrak Pengawasan *
            </label>
            <select
              disabled
              value={contract.id}
              className="w-full px-3.5 py-2.5 bg-corporate-slateLighter/70 border border-corporate-border rounded-xl text-xs sm:text-sm font-semibold text-corporate-navy cursor-not-allowed"
            >
              <option value={contract.id}>{contract.namaKontrak}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
              Kegiatan / Ruas Jalan *
            </label>
            <select
              value={selectedKegiatanIdx}
              onChange={(e) => setSelectedKegiatanIdx(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-xs sm:text-sm font-semibold text-corporate-navy focus:bg-white focus:outline-none focus:border-corporate-navy transition-all"
            >
              {contract.kegiatans.map((k, idx) => (
                <option key={idx} value={idx}>
                  {k.namaKegiatan} — {k.lokasi}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Info Meta Kontrak */}
        <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-corporate-border grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <span className="text-corporate-slate block text-[11px]">Lokasi Ruas:</span>
            <span className="font-bold text-corporate-navy">{currentKegiatan.lokasi}</span>
          </div>
          <div>
            <span className="text-corporate-slate block text-[11px]">Kontraktor Pelaksana:</span>
            <span className="font-bold text-corporate-navy">{currentKegiatan.kontraktor}</span>
          </div>
          <div>
            <span className="text-corporate-slate block text-[11px]">Sumber Dana:</span>
            <span className="font-bold text-corporate-navy">{contract.sumberDana}</span>
          </div>
        </div>
      </div>

      {/* ── 3. A - D. Pekerjaan & Sumber Daya ───────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-corporate-border p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-corporate-border">
          <div className="flex items-center gap-2 text-corporate-navy font-bold text-sm">
            <Layers className="w-4 h-4 text-corporate-navy" />
            <span>A - D. Pekerjaan & Sumber Daya</span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-corporate-slateLighter text-corporate-slate">
            {pekerjaanList.length} Item Pekerjaan
          </span>
        </div>

        <div className="space-y-4">
          {pekerjaanList.map((pek, pIdx) => (
            <div
              key={pek.id}
              className="rounded-2xl border border-corporate-border bg-[#F8FAFC] overflow-hidden"
            >
              {/* Header Box Pekerjaan */}
              <div className="px-4 py-2.5 bg-slate-100/80 border-b border-corporate-border flex items-center justify-between">
                <span className="text-xs font-bold text-corporate-navy">
                  Pekerjaan #{pIdx + 1}
                </span>
                {pekerjaanList.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePekerjaanRow(pIdx)}
                    className="p-1 text-status-danger hover:bg-red-50 rounded transition-colors"
                    title="Hapus baris pekerjaan ini"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="p-4 space-y-4">
                {/* A. Pekerjaan */}
                <div className="space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-corporate-navy">
                    A. Uraian Pekerjaan
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-corporate-slate mb-1">
                        Jenis Pekerjaan
                      </label>
                      <input
                        type="text"
                        value={pek.jenis}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPekerjaanList((prev) => {
                            const c = [...prev];
                            c[pIdx].jenis = val;
                            return c;
                          });
                        }}
                        placeholder="Contoh: Pekerjaan Galian Tanah Saluran"
                        className="w-full px-3 py-2 bg-white border border-corporate-border rounded-xl text-xs font-semibold text-corporate-navy focus:outline-none focus:border-corporate-navy"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-corporate-slate mb-1">
                        Volume Realisasi
                      </label>
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={pek.volume}
                          onChange={(e) => {
                            const val = e.target.value;
                            setPekerjaanList((prev) => {
                              const c = [...prev];
                              c[pIdx].volume = val;
                              return c;
                            });
                          }}
                          placeholder="42.00"
                          className="w-full px-3 py-2 bg-white border border-corporate-border rounded-xl text-xs font-bold text-corporate-navy focus:outline-none focus:border-corporate-navy"
                        />
                        <select
                          value={pek.satuan}
                          onChange={(e) => {
                            const val = e.target.value;
                            setPekerjaanList((prev) => {
                              const c = [...prev];
                              c[pIdx].satuan = val;
                              return c;
                            });
                          }}
                          className="px-2 py-2 bg-white border border-corporate-border rounded-xl text-xs font-semibold text-corporate-slate focus:outline-none"
                        >
                          <option value="m³">m³</option>
                          <option value="m²">m²</option>
                          <option value="m1">m1</option>
                          <option value="Ton">Ton</option>
                          <option value="Liter">Liter</option>
                          <option value="Ls">Ls</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-corporate-slate mb-1">
                      Lokasi / STA Pekerjaan
                    </label>
                    <input
                      type="text"
                      value={pek.lokasi}
                      onChange={(e) => {
                        const val = e.target.value;
                        setPekerjaanList((prev) => {
                          const c = [...prev];
                          c[pIdx].lokasi = val;
                          return c;
                        });
                      }}
                      placeholder="STA 0+000 - STA 0+200"
                      className="w-full px-3 py-2 bg-white border border-corporate-border rounded-xl text-xs text-corporate-navy focus:outline-none focus:border-corporate-navy"
                    />
                  </div>
                </div>

                <div className="h-px bg-corporate-border" />

                {/* B. Material Digunakan */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-corporate-navy flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-corporate-slate" />
                      <span>B. Material Digunakan ({pek.materials.length})</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => addMaterial(pIdx)}
                      className="text-[11px] font-bold text-corporate-navy hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Tambah Bahan
                    </button>
                  </div>

                  {pek.materials.length === 0 ? (
                    <p className="text-[11px] text-corporate-slate italic">
                      Tidak ada material khusus untuk pekerjaan ini.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {pek.materials.map((mat, mIdx) => (
                        <div
                          key={mat.id}
                          className="p-2.5 bg-white rounded-xl border border-corporate-border flex items-center gap-2 text-xs"
                        >
                          <input
                            type="text"
                            value={mat.jenis}
                            onChange={(e) => {
                              const val = e.target.value;
                              setPekerjaanList((prev) => {
                                const c = [...prev];
                                c[pIdx].materials[mIdx].jenis = val;
                                return c;
                              });
                            }}
                            placeholder="Jenis Material (misal: U-Ditch 40x40)"
                            className="flex-1 px-2.5 py-1.5 bg-[#F8FAFC] border border-corporate-border rounded-lg text-xs"
                          />
                          <input
                            type="text"
                            value={mat.volume}
                            onChange={(e) => {
                              const val = e.target.value;
                              setPekerjaanList((prev) => {
                                const c = [...prev];
                                c[pIdx].materials[mIdx].volume = val;
                                return c;
                              });
                            }}
                            placeholder="Volume (misal: 25 Unit)"
                            className="w-28 px-2.5 py-1.5 bg-[#F8FAFC] border border-corporate-border rounded-lg text-xs"
                          />
                          <input
                            type="text"
                            value={mat.lokasiAwal}
                            onChange={(e) => {
                              const val = e.target.value;
                              setPekerjaanList((prev) => {
                                const c = [...prev];
                                c[pIdx].materials[mIdx].lokasiAwal = val;
                                return c;
                              });
                            }}
                            placeholder="Asal (Quarry)"
                            className="w-28 px-2.5 py-1.5 bg-[#F8FAFC] border border-corporate-border rounded-lg text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => removeMaterial(pIdx, mIdx)}
                            className="p-1 text-slate-400 hover:text-status-danger"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="h-px bg-corporate-border" />

                {/* C. Peralatan */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-corporate-navy flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-corporate-slate" />
                      <span>C. Peralatan yang Digunakan ({pek.peralatans.length})</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => addPeralatan(pIdx)}
                      className="text-[11px] font-bold text-corporate-navy hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Tambah Alat
                    </button>
                  </div>

                  {pek.peralatans.length === 0 ? (
                    <p className="text-[11px] text-corporate-slate italic">
                      Tidak ada alat berat yang dicatat.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {pek.peralatans.map((alt, aIdx) => (
                        <div
                          key={alt.id}
                          className="p-2.5 bg-white rounded-xl border border-corporate-border flex items-center gap-2 text-xs"
                        >
                          <input
                            type="text"
                            value={alt.jenis}
                            onChange={(e) => {
                              const val = e.target.value;
                              setPekerjaanList((prev) => {
                                const c = [...prev];
                                c[pIdx].peralatans[aIdx].jenis = val;
                                return c;
                              });
                            }}
                            placeholder="Jenis Alat (Excavator PC75)"
                            className="flex-1 px-2.5 py-1.5 bg-[#F8FAFC] border border-corporate-border rounded-lg text-xs"
                          />
                          <input
                            type="text"
                            value={alt.cacahAktif}
                            onChange={(e) => {
                              const val = e.target.value;
                              setPekerjaanList((prev) => {
                                const c = [...prev];
                                c[pIdx].peralatans[aIdx].cacahAktif = val;
                                return c;
                              });
                            }}
                            placeholder="Aktif (1 Unit)"
                            className="w-24 px-2.5 py-1.5 bg-[#F8FAFC] border border-corporate-border rounded-lg text-xs"
                          />
                          <input
                            type="text"
                            value={alt.rusak}
                            onChange={(e) => {
                              const val = e.target.value;
                              setPekerjaanList((prev) => {
                                const c = [...prev];
                                c[pIdx].peralatans[aIdx].rusak = val;
                                return c;
                              });
                            }}
                            placeholder="Kondisi (Baik)"
                            className="w-32 px-2.5 py-1.5 bg-[#F8FAFC] border border-corporate-border rounded-lg text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => removePeralatan(pIdx, aIdx)}
                            className="p-1 text-slate-400 hover:text-status-danger"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="h-px bg-corporate-border" />

                {/* D. Personil */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-corporate-navy flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-corporate-slate" />
                      <span>D. Personil Proyek ({pek.personils.length})</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => addPersonil(pIdx)}
                      className="text-[11px] font-bold text-corporate-navy hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Tambah Personil
                    </button>
                  </div>

                  {pek.personils.length === 0 ? (
                    <p className="text-[11px] text-corporate-slate italic">
                      Tidak ada rincian personil.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {pek.personils.map((per, prIdx) => (
                        <div
                          key={per.id}
                          className="p-2.5 bg-white rounded-xl border border-corporate-border flex items-center gap-2 text-xs"
                        >
                          <input
                            type="text"
                            value={per.role}
                            onChange={(e) => {
                              const val = e.target.value;
                              setPekerjaanList((prev) => {
                                const c = [...prev];
                                c[pIdx].personils[prIdx].role = val;
                                return c;
                              });
                            }}
                            placeholder="Jabatan / Peran (Mandor / Pekerja)"
                            className="flex-1 px-2.5 py-1.5 bg-[#F8FAFC] border border-corporate-border rounded-lg text-xs"
                          />
                          <input
                            type="text"
                            value={per.cacah}
                            onChange={(e) => {
                              const val = e.target.value;
                              setPekerjaanList((prev) => {
                                const c = [...prev];
                                c[pIdx].personils[prIdx].cacah = val;
                                return c;
                              });
                            }}
                            placeholder="Jumlah (5 Orang)"
                            className="w-28 px-2.5 py-1.5 bg-[#F8FAFC] border border-corporate-border rounded-lg text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => removePersonil(pIdx, prIdx)}
                            className="p-1 text-slate-400 hover:text-status-danger"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addPekerjaanRow}
          className="w-full py-2.5 bg-white border border-dashed border-corporate-border hover:border-corporate-navy text-corporate-navy text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Baris Pekerjaan Baru</span>
        </button>
      </div>

      {/* ── 4. E. Cuaca / Bencana / Kejadian Penghambat ───────────────────────── */}
      <div className="bg-white rounded-2xl border border-corporate-border p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-corporate-border">
          <div className="flex items-center gap-2 text-corporate-navy font-bold text-sm">
            <CloudSun className="w-4 h-4 text-corporate-navy" />
            <span>E. Cuaca & Kejadian Penghambat Pekerjaan</span>
          </div>
          <button
            type="button"
            onClick={addCuacaRow}
            className="text-xs font-bold text-corporate-navy hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Baris
          </button>
        </div>

        <div className="space-y-3">
          {cuacaList.map((c, cIdx) => (
            <div
              key={c.id}
              className="p-4 rounded-xl border border-corporate-border bg-[#F8FAFC] space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-corporate-navy">
                  Kejadian #{cIdx + 1}
                </span>
                {cuacaList.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setCuacaList((prev) => prev.filter((_, i) => i !== cIdx))}
                    className="p-1 text-status-danger hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-corporate-slate mb-1">
                    Kondisi Cuaca
                  </label>
                  <select
                    value={c.cuaca}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCuacaList((prev) => {
                        const copy = [...prev];
                        copy[cIdx].cuaca = val;
                        return copy;
                      });
                    }}
                    className="w-full px-3 py-2 bg-white border border-corporate-border rounded-xl text-xs font-semibold text-corporate-navy focus:outline-none"
                  >
                    <option value="Cerah">Cerah</option>
                    <option value="Cerah Berawan">Cerah Berawan</option>
                    <option value="Berawan">Berawan</option>
                    <option value="Hujan Ringan">Hujan Ringan</option>
                    <option value="Hujan Deras / Lebat">Hujan Deras / Lebat</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-corporate-slate mb-1">
                    Jenis Kejadian
                  </label>
                  <input
                    type="text"
                    value={c.jenisKejadian}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCuacaList((prev) => {
                        const copy = [...prev];
                        copy[cIdx].jenisKejadian = val;
                        return copy;
                      });
                    }}
                    placeholder="Normal / Genangan Air / Longsor"
                    className="w-full px-3 py-2 bg-white border border-corporate-border rounded-xl text-xs text-corporate-navy focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-corporate-slate mb-1">
                    Jam Kejadian
                  </label>
                  <input
                    type="text"
                    value={c.jam}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCuacaList((prev) => {
                        const copy = [...prev];
                        copy[cIdx].jam = val;
                        return copy;
                      });
                    }}
                    placeholder="14:00 - 16:30"
                    className="w-full px-3 py-2 bg-white border border-corporate-border rounded-xl text-xs text-corporate-navy focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-corporate-slate mb-1">
                  Akibat terhadap Pekerjaan
                </label>
                <input
                  type="text"
                  value={c.akibat}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCuacaList((prev) => {
                      const copy = [...prev];
                      copy[cIdx].akibat = val;
                      return copy;
                    });
                  }}
                  placeholder="Contoh: Pekerjaan pemadatan dihentikan sementara karena hujan."
                  className="w-full px-3 py-2 bg-white border border-corporate-border rounded-xl text-xs text-corporate-navy focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 5. F. Instruksi dan Saran-Saran ─────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-corporate-border p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-corporate-navy font-bold text-sm pb-2 border-b border-corporate-border">
          <FileText className="w-4 h-4 text-corporate-navy" />
          <span>F. Instruksi dan Saran-Saran Konsultan Supervisi</span>
        </div>
        <p className="text-xs text-corporate-slate">
          Instruksi resmi dari konsultan pengawas teknis (CV. TATA SAKA CONSULTANT) kepada
          kontraktor pelaksana di lapangan.
        </p>
        <textarea
          rows={4}
          value={instruksiKonsultan}
          onChange={(e) => setInstruksiKonsultan(e.target.value)}
          placeholder="Tuliskan catatan arahan teknis mutu pekerjaan, elevasi, maupun K3..."
          className="w-full p-3.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-xs text-corporate-navy focus:bg-white focus:outline-none focus:border-corporate-navy transition-all leading-relaxed"
        />
      </div>

      {/* ── 6. G. Tanda Tangan (TTD) Digital Pengawas ────────────────────────── */}
      <div className="bg-white rounded-2xl border border-corporate-border p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-corporate-navy font-bold text-sm pb-2 border-b border-corporate-border">
          <PenTool className="w-4 h-4 text-corporate-navy" />
          <span>G. Tanda Tangan (TTD) Pengawas Lapangan</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
              Nama Pengawas Teknis
            </label>
            <input
              type="text"
              value={ttdNama}
              onChange={(e) => setTtdNama(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-xs font-bold text-corporate-navy focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
              Jabatan Pengawas
            </label>
            <input
              type="text"
              value={ttdJabatan}
              onChange={(e) => setTtdJabatan(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-xs text-corporate-navy focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Canvas Pad */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-corporate-slate">
              Goreskan Tanda Tangan Digital:
            </span>
            <button
              type="button"
              onClick={clearCanvas}
              className="text-xs font-bold text-status-danger hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Bersihkan TTD
            </button>
          </div>
          <div className="border border-corporate-border rounded-xl bg-[#F8FAFC] overflow-hidden flex items-center justify-center p-2 relative">
            <canvas
              ref={canvasRef}
              width={500}
              height={140}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-36 bg-white rounded-lg border border-dashed border-corporate-border cursor-crosshair touch-none"
            />
            {!isSigned && (
              <span className="absolute text-xs text-slate-400 pointer-events-none select-none">
                Goreskan tanda tangan di sini
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── 7. H. Dokumentasi Foto Lapangan ─────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-corporate-border p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-corporate-border">
          <div className="flex items-center gap-2 text-corporate-navy font-bold text-sm">
            <Camera className="w-4 h-4 text-corporate-navy" />
            <span>H. Dokumentasi Foto Lapangan</span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-corporate-slateLighter text-corporate-slate">
            {fotoList.length} Foto Terlampir
          </span>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />

        <div
          onClick={() => fileInputRef.current?.click()}
          className="p-6 border-2 border-dashed border-corporate-border hover:border-corporate-navy rounded-2xl bg-[#F8FAFC] hover:bg-slate-50 transition-all text-center cursor-pointer space-y-2"
        >
          <Camera className="w-8 h-8 text-corporate-slate mx-auto" />
          <p className="text-xs font-bold text-corporate-navy">
            Klik untuk Unggah atau Tarik Foto Lapangan
          </p>
          <p className="text-[11px] text-corporate-slate">
            Mendukung file JPG, PNG, WEBP langsung dari perangkat kamera/galeri.
          </p>
        </div>

        {fotoList.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {fotoList.map((foto, idx) => (
              <div
                key={idx}
                className="relative rounded-xl border border-corporate-border overflow-hidden bg-slate-100 group aspect-video"
              >
                <img
                  src={foto}
                  alt={`Dokumentasi #${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(idx)}
                  className="absolute top-1.5 right-1.5 p-1 bg-red-600 text-white rounded-full opacity-80 hover:opacity-100 shadow transition-opacity"
                  title="Hapus foto"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
                <span className="absolute bottom-1 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/60 text-white">
                  #{idx + 1}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── 8. Dokumen Rekapitulasi Aspal (Opsional) ─────────────────────────── */}
      <div className="bg-white rounded-2xl border border-corporate-border p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-corporate-border">
          <div className="flex items-center gap-2 text-corporate-navy font-bold text-sm">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Dokumen Rekapitulasi Pengawasan Aspal (Opsional)</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={enableAspal}
              onChange={(e) => setEnableAspal(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-corporate-navy"></div>
          </label>
        </div>

        {enableAspal && (
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-corporate-border">
              <div>
                <label className="block text-[11px] font-semibold text-corporate-slate mb-1">
                  Jenis Material Aspal
                </label>
                <input
                  type="text"
                  value={jenisMaterialAspal}
                  onChange={(e) => setJenisMaterialAspal(e.target.value)}
                  placeholder="AC - WC / AC - BC"
                  className="w-full px-3 py-1.5 bg-white border border-corporate-border rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-corporate-slate mb-1">
                  Penyedia AMP
                </label>
                <input
                  type="text"
                  value={penyediaAmp}
                  onChange={(e) => setPenyediaAmp(e.target.value)}
                  placeholder="CV. SATYA WIGUNA"
                  className="w-full px-3 py-1.5 bg-white border border-corporate-border rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-corporate-slate mb-1">
                  Jarak Tempuh (km)
                </label>
                <input
                  type="text"
                  value={jarakTempuh}
                  onChange={(e) => setJarakTempuh(e.target.value)}
                  placeholder="35.5"
                  className="w-full px-3 py-1.5 bg-white border border-corporate-border rounded-lg text-xs"
                />
              </div>
            </div>

            {/* Ritase List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-corporate-navy">
                  Ritase Pengiriman DT Aspal ({ritaseAspalList.length} Rit)
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setRitaseAspalList((prev) => [
                      ...prev,
                      {
                        id: `dt-${Date.now()}`,
                        nomorKendaraan: 'R 8000 XX',
                        jamPergiAmp: '09:00:00',
                        suhuAmp: '155',
                        jamDatangLap: '09:45:00',
                        suhuDatang: '150',
                        jamMulaiTuang: '09:50:00',
                        suhuLap: '145',
                        jamSelesaiTuang: '10:15:00',
                        suhuPemadatanAkhir: '95',
                        jamPulangLap: '10:20:00',
                        tonaseTiket: '8.00',
                      },
                    ])
                  }
                  className="text-xs font-bold text-corporate-navy hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Ritase DT
                </button>
              </div>

              {ritaseAspalList.map((dt, idx) => (
                <div
                  key={dt.id}
                  className="p-3.5 bg-[#F8FAFC] rounded-xl border border-corporate-border space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between font-bold text-corporate-navy">
                    <span>Ritase #{idx + 1}</span>
                    {ritaseAspalList.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setRitaseAspalList((prev) => prev.filter((_, i) => i !== idx))
                        }
                        className="text-status-danger"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div>
                      <span className="text-[10px] text-corporate-slate block">Plat DT</span>
                      <input
                        type="text"
                        value={dt.nomorKendaraan}
                        onChange={(e) => {
                          const val = e.target.value;
                          setRitaseAspalList((prev) => {
                            const c = [...prev];
                            c[idx].nomorKendaraan = val;
                            return c;
                          });
                        }}
                        className="w-full px-2 py-1 bg-white border border-corporate-border rounded text-xs font-bold"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-corporate-slate block">Suhu AMP (°C)</span>
                      <input
                        type="text"
                        value={dt.suhuAmp}
                        onChange={(e) => {
                          const val = e.target.value;
                          setRitaseAspalList((prev) => {
                            const c = [...prev];
                            c[idx].suhuAmp = val;
                            return c;
                          });
                        }}
                        className="w-full px-2 py-1 bg-white border border-corporate-border rounded text-xs"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-corporate-slate block">Suhu Hampar Lapangan</span>
                      <input
                        type="text"
                        value={dt.suhuLap}
                        onChange={(e) => {
                          const val = e.target.value;
                          setRitaseAspalList((prev) => {
                            const c = [...prev];
                            c[idx].suhuLap = val;
                            return c;
                          });
                        }}
                        className="w-full px-2 py-1 bg-white border border-corporate-border rounded text-xs"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-corporate-slate block">Tonase Tiket (Ton)</span>
                      <input
                        type="text"
                        value={dt.tonaseTiket}
                        onChange={(e) => {
                          const val = e.target.value;
                          setRitaseAspalList((prev) => {
                            const c = [...prev];
                            c[idx].tonaseTiket = val;
                            return c;
                          });
                        }}
                        className="w-full px-2 py-1 bg-white border border-corporate-border rounded text-xs font-bold text-corporate-navy"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── 9. Dokumen Rekapitulasi Beton (Opsional) ─────────────────────────── */}
      <div className="bg-white rounded-2xl border border-corporate-border p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-corporate-border">
          <div className="flex items-center gap-2 text-corporate-navy font-bold text-sm">
            <Truck className="w-4 h-4 text-blue-500" />
            <span>Dokumen Rekapitulasi Pengecoran Beton Ready Mix (Opsional)</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={enableBeton}
              onChange={(e) => setEnableBeton(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-corporate-navy"></div>
          </label>
        </div>

        {enableBeton && (
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-corporate-border">
              <div>
                <label className="block text-[11px] font-semibold text-corporate-slate mb-1">
                  Penyedia Jasa Beton / Ready Mix
                </label>
                <input
                  type="text"
                  value={penyediaJasaBeton}
                  onChange={(e) => setPenyediaJasaBeton(e.target.value)}
                  placeholder="PT. VARIA USAHA BETON"
                  className="w-full px-3 py-1.5 bg-white border border-corporate-border rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-corporate-slate mb-1">
                  Mutu / Jenis Beton
                </label>
                <input
                  type="text"
                  value={jenisBeton}
                  onChange={(e) => setJenisBeton(e.target.value)}
                  placeholder="Fc' 20 MPa / K-250"
                  className="w-full px-3 py-1.5 bg-white border border-corporate-border rounded-lg text-xs"
                />
              </div>
            </div>

            {/* Truck Mixer List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-corporate-navy">
                  Data Pengiriman Truck Mixer ({betonList.length} Unit)
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setBetonList((prev) => [
                      ...prev,
                      {
                        id: `bt-${Date.now()}`,
                        nomorKendaraan: 'R 9000 XX',
                        batchingPlant: 'Plant Purbalingga',
                        jamBerangkat: '09:00:00',
                        jamDatang: '09:40:00',
                        slumpTest: '10 ± 2 cm',
                        volume: '6.0',
                      },
                    ])
                  }
                  className="text-xs font-bold text-corporate-navy hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Truck Mixer
                </button>
              </div>

              {betonList.map((bt, idx) => (
                <div
                  key={bt.id}
                  className="p-3.5 bg-[#F8FAFC] rounded-xl border border-corporate-border space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between font-bold text-corporate-navy">
                    <span>Truck Mixer #{idx + 1}</span>
                    {betonList.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setBetonList((prev) => prev.filter((_, i) => i !== idx))
                        }
                        className="text-status-danger"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div>
                      <span className="text-[10px] text-corporate-slate block">Plat Kendaraan</span>
                      <input
                        type="text"
                        value={bt.nomorKendaraan}
                        onChange={(e) => {
                          const val = e.target.value;
                          setBetonList((prev) => {
                            const c = [...prev];
                            c[idx].nomorKendaraan = val;
                            return c;
                          });
                        }}
                        className="w-full px-2 py-1 bg-white border border-corporate-border rounded text-xs font-bold"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-corporate-slate block">Batching Plant</span>
                      <input
                        type="text"
                        value={bt.batchingPlant}
                        onChange={(e) => {
                          const val = e.target.value;
                          setBetonList((prev) => {
                            const c = [...prev];
                            c[idx].batchingPlant = val;
                            return c;
                          });
                        }}
                        className="w-full px-2 py-1 bg-white border border-corporate-border rounded text-xs"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-corporate-slate block">Slump Test</span>
                      <input
                        type="text"
                        value={bt.slumpTest}
                        onChange={(e) => {
                          const val = e.target.value;
                          setBetonList((prev) => {
                            const c = [...prev];
                            c[idx].slumpTest = val;
                            return c;
                          });
                        }}
                        className="w-full px-2 py-1 bg-white border border-corporate-border rounded text-xs"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-corporate-slate block">Volume Cor (m³)</span>
                      <input
                        type="text"
                        value={bt.volume}
                        onChange={(e) => {
                          const val = e.target.value;
                          setBetonList((prev) => {
                            const c = [...prev];
                            c[idx].volume = val;
                            return c;
                          });
                        }}
                        className="w-full px-2 py-1 bg-white border border-corporate-border rounded text-xs font-bold text-corporate-navy"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── 10. Field Tambahan / Kustom ──────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-corporate-border p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-corporate-border">
          <div className="flex items-center gap-2 text-corporate-navy font-bold text-sm">
            <HardHat className="w-4 h-4 text-corporate-navy" />
            <span>Field Tambahan / Kustom</span>
          </div>
          <button
            type="button"
            onClick={() =>
              setCustomFields((prev) => [
                ...prev,
                { id: `cf-${Date.now()}`, nama: '', isi: '' },
              ])
            }
            className="text-xs font-bold text-corporate-navy hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Tambah Field
          </button>
        </div>

        {customFields.length === 0 ? (
          <p className="text-xs text-corporate-slate italic">
            Belum ada field tambahan. Klik tombol di atas jika ada catatan spesifik lain.
          </p>
        ) : (
          <div className="space-y-3">
            {customFields.map((cf, idx) => (
              <div
                key={cf.id}
                className="p-3.5 bg-[#F8FAFC] rounded-xl border border-corporate-border space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={cf.nama}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCustomFields((prev) => {
                        const copy = [...prev];
                        copy[idx].nama = val;
                        return copy;
                      });
                    }}
                    placeholder="Judul / Nama Field (contoh: Catatan Khusus PPK)"
                    className="font-bold text-corporate-navy px-2 py-1 bg-white border border-corporate-border rounded text-xs w-full max-w-xs"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setCustomFields((prev) => prev.filter((_, i) => i !== idx))
                    }
                    className="text-status-danger"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={cf.isi}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCustomFields((prev) => {
                      const copy = [...prev];
                      copy[idx].isi = val;
                      return copy;
                    });
                  }}
                  placeholder="Isi rincian atau catatan..."
                  className="w-full px-2.5 py-1.5 bg-white border border-corporate-border rounded text-xs focus:outline-none"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Bottom Submit Bar ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-corporate-border">
        <button
          type="button"
          onClick={() => navigate('/laporan')}
          className="px-5 py-2.5 rounded-xl border border-corporate-border bg-white text-corporate-slate hover:bg-corporate-slateLighter text-xs sm:text-sm font-semibold transition-colors"
        >
          Batal
        </button>
        <button
          type="button"
          onClick={handleSimpan}
          className="px-6 py-2.5 rounded-xl bg-corporate-navy text-white text-xs sm:text-sm font-bold hover:bg-corporate-slateDark transition-all shadow-sm flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Simpan Buku Harian Standar</span>
        </button>
      </div>
    </div>
  );
};

export default BuatLaporanHarian;
