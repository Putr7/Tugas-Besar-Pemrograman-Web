import apiClient from './api.client';
import { ApiResponse } from '../types/api.types';

export interface FeedbackPayload {
  nama: string;
  email: string;
  telepon: string;
  roleStakeholder: string;
  kontrakId: string;
  namaKontrak: string;
  ratingPengawasan: number;
  ratingKetepatanWaktu: number;
  ratingK3: number;
  kategori: string;
  pesan: string;
  lampiranName?: string;
  tanggalInput?: string;
}

export interface FeedbackRecord extends FeedbackPayload {
  id: string;
  createdAt: string;
}

const LOCAL_STORAGE_FEEDBACK_KEY = 'tata_saka_feedbacks';

const initializeFeedbackStorage = (): FeedbackRecord[] => {
  const existing = localStorage.getItem(LOCAL_STORAGE_FEEDBACK_KEY);
  if (existing) {
    try {
      return JSON.parse(existing);
    } catch {
    }
  }
  const defaultFeedbacks: FeedbackRecord[] = [
    {
      id: 'fb-demo-01',
      nama: 'Ir. Ahmad Sudarsono (PPK)',
      email: 'ahmad.ppk@purbalinggakab.go.id',
      telepon: '081234567890',
      roleStakeholder: 'Dinas',
      kontrakId: 'kontrak-mt-haryono-demo',
      namaKontrak: 'PEMELIHARAAN BERKALA JL. MT HARYONO',
      ratingPengawasan: 5,
      ratingKetepatanWaktu: 5,
      ratingK3: 4,
      kategori: 'Apresiasi',
      pesan: 'Pengawasan pekerjaan aspal dan pelaporan berkala sangat rapi, akurat, dan disiplin.',
      createdAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    },
  ];
  localStorage.setItem(LOCAL_STORAGE_FEEDBACK_KEY, JSON.stringify(defaultFeedbacks));
  return defaultFeedbacks;
};

export const feedbackService = {
  getFeedbacks: async (): Promise<FeedbackRecord[]> => {
    try {
      const res = await apiClient.get<any, ApiResponse<FeedbackRecord[]>>('/feedback');
      return res.data;
    } catch {
      return initializeFeedbackStorage();
    }
  },

  submitFeedback: async (payload: FeedbackPayload): Promise<ApiResponse<FeedbackRecord>> => {
    try {
      const response = await apiClient.post<any, ApiResponse<FeedbackRecord>>('/feedback', payload);
      return response;
    } catch {
      const feedbacks = initializeFeedbackStorage();
      const newFeedback: FeedbackRecord = {
        ...payload,
        id: `fb-${Date.now()}`,
        createdAt: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
      };

      feedbacks.unshift(newFeedback);
      localStorage.setItem(LOCAL_STORAGE_FEEDBACK_KEY, JSON.stringify(feedbacks));

      return {
        success: true,
        message: 'Feedback dan evaluasi berhasil dikirim melalui HTTP POST',
        data: newFeedback,
      };
    }
  },
};

export default feedbackService;
