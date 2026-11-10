import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  HardHat,
  CloudSun,
  AlertCircle,
  FileText,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { sampleContractData, DailyReport } from '../../data/sampleContractData';

// [103122400022] - a. Halaman Detail Item (Dynamic Route)
export const DetailLaporan: React.FC = () => {
  const navigate = useNavigate();

  // [103122400022] - d. Parameter Routing & URL Query handling
  const { id } = useParams<{ id: string }>();

  const [report, setReport] = useState<DailyReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);

  // [103122400022] - c. Fetching Detail Data by ID
  useEffect(() => {
    setIsLoading(true);
    setIsNotFound(false);

    // Simulasi asynchronous fetch data by ID
    const timer = setTimeout(() => {
      let found: DailyReport | undefined;

      // Cari report berdasarkan ID di seluruh kegiatan kontrak
      for (const keg of sampleContractData.kegiatans) {
        const match = keg.laporans.find((r) => r.id === id);
        if (match) {
          found = match;
          break;
        }
      }

      // Fallback jika id berupa index numeric (misal: /laporan/detail/0)
      if (!found && id && !isNaN(Number(id))) {
        const idx = Number(id);
        const allReports = sampleContractData.kegiatans.flatMap((k) => k.laporans);
        if (allReports[idx]) {
          found = allReports[idx];
        }
      }

      if (found) {
        setReport(found);
      } else {
        // [103122400022] - e. Handling Error 404 pada data
        setIsNotFound(true);
      }
      setIsLoading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [id]);

  // Loading State
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-3">
        <div className="w-8 h-8 border-3 border-corporate-navy border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-corporate-slate">Memuat detail laporan...</p>
      </div>
    );
  }

  // [103122400022] - e. Handling Error 404 pada data (Not Found)
  if (isNotFound || !report) {
    return (
      <div className="max-w-md mx-auto my-12 text-center bg-white p-8 rounded-2xl border border-corporate-border shadow-sm space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-red-50 text-status-danger flex items-center justify-center mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-status-danger">
            Error 404 &bull; Data Tidak Ditemukan
          </span>
          <h2 className="text-lg font-black text-corporate-navy">Laporan Tidak Ditemukan</h2>
          <p className="text-xs text-corporate-slate leading-relaxed">
            Data laporan dengan ID <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-corporate-navy">{id}</code> tidak terdaftar pada sistem pengawasan ini.
          </p>
        </div>
        <div className="pt-2">
          <button
            onClick={() => navigate('/laporan/data')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-corporate-navy text-white text-xs font-bold rounded-xl hover:bg-corporate-slateDark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Data Laporan</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header & Breadcrumb */}
      <div className="flex items-center justify-between pb-4 border-b border-corporate-border">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/laporan/data')}
            className="p-2 rounded-xl text-corporate-slate hover:text-corporate-navy hover:bg-white border border-corporate-border transition-colors shadow-sm"
            title="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-1.5 text-xs text-corporate-slate">
              <Link to="/laporan/data" className="hover:text-corporate-navy font-medium">
                Data Laporan
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="font-bold text-corporate-navy">{report.kegiatanNama}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-corporate-navy tracking-tight mt-0.5">
              Detail Laporan Harian
            </h1>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
          ID: {report.id}
        </span>
      </div>

      {/* Info Card Pokok */}
      <div className="bg-white rounded-2xl border border-corporate-border p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-corporate-navy font-bold text-sm pb-2 border-b border-corporate-border">
          <Calendar className="w-4 h-4 text-corporate-navy" />
          <span>Informasi Pengawasan Lapangan</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-[#F8FAFC] rounded-xl border border-corporate-border space-y-1">
            <span className="text-[10px] text-corporate-slate font-semibold block uppercase">
              Hari & Tanggal
            </span>
            <span className="text-sm font-bold text-corporate-navy block">
              {report.tanggalFormatted}
            </span>
          </div>

          <div className="p-3 bg-[#F8FAFC] rounded-xl border border-corporate-border space-y-1">
            <span className="text-[10px] text-corporate-slate font-semibold block uppercase">
              Kondisi Cuaca
            </span>
            <div className="flex items-center gap-1.5 text-corporate-navy font-bold text-sm">
              <CloudSun className="w-4 h-4 text-amber-500" />
              <span>{report.cuaca}</span>
            </div>
          </div>

          <div className="p-3 bg-[#F8FAFC] rounded-xl border border-corporate-border space-y-1">
            <span className="text-[10px] text-corporate-slate font-semibold block uppercase">
              Ruas Kegiatan & Lokasi
            </span>
            <div className="flex items-center gap-1.5 text-corporate-navy font-bold">
              <MapPin className="w-3.5 h-3.5 text-corporate-slate shrink-0" />
              <span>{report.kegiatanNama} ({report.lokasiSta})</span>
            </div>
          </div>

          <div className="p-3 bg-[#F8FAFC] rounded-xl border border-corporate-border space-y-1">
            <span className="text-[10px] text-corporate-slate font-semibold block uppercase">
              Kontraktor Pelaksana
            </span>
            <div className="flex items-center gap-1.5 text-corporate-navy font-bold">
              <HardHat className="w-3.5 h-3.5 text-corporate-slate shrink-0" />
              <span>{report.kontraktor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rincian Item Pekerjaan */}
      <div className="bg-white rounded-2xl border border-corporate-border p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-corporate-border">
          <div className="flex items-center gap-2 text-corporate-navy font-bold text-sm">
            <Layers className="w-4 h-4 text-corporate-navy" />
            <span>Rincian Jenis Pekerjaan & Volume</span>
          </div>
          <span className="text-[11px] font-bold text-corporate-slate bg-corporate-slateLighter px-2 py-0.5 rounded">
            {report.pekerjaan.length} Item
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-corporate-navy uppercase text-[10px] font-bold border-b border-corporate-border">
              <tr>
                <th className="py-2.5 px-3 w-12 text-center">No</th>
                <th className="py-2.5 px-3">Uraian Pekerjaan</th>
                <th className="py-2.5 px-3">Volume Realisasi</th>
                <th className="py-2.5 px-3">Lokasi / STA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-corporate-border">
              {report.pekerjaan.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 text-center font-bold text-corporate-slate">
                    {p.no || idx + 1}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-corporate-navy">
                    {p.jenis}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-corporate-navy">
                    {p.volume}
                  </td>
                  <td className="py-2.5 px-3 text-corporate-slate">
                    {p.lokasi}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Catatan & Kejadian */}
      <div className="bg-white rounded-2xl border border-corporate-border p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-corporate-navy font-bold text-sm pb-2 border-b border-corporate-border">
          <FileText className="w-4 h-4 text-corporate-navy" />
          <span>Kejadian Lapangan & Catatan Konsultan</span>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <span className="text-[11px] font-bold text-corporate-navy block mb-1">
              Kejadian Khusus:
            </span>
            <p className="p-3 bg-[#F8FAFC] rounded-xl border border-corporate-border text-corporate-slate leading-relaxed">
              {report.kejadian || 'Pekerjaan berjalan lancar.'}
            </p>
          </div>
          <div>
            <span className="text-[11px] font-bold text-corporate-navy block mb-1">
              Catatan Pengawas (CV. Tata Saka):
            </span>
            <p className="p-3 bg-[#F8FAFC] rounded-xl border border-corporate-border text-corporate-slate leading-relaxed">
              {report.catatan || 'Sesuai dengan gambar rencana kerja teknis.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailLaporan;
