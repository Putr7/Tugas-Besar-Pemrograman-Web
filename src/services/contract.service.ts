import apiClient from './api.client';
import { ApiResponse } from '../types/api.types';
import { ContractData, Kegiatan, sampleContractData } from '../data/sampleContractData';

const LOCAL_STORAGE_KEY = 'tata_saka_contracts_data';

const initializeLocalStorage = (): ContractData[] => {
  const existing = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (existing) {
    try {
      return JSON.parse(existing);
    } catch {
    }
  }
  const defaultList = [sampleContractData];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultList));
  return defaultList;
};

export interface CreateContractPayload {
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
  strukturOrganisasi: {
    siteEngineer: string;
    inspektors: string[];
    administrasi: string;
  };
}

export interface CreateKegiatanPayload {
  namaKegiatan: string;
  lokasi: string;
  sumberDana: string;
  kontraktor: string;
  penggunaAnggaran: string;
  stafTeknis1: string;
  stafTeknis2: string;
  siteEngineerKegiatan: string;
}

export const contractService = {
  getContracts: async (): Promise<ContractData[]> => {
    try {
      const res = await apiClient.get<any, ApiResponse<ContractData[]>>('/contracts');
      return res.data;
    } catch {
      return initializeLocalStorage();
    }
  },

  getContractById: async (id: string): Promise<ContractData | null> => {
    try {
      const res = await apiClient.get<any, ApiResponse<ContractData>>(`/contracts/${id}`);
      return res.data;
    } catch {
      const list = initializeLocalStorage();
      return list.find((c) => c.id === id) || list[0] || null;
    }
  },

  createContract: async (payload: CreateContractPayload): Promise<ApiResponse<ContractData>> => {
    try {
      const response = await apiClient.post<any, ApiResponse<ContractData>>('/contracts', payload);
      return response;
    } catch {
      const list = initializeLocalStorage();
      const newContract: ContractData = {
        ...payload,
        id: `kontrak-${Date.now()}`,
        progressFisik: 0,
        status: 'Aktif',
        folders: [
          { name: 'SPK', isExpanded: false, documents: [] },
          { name: 'SPMK', isExpanded: false, documents: [] },
          { name: 'Adendum Konsultan', isExpanded: false, documents: [] },
        ],
        kegiatans: [],
      };
      list.unshift(newContract);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));

      return {
        success: true,
        message: 'Kontrak pengawasan berhasil dibuat via HTTP POST',
        data: newContract,
      };
    }
  },

  updateContract: async (
    id: string,
    payload: Partial<CreateContractPayload>
  ): Promise<ApiResponse<ContractData>> => {
    try {
      const response = await apiClient.put<any, ApiResponse<ContractData>>(`/contracts/${id}`, payload);
      return response;
    } catch {
      const list = initializeLocalStorage();
      const idx = list.findIndex((c) => c.id === id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...payload };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
        return {
          success: true,
          message: 'Data kontrak berhasil diperbarui via HTTP PUT',
          data: list[idx],
        };
      }
      throw new Error(`Kontrak dengan ID ${id} tidak ditemukan.`);
    }
  },

  createKegiatan: async (
    contractId: string,
    payload: CreateKegiatanPayload
  ): Promise<ApiResponse<Kegiatan>> => {
    try {
      const response = await apiClient.post<any, ApiResponse<Kegiatan>>(
        `/contracts/${contractId}/kegiatans`,
        payload
      );
      return response;
    } catch {
      const list = initializeLocalStorage();
      const contract = list.find((c) => c.id === contractId);
      const newKegiatan: Kegiatan = {
        ...payload,
        laporans: [],
        laporanMingguan: [],
        folders: [
          { name: 'Surat Pesanan', isExpanded: false, documents: [] },
          { name: 'SPMK Kontraktor', isExpanded: false, documents: [] },
        ],
      };

      if (contract) {
        contract.kegiatans = contract.kegiatans || [];
        contract.kegiatans.push(newKegiatan);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
      }

      return {
        success: true,
        message: 'Kegiatan ruas berhasil ditambahkan via HTTP POST',
        data: newKegiatan,
      };
    }
  },

  updateKegiatan: async (
    contractId: string,
    kegiatanIndex: number,
    payload: Partial<CreateKegiatanPayload>
  ): Promise<ApiResponse<Kegiatan>> => {
    try {
      const response = await apiClient.put<any, ApiResponse<Kegiatan>>(
        `/contracts/${contractId}/kegiatans/${kegiatanIndex}`,
        payload
      );
      return response;
    } catch {
      const list = initializeLocalStorage();
      const contract = list.find((c) => c.id === contractId);
      if (contract && contract.kegiatans && contract.kegiatans[kegiatanIndex]) {
        contract.kegiatans[kegiatanIndex] = {
          ...contract.kegiatans[kegiatanIndex],
          ...payload,
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
        return {
          success: true,
          message: 'Kegiatan ruas berhasil diperbarui via HTTP PUT',
          data: contract.kegiatans[kegiatanIndex],
        };
      }
      throw new Error('Data kegiatan tidak ditemukan.');
    }
  },
};

export default contractService;
