export interface DailyReport {
  id: string;
  tanggal: string;
  tanggalFormatted: string;
  kegiatanNama: string;
  lokasiSta: string;
  kontraktor: string;
  cuaca: string;
  kejadian: string;
  catatan: string;
  pekerjaan: Array<{
    no: string;
    jenis: string;
    volume: string;
    lokasi: string;
    satuan: string;
  }>;
}

export interface WeeklyReport {
  mingguKe: number;
  periodeAwal: string;
  periodeAkhir: string;
  rencana: number;
  realisasi: number;
  kegiatanNama: string;
  kontraktor: string;
}

export interface Kegiatan {
  namaKegiatan: string;
  lokasi: string;
  sumberDana?: string;
  kontraktor: string;
  penggunaAnggaran: string;
  stafTeknis1: string;
  stafTeknis2: string;
  siteEngineerKegiatan: string;
  laporans: DailyReport[];
  laporanMingguan: WeeklyReport[];
  folders: Array<{
    name: string;
    isExpanded: boolean;
    documents: Array<{ name: string; type: string; uploadDate?: string }>;
  }>;
}

export interface ContractData {
  id: string;
  jenisKegiatan: string;
  namaKontrak: string;
  nomorSpk: string;
  tglMulaiSpk: string;
  nomorSpmk: string;
  tglMulaiSpmk: string;
  tglSelesaiSpmk: string;
  hariKalender: number;
  nilaiKontrak: string;
  instansiDinas: string[];
  sumberDana: string;
  deskripsi: string;
  progressFisik: number;
  status: 'Aktif' | 'Selesai';
  strukturOrganisasi: {
    siteEngineer: string;
    inspektors: string[];
    administrasi: string;
  };
  folders: Array<{
    name: string;
    isExpanded: boolean;
    documents: Array<{ name: string; type: string; uploadDate?: string }>;
  }>;
  kegiatans: Kegiatan[];
}

export const sampleContractData: ContractData = {
  id: 'kontrak-mt-haryono-demo',
  jenisKegiatan: 'Pengawasan Teknis',
  namaKontrak: 'PEMELIHARAAN BERKALA JL. MT HARYONO',
  nomorSpk: '000.3.3/1128/KONST/BM/X/2026',
  tglMulaiSpk: '20 Oktober 2026',
  nomorSpmk: '000.3.3/1128/KONST/BM/X/2026',
  tglMulaiSpmk: '20 Oktober 2026',
  tglSelesaiSpmk: '18 Januari 2027',
  hariKalender: 90,
  nilaiKontrak: 'Rp 2.450.000.000,00',
  instansiDinas: ['DPUPR Kab. Purbalingga'],
  sumberDana: 'APBD Kab. Purbalingga',
  deskripsi: 'Pekerjaan Pengawasan Teknis Pemeliharaan Berkala Jl. MT Haryono (3 Ruas Jalan)',
  progressFisik: 0.185,
  status: 'Aktif',
  strukturOrganisasi: {
    siteEngineer: 'SENDAYU GALIH K., ST',
    inspektors: ['MUBALLIGH, ST., M.Sc.', 'BILAL, A.Md'],
    administrasi: 'HANGGORO AJI',
  },
  folders: [
    {
      name: 'SPK',
      isExpanded: false,
      documents: [
        { name: 'Surat Perintah Kerja (SPK).pdf', type: 'PDF', uploadDate: '20 Okt 2026' },
      ],
    },
    {
      name: 'SPMK',
      isExpanded: false,
      documents: [
        { name: 'Surat Perintah Mulai Kerja (SPMK).pdf', type: 'PDF', uploadDate: '20 Okt 2026' },
      ],
    },
    {
      name: 'Adendum Konsultan',
      isExpanded: false,
      documents: [],
    },
  ],
  kegiatans: [
    {
      namaKegiatan: 'Ruas Jalan A',
      lokasi: 'STA 0+000 - STA 1+250',
      kontraktor: 'CV. SATYA WIGUNA',
      penggunaAnggaran: 'DRAJAT UJI WAKHYONO, S.T., M.T.',
      stafTeknis1: 'MUBALLIGH, ST., M.Sc.',
      stafTeknis2: 'BILAL, A.Md',
      siteEngineerKegiatan: 'SENDAYU GALIH K., ST',
      laporanMingguan: [
        {
          mingguKe: 1,
          periodeAwal: '26 Oktober 2026',
          periodeAkhir: '01 November 2026',
          rencana: 6.5,
          realisasi: 7.2,
          kegiatanNama: 'Ruas Jalan A',
          kontraktor: 'CV. SATYA WIGUNA',
        },
      ],
      laporans: [
        {
          id: 'rep-a-20261029',
          tanggal: '2026-10-29',
          tanggalFormatted: 'Kamis, 29 Oktober 2026',
          kegiatanNama: 'Ruas Jalan A',
          lokasiSta: 'STA 0+000 - STA 0+350',
          kontraktor: 'CV. SATYA WIGUNA',
          cuaca: 'Cerah Berawan',
          kejadian: 'Normal Berjalan Baik',
          catatan: 'Pekerjaan galian elevasi dasar saluran sesuai gambar rencana (shop drawing).',
          pekerjaan: [
            {
              no: '1',
              jenis: 'Galian Tanah untuk Saluran Drainase',
              volume: '42.00 m³',
              lokasi: 'STA 0+000 - STA 0+200',
              satuan: 'm3',
            },
          ],
        },
        {
          id: 'rep-a-20261030',
          tanggal: '2026-10-30',
          tanggalFormatted: 'Jumat, 30 Oktober 2026',
          kegiatanNama: 'Ruas Jalan A',
          lokasiSta: 'STA 0+000 - STA 0+250',
          kontraktor: 'CV. SATYA WIGUNA',
          cuaca: 'Cerah',
          kejadian: 'Lancar',
          catatan: 'Elevasi kemiringan aliran air dipantau waterpass, saluran mengalir lancar.',
          pekerjaan: [
            {
              no: '1',
              jenis: 'Pemasangan U-Ditch Precast DS 2 (40x40 cm)',
              volume: '25.00 m1',
              lokasi: 'STA 0+000 - STA 0+100',
              satuan: 'm1',
            },
          ],
        },
        {
          id: 'rep-a-20261031',
          tanggal: '2026-10-31',
          tanggalFormatted: 'Sabtu, 31 Oktober 2026',
          kegiatanNama: 'Ruas Jalan A',
          lokasiSta: 'STA 0+250 - STA 0+500',
          kontraktor: 'CV. SATYA WIGUNA',
          cuaca: 'Cerah',
          kejadian: 'Penyemprotan prime coat merata',
          catatan: 'Permukaan jalan telah dibersihkan kompresor sebelum disemprot aspal cair.',
          pekerjaan: [
            {
              no: '1',
              jenis: 'Lapis Resap Pengikat - Aspal Cair/Emulsi',
              volume: '85.00 liter',
              lokasi: 'STA 0+100 - STA 0+350',
              satuan: 'liter',
            },
          ],
        },
      ],
      folders: [
        { name: 'Laporan Harian', isExpanded: false, documents: [] },
        { name: 'Laporan Mingguan', isExpanded: true, documents: [] },
        { name: 'Foto Progres', isExpanded: false, documents: [] },
      ],
    },
    {
      namaKegiatan: 'Ruas Jalan B',
      lokasi: 'STA 1+250 - STA 2+500',
      kontraktor: 'CV. DIVAN INSAN CEMERLANG',
      penggunaAnggaran: 'DRAJAT UJI WAKHYONO, S.T., M.T.',
      stafTeknis1: 'MUBALLIGH, ST., M.Sc.',
      stafTeknis2: 'BILAL, A.Md',
      siteEngineerKegiatan: 'SENDAYU GALIH K., ST',
      laporanMingguan: [
        {
          mingguKe: 1,
          periodeAwal: '26 Oktober 2026',
          periodeAkhir: '01 November 2026',
          rencana: 5.8,
          realisasi: 6.1,
          kegiatanNama: 'Ruas Jalan B',
          kontraktor: 'CV. DIVAN INSAN CEMERLANG',
        },
      ],
      laporans: [
        {
          id: 'rep-b-20261030',
          tanggal: '2026-10-30',
          tanggalFormatted: 'Jumat, 30 Oktober 2026',
          kegiatanNama: 'Ruas Jalan B',
          lokasiSta: 'STA 1+250 - STA 1+600',
          kontraktor: 'CV. DIVAN INSAN CEMERLANG',
          cuaca: 'Cerah',
          kejadian: 'Lancar',
          catatan: 'Pemasangan box culvert crossing jalan terlaksana separuh badan jalan.',
          pekerjaan: [
            {
              no: '1',
              jenis: 'Gorong2 Kotak Beton Bertulang 50x50cm',
              volume: '2.40 m1',
              lokasi: 'STA 1+350 Crossing',
              satuan: 'm1',
            },
          ],
        },
      ],
      folders: [
        { name: 'Laporan Harian', isExpanded: false, documents: [] },
        { name: 'Laporan Mingguan', isExpanded: true, documents: [] },
        { name: 'Foto Progres', isExpanded: false, documents: [] },
      ],
    },
    {
      namaKegiatan: 'Ruas Jalan C',
      lokasi: 'STA 2+500 - STA 3+800',
      kontraktor: 'CV. LANGGENG',
      penggunaAnggaran: 'DRAJAT UJI WAKHYONO, S.T., M.T.',
      stafTeknis1: 'MUBALLIGH, ST., M.Sc.',
      stafTeknis2: 'BILAL, A.Md',
      siteEngineerKegiatan: 'SENDAYU GALIH K., ST',
      laporanMingguan: [
        {
          mingguKe: 1,
          periodeAwal: '26 Oktober 2026',
          periodeAkhir: '01 November 2026',
          rencana: 4.9,
          realisasi: 5.2,
          kegiatanNama: 'Ruas Jalan C',
          kontraktor: 'CV. LANGGENG',
        },
      ],
      laporans: [
        {
          id: 'rep-c-20261028',
          tanggal: '2026-10-28',
          tanggalFormatted: 'Rabu, 28 Oktober 2026',
          kegiatanNama: 'Ruas Jalan C',
          lokasiSta: 'STA 2+500 - STA 2+800',
          kontraktor: 'CV. LANGGENG',
          cuaca: 'Cerah',
          kejadian: 'Rambu K3 terpasang lengkap di kedua ujung ruas jalan',
          catatan: 'Mobilisasi alat selesai, area kerja diamankan dengan traffic cone.',
          pekerjaan: [
            {
              no: '1',
              jenis: 'Mobilisasi Alat & Penerapan SMKK (Rambu K3)',
              volume: '1.00 Ls',
              lokasi: 'STA 2+500',
              satuan: 'Ls',
            },
          ],
        },
      ],
      folders: [
        { name: 'Laporan Harian', isExpanded: false, documents: [] },
        { name: 'Laporan Mingguan', isExpanded: true, documents: [] },
        { name: 'Foto Progres', isExpanded: false, documents: [] },
      ],
    },
  ],
};

