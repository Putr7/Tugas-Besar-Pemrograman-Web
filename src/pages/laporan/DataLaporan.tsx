import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Folder, ChevronRight, FileText, RotateCcw, AlertCircle } from 'lucide-react';
import { sampleContractData } from '../../data/sampleContractData';

export const DataLaporan: React.FC = () => {
  const navigate = useNavigate();

  // [103122400022] - d. Parameter Routing & URL Query handling
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const kategori = searchParams.get('kategori') || 'semua';

  const contract = sampleContractData;
  const progress = Math.round(contract.progressFisik * 100);

  // [103122400022] - d. Parameter Routing & URL Query handling
  const handleSearchChange = (val: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      nextParams.set('q', val);
    } else {
      nextParams.delete('q');
    }
    setSearchParams(nextParams, { replace: true });
  };

  const handleKategoriChange = (newKat: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (newKat !== 'semua') {
      nextParams.set('kategori', newKat);
    } else {
      nextParams.delete('kategori');
    }
    setSearchParams(nextParams, { replace: true });
  };

  const handleResetFilter = () => {
    setSearchParams({});
  };

  // [103122400022] - b. Halaman Search / Filter Results
  const allDailyReports = contract.kegiatans.flatMap((k) =>
    k.laporans.map((r) => ({ ...r, kegiatanLokasi: k.lokasi, kontraktorNama: k.kontraktor }))
  );

  const filteredKegiatans = contract.kegiatans.filter(
    (k) =>
      k.namaKegiatan.toLowerCase().includes(query.toLowerCase()) ||
      k.lokasi.toLowerCase().includes(query.toLowerCase()) ||
      k.kontraktor.toLowerCase().includes(query.toLowerCase())
  );

  const filteredReports = allDailyReports.filter(
    (r) =>
      r.kegiatanNama.toLowerCase().includes(query.toLowerCase()) ||
      r.tanggalFormatted.toLowerCase().includes(query.toLowerCase()) ||
      r.kontraktorNama.toLowerCase().includes(query.toLowerCase()) ||
      r.pekerjaan.some((p) => p.jenis.toLowerCase().includes(query.toLowerCase()))
  );

  const totalResults =
    kategori === 'ruas'
      ? filteredKegiatans.length
      : kategori === 'harian'
      ? filteredReports.length
      : filteredKegiatans.length + filteredReports.length;

  return (
    <div className="space-y-4">
      {/* [103122400022] - b. Halaman Search / Filter Results */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-corporate-slate" />
          <input
            type="text"
            placeholder="Cari proyek, kegiatan, tanggal, atau jenis pekerjaan..."
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-corporate-border rounded-xl text-sm text-corporate-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-corporate-navy/20 shadow-sm"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-white border border-corporate-border rounded-xl p-1 shadow-sm shrink-0">
          {[
            { id: 'semua', label: 'Semua' },
            { id: 'ruas', label: 'Ruas Proyek' },
            { id: 'harian', label: 'Laporan Harian' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleKategoriChange(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                kategori === tab.id
                  ? 'bg-corporate-navy text-white shadow-sm'
                  : 'text-corporate-slate hover:text-corporate-navy'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Result Status Bar */}
      {(query || kategori !== 'semua') && (
        <div className="flex items-center justify-between text-xs text-corporate-slate px-1">
          <span>
            Hasil filter untuk: {query ? <strong className="text-corporate-navy">"{query}"</strong> : 'Semua pencarian'} &bull; Ditemukan <strong className="text-corporate-navy">{totalResults} data</strong>
          </span>
          <button
            onClick={handleResetFilter}
            className="flex items-center gap-1 text-status-danger hover:underline font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filter</span>
          </button>
        </div>
      )}

      {/* [103122400022] - e. Handling Empty State */}
      {totalResults === 0 ? (
        <div className="bg-white rounded-2xl border border-corporate-border p-10 text-center shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-corporate-slateLighter text-corporate-slate flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-corporate-navy">Tidak Ada Data Ditemukan</h3>
            <p className="text-xs text-corporate-slate mt-1 max-w-sm mx-auto">
              Tidak ada proyek atau laporan yang cocok dengan kata kunci{' '}
              <strong className="text-corporate-navy">"{query}"</strong> pada kategori ini.
            </p>
          </div>
          <button
            onClick={handleResetFilter}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-corporate-slateLighter hover:bg-slate-200 text-corporate-navy text-xs font-bold rounded-xl transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Tampilkan Semua Data</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Section 1: Daftar Ruas Proyek (jika kategori 'semua' atau 'ruas') */}
          {(kategori === 'semua' || kategori === 'ruas') && filteredKegiatans.length > 0 && (
            <div className="bg-white rounded-2xl border border-corporate-border shadow-sm overflow-hidden">
              <div className="p-5 border-b border-corporate-border">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-sm font-extrabold text-corporate-navy leading-snug">
                      {contract.namaKontrak}
                    </h2>
                    <p className="text-xs text-corporate-slate mt-0.5">
                      SPK: {contract.nomorSpk}
                    </p>
                  </div>
                  <span className="shrink-0 px-2.5 py-1 rounded-lg bg-corporate-slateLighter border border-corporate-border text-[11px] font-bold text-corporate-navy whitespace-nowrap">
                    {filteredKegiatans.length} Ruas Kegiatan
                  </span>
                </div>

                <div className="mt-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-status-success inline-block" />
                      <span className="text-[11px] font-bold text-status-success">Progres</span>
                    </div>
                    <span className="text-xs font-bold text-corporate-navy">{progress}%</span>
                  </div>
                  <div className="h-2 bg-corporate-slateLighter rounded-full overflow-hidden">
                    <div
                      className="h-full bg-corporate-navy rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="divide-y divide-corporate-border">
                {filteredKegiatans.map((kegiatan, idx) => {
                  const firstRepId = kegiatan.laporans[0]?.id || idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => navigate(`/laporan/detail/${firstRepId}`)}
                      className="w-full flex items-center gap-4 px-5 py-4 hover:bg-corporate-softGray transition-colors text-left group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-corporate-slateLighter flex items-center justify-center shrink-0 text-corporate-navy">
                        <Folder className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-corporate-navy truncate">
                          {kegiatan.namaKegiatan}
                        </p>
                        <p className="text-xs text-corporate-slate mt-0.5 truncate">
                          Lokasi: {kegiatan.lokasi} &bull; {kegiatan.kontraktor}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 text-xs font-semibold text-corporate-slate group-hover:text-corporate-navy transition-colors">
                        <span>Lihat Detail</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 2: Daftar Arsip Laporan Harian (jika kategori 'semua' atau 'harian') */}
          {(kategori === 'semua' || kategori === 'harian') && filteredReports.length > 0 && (
            <div className="bg-white rounded-2xl border border-corporate-border shadow-sm overflow-hidden">
              <div className="p-4 border-b border-corporate-border bg-slate-50/60 flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-corporate-navy">
                  Arsip Laporan Harian Pengawasan ({filteredReports.length})
                </span>
                <span className="text-[11px] text-corporate-slate">Klik untuk buka detail</span>
              </div>
              <div className="divide-y divide-corporate-border">
                {filteredReports.map((rep) => (
                  <button
                    key={rep.id}
                    onClick={() => navigate(`/laporan/detail/${rep.id}`)}
                    className="w-full flex items-center gap-4 px-5 py-3.5 hover:bg-corporate-softGray transition-colors text-left group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-corporate-navy truncate">
                          {rep.tanggalFormatted} &bull; {rep.kegiatanNama}
                        </p>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-600">
                          {rep.cuaca}
                        </span>
                      </div>
                      <p className="text-[11px] text-corporate-slate mt-0.5 truncate">
                        {rep.pekerjaan.map((p) => `${p.jenis} (${p.volume})`).join(', ')}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 text-xs font-semibold text-corporate-slate group-hover:text-corporate-navy transition-colors">
                      <span>Detail</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DataLaporan;
