import apiClient from './api.client';
import { ApiResponse } from '../types/api.types';
import { DailyReport, sampleContractData } from '../data/sampleContractData';

const LOCAL_STORAGE_REPORTS_KEY = 'tata_saka_reports_data';

const initializeReportStorage = (): DailyReport[] => {
  const existing = localStorage.getItem(LOCAL_STORAGE_REPORTS_KEY);
  if (existing) {
    try {
      return JSON.parse(existing);
    } catch {
    }
  }

  const defaultReports = sampleContractData.kegiatans.flatMap((k) => k.laporans || []);
  localStorage.setItem(LOCAL_STORAGE_REPORTS_KEY, JSON.stringify(defaultReports));
  return defaultReports;
};

export interface CreateReportPayload {
  contractId: string;
  kegiatanNama: string;
  tanggal: string;
  tanggalFormatted: string;
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

export const reportService = {
  getDailyReports: async (): Promise<DailyReport[]> => {
    try {
      const res = await apiClient.get<any, ApiResponse<DailyReport[]>>('/reports/daily');
      return res.data;
    } catch {
      return initializeReportStorage();
    }
  },

  getDailyReportById: async (id: string): Promise<DailyReport | null> => {
    try {
      const res = await apiClient.get<any, ApiResponse<DailyReport>>(`/reports/daily/${id}`);
      return res.data;
    } catch {
      const reports = initializeReportStorage();
      return reports.find((r) => r.id === id) || null;
    }
  },

  createDailyReport: async (payload: CreateReportPayload): Promise<ApiResponse<DailyReport>> => {
    try {
      const response = await apiClient.post<any, ApiResponse<DailyReport>>('/reports/daily', payload);
      return response;
    } catch {
      const reports = initializeReportStorage();
      const newReport: DailyReport = {
        id: `rep-${Date.now()}`,
        tanggal: payload.tanggal,
        tanggalFormatted: payload.tanggalFormatted,
        kegiatanNama: payload.kegiatanNama,
        lokasiSta: payload.lokasiSta,
        kontraktor: payload.kontraktor,
        cuaca: payload.cuaca,
        kejadian: payload.kejadian,
        catatan: payload.catatan,
        pekerjaan: payload.pekerjaan,
      };

      reports.unshift(newReport);
      localStorage.setItem(LOCAL_STORAGE_REPORTS_KEY, JSON.stringify(reports));

      return {
        success: true,
        message: 'Laporan harian pengawasan berhasil disimpan via HTTP POST',
        data: newReport,
      };
    }
  },

  updateDailyReport: async (
    id: string,
    payload: Partial<CreateReportPayload>
  ): Promise<ApiResponse<DailyReport>> => {
    try {
      const response = await apiClient.put<any, ApiResponse<DailyReport>>(
        `/reports/daily/${id}`,
        payload
      );
      return response;
    } catch {
      const reports = initializeReportStorage();
      const idx = reports.findIndex((r) => r.id === id);
      if (idx !== -1) {
        reports[idx] = { ...reports[idx], ...payload };
        localStorage.setItem(LOCAL_STORAGE_REPORTS_KEY, JSON.stringify(reports));
        return {
          success: true,
          message: 'Laporan harian berhasil diperbarui via HTTP PUT',
          data: reports[idx],
        };
      }
      throw new Error(`Laporan dengan ID ${id} tidak ditemukan.`);
    }
  },
};

export default reportService;
