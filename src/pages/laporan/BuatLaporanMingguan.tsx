import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Calendar,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  Percent,
  Clock,
  Eye,
  Edit3,
  Info,
} from 'lucide-react';
import { sampleContractData } from '../../data/sampleContractData';

export const BuatLaporanMingguan: React.FC = () => {
  const navigate = useNavigate();
  const contract = sampleContractData;

  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

  // 1. Selector Kontrak & Kegiatan
  const [selectedKegiatanIdx, setSelectedKegiatanIdx] = useState<number>(0);
  const currentKegiatan = contract.kegiatans[selectedKegiatanIdx] || contract.kegiatans[0];

  // 2. Data Pokok Kontrak
  const [pekerjaan, setPekerjaan] = useState(currentKegiatan.namaKegiatan);
  const [lokasi, setLokasi] = useState(currentKegiatan.lokasi);
  const [kontraktor, setKontraktor] = useState(currentKegiatan.kontraktor);
  const [jangkaWaktu, setJangkaWaktu] = useState(contract.hariKalender.toString());
  const [nomorKontrak] = useState(contract.nomorSpk);
  const [tanggalKontrak] = useState(contract.tglMulaiSpk);
  const [nilaiKontrak, setNilaiKontrak] = useState('850.000.000');
  const [tanggalSpmk] = useState('2026-10-20');
  const [akhirMasaKontrak] = useState(contract.tglSelesaiSpmk);

  // 3. Periode & Minggu Ke
  const [mingguKe, setMingguKe] = useState<number>(1);
  const [statusDokumen, setStatusDokumen] = useState<'Kontrak' | 'Adendum'>('Kontrak');

  // 4. Bobot Fisik %
  const [rencanaPersen, setRencanaPersen] = useState<number>(6.5);
  const [realisasiPersen, setRealisasiPersen] = useState<number>(7.2);

  // Kalkulasi Otomatis
  const totalDays = parseInt(jangkaWaktu, 10) || 90;
  const totalMinggu = Math.max(1, Math.ceil(totalDays / 7));

  const calcWeekRange = (w: number) => {
    const base = new Date(tanggalSpmk);
    const startDay = (w - 1) * 7;
    const endDay = Math.min(w * 7 - 1, totalDays - 1);
    const daysCount = Math.max(1, endDay - startDay + 1);

    const startDt = new Date(base);
    startDt.setDate(base.getDate() + startDay);

    const endDt = new Date(base);
    endDt.setDate(base.getDate() + endDay);

    const fmtIndo = (d: Date) =>
      d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const fmtSlash = (d: Date) =>
      `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;

    const elapsedDays = Math.min(w * 7, totalDays);
    const remainingDays = Math.max(0, totalDays - elapsedDays);

    return {
      w,
      daysCount,
      tglMulaiIndo: fmtIndo(startDt),
      tglSelesaiIndo: fmtIndo(endDt),
      tglMulaiSlash: fmtSlash(startDt),
      tglSelesaiSlash: fmtSlash(endDt),
      elapsedDays,
      remainingDays,
    };
  };

  const curRange = calcWeekRange(mingguKe);

  const numericNilaiKontrak = parseFloat(nilaiKontrak.replace(/[^0-9]/g, '')) || 850000000;
  const deviasiPersen = realisasiPersen - rencanaPersen;
  const rencanaNominal = (rencanaPersen / 100) * numericNilaiKontrak;
  const realisasiNominal = (realisasiPersen / 100) * numericNilaiKontrak;
  const deviasiNominal = realisasiNominal - rencanaNominal;
  const isPositive = deviasiPersen >= 0;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleKegiatanChange = (idx: number) => {
    setSelectedKegiatanIdx(idx);
    const k = contract.kegiatans[idx];
    if (k) {
      setPekerjaan(k.namaKegiatan);
      setLokasi(k.lokasi);
      setKontraktor(k.kontraktor);
      if (k.laporanMingguan && k.laporanMingguan[0]) {
        setRencanaPersen(k.laporanMingguan[0].rencana);
        setRealisasiPersen(k.laporanMingguan[0].realisasi);
      }
    }
  };

  const handleSimpan = () => {
    alert(
      `Ringkasan Laporan Mingguan (Minggu Ke-${mingguKe} - ${pekerjaan}) siap diintegrasikan!\nData belum disimpan ke database sesuai arahan.`
    );
    navigate('/laporan');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* ── Top Bar Header ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-corporate-border">
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
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                Laporan Mingguan
              </span>
              <span className="text-xs text-corporate-slate">Ringkasan Kegiatan & Kurva S</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-corporate-navy tracking-tight mt-0.5">
              Ringkasan Laporan Mingguan
            </h1>
          </div>
        </div>

        {/* Tab Switcher & Simpan */}
        <div className="flex items-center gap-2">
          <div className="flex bg-[#F8FAFC] border border-corporate-border rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('form')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'form'
                  ? 'bg-white text-corporate-navy shadow-sm'
                  : 'text-corporate-slate hover:text-corporate-navy'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Form Input</span>
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'preview'
                  ? 'bg-white text-corporate-navy shadow-sm'
                  : 'text-corporate-slate hover:text-corporate-navy'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Pratinjau Fisik</span>
            </button>
          </div>

          <button
            onClick={handleSimpan}
            className="px-4 py-2 bg-corporate-navy text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-corporate-slateDark transition-colors shadow-sm flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Simpan</span>
          </button>
        </div>
      </div>

      {activeTab === 'form' ? (
        <>
          {/* ── 1. Selector Kontrak & Kegiatan ──────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-corporate-border p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-corporate-navy font-bold text-sm pb-2 border-b border-corporate-border">
              <Building2 className="w-4 h-4 text-corporate-navy" />
              <span>1. Pilih Kontrak & Kegiatan Proyek</span>
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
                  onChange={(e) => handleKegiatanChange(Number(e.target.value))}
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
          </div>

          {/* ── 2. Data Pokok Kontrak Kegiatan ──────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-corporate-border p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-corporate-navy font-bold text-sm pb-2 border-b border-corporate-border">
              <FileText className="w-4 h-4 text-corporate-navy" />
              <span>2. Data Pokok Kontrak Kegiatan (Terintegrasi)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                  Pekerjaan (Nama Kegiatan)
                </label>
                <input
                  type="text"
                  value={pekerjaan}
                  onChange={(e) => setPekerjaan(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-xs font-bold text-corporate-navy focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                  Lokasi Proyek
                </label>
                <input
                  type="text"
                  value={lokasi}
                  onChange={(e) => setLokasi(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-xs text-corporate-navy focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                  Kontraktor Pelaksana
                </label>
                <input
                  type="text"
                  value={kontraktor}
                  onChange={(e) => setKontraktor(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-xs text-corporate-navy focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                  Jangka Waktu Kontrak (Hari Kalender)
                </label>
                <input
                  type="number"
                  value={jangkaWaktu}
                  onChange={(e) => setJangkaWaktu(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-corporate-border rounded-xl text-xs text-corporate-navy focus:outline-none focus:border-corporate-navy"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                  Nomor Kontrak (SPK)
                </label>
                <input
                  type="text"
                  readOnly
                  value={nomorKontrak}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-xs text-slate-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                  Tanggal Kontrak (SPK)
                </label>
                <input
                  type="text"
                  readOnly
                  value={tanggalKontrak}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-xs text-slate-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                  Nilai Kontrak Kegiatan (Rp)
                </label>
                <input
                  type="text"
                  value={nilaiKontrak}
                  onChange={(e) => setNilaiKontrak(e.target.value)}
                  placeholder="850.000.000"
                  className="w-full px-3.5 py-2.5 bg-white border border-corporate-border rounded-xl text-xs font-bold text-corporate-navy focus:outline-none focus:border-corporate-navy"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                  Tanggal SPMK
                </label>
                <input
                  type="text"
                  readOnly
                  value={contract.tglMulaiSpmk}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-xs text-slate-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                  Akhir Masa Kontrak
                </label>
                <input
                  type="text"
                  readOnly
                  value={akhirMasaKontrak}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-corporate-border rounded-xl text-xs text-slate-600 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* ── 3. Periode Pelaksanaan & Status ─────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-corporate-border p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-corporate-border">
              <div className="flex items-center gap-2 text-corporate-navy font-bold text-sm">
                <Calendar className="w-4 h-4 text-corporate-navy" />
                <span>3. Periode Pelaksanaan & Status</span>
              </div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                Minggu {mingguKe} dari {totalMinggu}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                  Laporan Minggu Ke - *
                </label>
                <select
                  value={mingguKe}
                  onChange={(e) => setMingguKe(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-white border border-corporate-border rounded-xl text-xs font-bold text-corporate-navy focus:outline-none focus:border-corporate-navy"
                >
                  {Array.from({ length: totalMinggu }, (_, i) => i + 1).map((w) => (
                    <option key={w} value={w}>
                      Minggu Ke-{w} (dari {totalMinggu} Minggu)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-corporate-navy mb-1.5">
                  Status Dokumen *
                </label>
                <select
                  value={statusDokumen}
                  onChange={(e) => setStatusDokumen(e.target.value as 'Kontrak' | 'Adendum')}
                  className="w-full px-3.5 py-2.5 bg-white border border-corporate-border rounded-xl text-xs font-bold text-corporate-navy focus:outline-none focus:border-corporate-navy"
                >
                  <option value="Kontrak">Kontrak (Normal)</option>
                  <option value="Adendum">Adendum</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-corporate-slate mb-1">
                  Periode Awal
                </label>
                <input
                  type="text"
                  readOnly
                  value={curRange.tglMulaiIndo}
                  className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-corporate-border rounded-xl text-xs text-corporate-navy cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-corporate-slate mb-1">
                  Periode Akhir
                </label>
                <input
                  type="text"
                  readOnly
                  value={curRange.tglSelesaiIndo}
                  className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-corporate-border rounded-xl text-xs text-corporate-navy cursor-not-allowed"
                />
              </div>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-xl border border-corporate-border text-xs text-corporate-slate flex items-center gap-2">
              <Clock className="w-4 h-4 text-corporate-navy shrink-0" />
              <span>
                Durasi minggu ini:{' '}
                <strong className="text-corporate-navy">{curRange.daysCount} hari kalender</strong> (
                {curRange.tglMulaiSlash} s/d {curRange.tglSelesaiSlash})
              </span>
            </div>
          </div>

          {/* ── 4. Kemajuan Bobot Fisik ─────────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-corporate-border p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-corporate-navy font-bold text-sm pb-2 border-b border-corporate-border">
              <Percent className="w-4 h-4 text-corporate-navy" />
              <span>4. Kemajuan Bobot Fisik s/d Minggu Ini</span>
            </div>

            {/* Rencana Fisik */}
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-corporate-border space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-corporate-slate">
                Rencana Fisik s/d Minggu Ini
              </span>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 w-36">
                  <input
                    type="number"
                    step="0.01"
                    value={rencanaPersen}
                    onChange={(e) => setRencanaPersen(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-white border border-corporate-border rounded-xl text-sm font-extrabold text-corporate-navy focus:outline-none focus:border-corporate-navy"
                  />
                  <span className="text-sm font-bold text-corporate-navy">%</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-corporate-slate block">
                    Nominal Rencana Kegiatan:
                  </span>
                  <span className="text-sm font-bold text-corporate-navy">
                    {formatRupiah(rencanaNominal)}
                  </span>
                </div>
              </div>
            </div>

            {/* Realisasi Fisik */}
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-corporate-border space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-corporate-slate">
                Realisasi Fisik s/d Minggu Ini
              </span>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 w-36">
                  <input
                    type="number"
                    step="0.01"
                    value={realisasiPersen}
                    onChange={(e) => setRealisasiPersen(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-white border border-corporate-border rounded-xl text-sm font-extrabold text-corporate-navy focus:outline-none focus:border-corporate-navy"
                  />
                  <span className="text-sm font-bold text-corporate-navy">%</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-corporate-slate block">
                    Nominal Realisasi Kegiatan:
                  </span>
                  <span className="text-sm font-bold text-corporate-navy">
                    {formatRupiah(realisasiNominal)}
                  </span>
                </div>
              </div>
            </div>

            {/* Deviasi */}
            <div
              className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
                isPositive
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-800'
                  : 'bg-red-50/70 border-red-200 text-red-800'
              }`}
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider block">
                  Deviasi (+/-) [Otomatis]
                </span>
                <span className="text-xs font-semibold mt-0.5 block">
                  {isPositive
                    ? `+${deviasiPersen.toFixed(2)}% (Lebih Cepat)`
                    : `${deviasiPersen.toFixed(2)}% (Terlambat)`}
                </span>
              </div>
              <div className="text-right">
                <span className="text-base font-extrabold block">
                  {isPositive ? `+${deviasiPersen.toFixed(2)}%` : `${deviasiPersen.toFixed(2)}%`}
                </span>
                <span className="text-xs font-medium block">
                  {formatRupiah(deviasiNominal)}
                </span>
              </div>
            </div>
          </div>

          {/* ── 5. Waktu Pelaksanaan Proyek ─────────────────────────────────── */}
          <div className="bg-white rounded-2xl border border-corporate-border p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-corporate-navy font-bold text-sm pb-2 border-b border-corporate-border">
              <Clock className="w-4 h-4 text-corporate-navy" />
              <span>5. Waktu Pelaksanaan Proyek (Hari Kalender)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-corporate-border space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-corporate-slate">
                  Waktu Terpakai s/d Minggu Ini
                </span>
                <p className="text-lg font-black text-corporate-navy">
                  {curRange.elapsedDays} Hari Kalender
                </p>
                <p className="text-[11px] text-corporate-slate">
                  Hari ke-1 s/d {curRange.elapsedDays} (
                  {((curRange.elapsedDays / totalDays) * 100).toFixed(1)}%)
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-corporate-border space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-corporate-slate">
                  Sisa Waktu Pelaksanaan
                </span>
                <p className="text-lg font-black text-corporate-navy">
                  {curRange.remainingDays} Hari Kalender
                </p>
                <p className="text-[11px] text-corporate-slate">
                  Dari total {totalDays} hari (
                  {((curRange.remainingDays / totalDays) * 100).toFixed(1)}%)
                </p>
              </div>
            </div>
          </div>

          {/* ── 6. Tabel Bobot Mingguan (1 s/d Total Minggu) ────────────────── */}
          <div className="bg-white rounded-2xl border border-corporate-border p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-corporate-border">
              <div className="flex items-center gap-2 text-corporate-navy font-bold text-sm">
                <FileSpreadsheet className="w-4 h-4 text-corporate-navy" />
                <span>6. Ringkasan Tabel Bobot Mingguan ({totalMinggu} Minggu)</span>
              </div>
              <span className="text-xs text-corporate-slate">Klik baris untuk edit</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] text-corporate-navy border-b border-corporate-border uppercase text-[10px] font-bold">
                  <tr>
                    <th className="py-2.5 px-3">Minggu</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Periode</th>
                    <th className="py-2.5 px-3 text-right">Rencana (%)</th>
                    <th className="py-2.5 px-3 text-right">Realisasi (%)</th>
                    <th className="py-2.5 px-3 text-right">Deviasi (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-corporate-border">
                  {Array.from({ length: totalMinggu }, (_, i) => i + 1).map((w) => {
                    const r = calcWeekRange(w);
                    const isSelected = w === mingguKe;
                    const isPassed = w < mingguKe;
                    const rRencana = isSelected ? rencanaPersen : isPassed ? 5.0 * w : null;
                    const rRealisasi = isSelected ? realisasiPersen : isPassed ? 5.2 * w : null;
                    const rDev =
                      rRencana !== null && rRealisasi !== null ? rRealisasi - rRencana : null;

                    return (
                      <tr
                        key={w}
                        onClick={() => setMingguKe(w)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-amber-50/70 font-semibold'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-2.5 px-3 font-bold text-corporate-navy">
                          Minggu #{w} {isSelected && '•'}
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              isSelected
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {isSelected ? statusDokumen : 'Kontrak'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-corporate-slate">
                          {r.tglMulaiSlash} - {r.tglSelesaiSlash}
                        </td>
                        <td className="py-2.5 px-3 text-right font-medium text-corporate-navy">
                          {rRencana !== null ? `${rRencana.toFixed(2)}%` : '-'}
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-corporate-navy">
                          {rRealisasi !== null ? `${rRealisasi.toFixed(2)}%` : '-'}
                        </td>
                        <td
                          className={`py-2.5 px-3 text-right font-bold ${
                            rDev !== null
                              ? rDev >= 0
                                ? 'text-emerald-600'
                                : 'text-red-600'
                              : 'text-slate-400'
                          }`}
                        >
                          {rDev !== null
                            ? `${rDev >= 0 ? '+' : ''}${rDev.toFixed(2)}%`
                            : '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Bottom Submit Bar ──────────────────────────────────────────── */}
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
              <span>Simpan Ringkasan Mingguan</span>
            </button>
          </div>
        </>
      ) : (
        /* ── Tab 2: Pratinjau Dokumen Fisik Asli (Format Resmi Cetak) ────────── */
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 flex items-center gap-3 text-xs">
            <Info className="w-5 h-5 text-blue-600 shrink-0" />
            <span>
              Pratinjau lembar cetak fisik 1:1 format dokumen resmi laporan mingguan konsultan
              supervisi.
            </span>
          </div>

          {/* Sheet Preview Card */}
          <div className="bg-white rounded-2xl border border-corporate-border p-6 sm:p-8 shadow-sm space-y-6">
            {/* Sheet Header */}
            <div className="border-b-2 border-slate-800 pb-4 text-center space-y-1">
              <p className="text-[11px] font-bold tracking-widest uppercase text-corporate-slate">
                KONSULTAN PENGAWAS & PERENCANA
              </p>
              <h2 className="text-xl font-black text-corporate-navy tracking-wide">
                CV. TATA SAKA
              </h2>
              <p className="text-xs font-semibold text-slate-700">
                LAPORAN MINGGUAN KEMAJUAN PEKERJAAN
              </p>
              <p className="text-[11px] text-corporate-slate">
                Minggu Ke-{mingguKe} ({curRange.tglMulaiIndo} s/d {curRange.tglSelesaiIndo})
              </p>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <div className="flex">
                  <span className="w-32 text-corporate-slate font-medium">Kegiatan / Ruas</span>
                  <span className="font-bold text-corporate-navy">: {pekerjaan}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-corporate-slate font-medium">Lokasi</span>
                  <span className="font-semibold text-corporate-navy">: {lokasi}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-corporate-slate font-medium">Kontraktor Pelaksana</span>
                  <span className="font-semibold text-corporate-navy">: {kontraktor}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-corporate-slate font-medium">No. SPK Kontrak</span>
                  <span className="font-semibold text-corporate-navy">: {nomorKontrak}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex">
                  <span className="w-32 text-corporate-slate font-medium">Nilai Kontrak</span>
                  <span className="font-bold text-corporate-navy">
                    : {formatRupiah(numericNilaiKontrak)}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-corporate-slate font-medium">Waktu Pelaksanaan</span>
                  <span className="font-semibold text-corporate-navy">
                    : {jangkaWaktu} Hari Kalender
                  </span>
                </div>
                <div className="flex">
                  <span className="w-32 text-corporate-slate font-medium">Tanggal SPMK</span>
                  <span className="font-semibold text-corporate-navy">: {contract.tglMulaiSpmk}</span>
                </div>
                <div className="flex">
                  <span className="w-32 text-corporate-slate font-medium">Akhir Kontrak</span>
                  <span className="font-semibold text-corporate-navy">: {akhirMasaKontrak}</span>
                </div>
              </div>
            </div>

            {/* Resume Bobot Table */}
            <div className="border border-corporate-border rounded-xl overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#F8FAFC] text-corporate-navy font-bold border-b border-corporate-border">
                  <tr>
                    <th className="py-2.5 px-3">Uraian Evaluasi Kemajuan</th>
                    <th className="py-2.5 px-3 text-right">Persentase (%)</th>
                    <th className="py-2.5 px-3 text-right">Nilai Nominal (Rp)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-corporate-border">
                  <tr>
                    <td className="py-2.5 px-3 font-medium">Rencana Fisik Kumulatif</td>
                    <td className="py-2.5 px-3 text-right font-bold text-corporate-navy">
                      {rencanaPersen.toFixed(2)}%
                    </td>
                    <td className="py-2.5 px-3 text-right font-semibold text-corporate-navy">
                      {formatRupiah(rencanaNominal)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-medium">Realisasi Fisik Lapangan</td>
                    <td className="py-2.5 px-3 text-right font-bold text-corporate-navy">
                      {realisasiPersen.toFixed(2)}%
                    </td>
                    <td className="py-2.5 px-3 text-right font-semibold text-corporate-navy">
                      {formatRupiah(realisasiNominal)}
                    </td>
                  </tr>
                  <tr
                    className={
                      isPositive ? 'bg-emerald-50/70 font-bold' : 'bg-red-50/70 font-bold'
                    }
                  >
                    <td className="py-2.5 px-3">
                      Deviasi Kemajuan ({isPositive ? 'LEBIH CEPAT' : 'TERLAMBAT'})
                    </td>
                    <td
                      className={`py-2.5 px-3 text-right ${
                        isPositive ? 'text-emerald-700' : 'text-red-700'
                      }`}
                    >
                      {isPositive ? `+${deviasiPersen.toFixed(2)}%` : `${deviasiPersen.toFixed(2)}%`}
                    </td>
                    <td
                      className={`py-2.5 px-3 text-right ${
                        isPositive ? 'text-emerald-700' : 'text-red-700'
                      }`}
                    >
                      {formatRupiah(deviasiNominal)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Signature Block */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs">
              <div className="space-y-12">
                <p className="font-semibold text-corporate-slate">Menyetujui,<br />PPK Kegiatan</p>
                <div>
                  <p className="font-bold text-corporate-navy underline">
                    {contract.kegiatans[0]?.penggunaAnggaran || 'DRAJAT UJI WAKHYONO, S.T., M.T.'}
                  </p>
                  <p className="text-[10px] text-corporate-slate">Pejabat Pembuat Komitmen</p>
                </div>
              </div>

              <div className="space-y-12">
                <p className="font-semibold text-corporate-slate">Diperiksa Oleh,<br />Konsultan Supervisi</p>
                <div>
                  <p className="font-bold text-corporate-navy underline">
                    {contract.strukturOrganisasi.siteEngineer}
                  </p>
                  <p className="text-[10px] text-corporate-slate">Site Engineer (CV. Tata Saka)</p>
                </div>
              </div>

              <div className="space-y-12">
                <p className="font-semibold text-corporate-slate">Dibuat Oleh,<br />Kontraktor Pelaksana</p>
                <div>
                  <p className="font-bold text-corporate-navy underline">
                    {kontraktor}
                  </p>
                  <p className="text-[10px] text-corporate-slate">General Superintendent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuatLaporanMingguan;
