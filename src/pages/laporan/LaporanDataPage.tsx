import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Folder, ChevronRight } from 'lucide-react';
import { sampleContractData } from '../../data/sampleContractData';

export const LaporanDataPage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const contract = sampleContractData;

  const filtered = contract.kegiatans.filter(
    (k) =>
      k.namaKegiatan.toLowerCase().includes(query.toLowerCase()) ||
      k.lokasi.toLowerCase().includes(query.toLowerCase()) ||
      k.kontraktor.toLowerCase().includes(query.toLowerCase())
  );

  const progress = Math.round(contract.progressFisik * 100);

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-corporate-slate" />
        <input
          type="text"
          placeholder="Cari Proyek atau Kegiatan..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-corporate-border rounded-xl text-sm text-corporate-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-corporate-navy/20 shadow-sm"
        />
      </div>

      {/* Contract Card */}
      <div className="bg-white rounded-2xl border border-corporate-border shadow-sm overflow-hidden">
        {/* Contract Header */}
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
              {contract.kegiatans.length} Kegiatan
            </span>
          </div>

          {/* Progress Bar */}
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

        {/* Kegiatan List */}
        <div className="divide-y divide-corporate-border">
          {filtered.length === 0 ? (
            <p className="text-sm text-corporate-slate text-center py-8">
              Tidak ada kegiatan ditemukan.
            </p>
          ) : (
            filtered.map((kegiatan, idx) => (
              <button
                key={idx}
                onClick={() => navigate(`/laporan/data/${idx}`)}
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
                <div className="flex items-center gap-1.5 shrink-0 text-xs font-semibold text-corporate-slate group-hover:text-corporate-navy transition-colors">
                  <span>Laporan</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LaporanDataPage;

