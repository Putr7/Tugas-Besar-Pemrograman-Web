export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const USERNAME_REGEX = /^[a-zA-Z0-9_]{4,20}$/;
export const PHONE_REGEX = /^(?:\+62|62|0)8[1-9][0-9]{7,11}$/;
export const DOCUMENT_NUMBER_REGEX = /^[0-9A-Za-z.\-\/]{5,60}$/;
export const POSITIVE_INTEGER_REGEX = /^[1-9][0-9]*$/;
export const POSITIVE_DECIMAL_REGEX = /^[0-9]+(?:\.[0-9]+)?$/;
export const RUPIAH_NUMERIC_REGEX = /^[0-9.]+$/;

export const formatRupiah = (value: string | number): string => {
  if (value === null || value === undefined || value === '') return '';
  const cleanNumber = value.toString().replace(/[^0-9]/g, '');
  if (!cleanNumber) return '';

  const parsed = parseInt(cleanNumber, 10);
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(parsed);
};

export const parseRupiahToNumber = (rupiahStr: string): number => {
  if (!rupiahStr) return 0;
  const clean = rupiahStr.replace(/[^0-9]/g, '');
  return parseInt(clean, 10) || 0;
};

export const validateRequired = (val: any, fieldLabel: string = 'Field'): string | null => {
  if (val === null || val === undefined || (typeof val === 'string' && val.trim() === '')) {
    return `${fieldLabel} wajib diisi.`;
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  if (!email || email.trim() === '') return 'Email wajib diisi.';
  if (!EMAIL_REGEX.test(email.trim())) {
    return 'Format email tidak valid (contoh: user@tatasaka.co.id).';
  }
  return null;
};

export const validateUsername = (username: string): string | null => {
  if (!username || username.trim() === '') return 'Username wajib diisi.';
  if (username.length < 4) return 'Username minimal 4 karakter.';
  if (username.length > 20) return 'Username maksimal 20 karakter.';
  if (!USERNAME_REGEX.test(username)) {
    return 'Username hanya boleh berisi huruf, angka, dan underscore (_).';
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return 'Kata sandi wajib diisi.';
  if (password.length < 6) return 'Kata sandi minimal 6 karakter.';
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone || phone.trim() === '') return 'Nomor telepon wajib diisi.';
  if (!PHONE_REGEX.test(phone.trim())) {
    return 'Nomor HP tidak valid. Gunakan format Indonesia (contoh: 081234567890).';
  }
  return null;
};

export const validatePositiveInteger = (val: string | number, fieldLabel: string = 'Nilai'): string | null => {
  const strVal = val.toString().trim();
  if (!strVal) return `${fieldLabel} wajib diisi.`;
  if (!POSITIVE_INTEGER_REGEX.test(strVal)) {
    return `${fieldLabel} harus berupa bilangan bulat positif lebih besar dari 0.`;
  }
  return null;
};

export const validateDocumentNumber = (docNo: string, docLabel: string = 'Nomor Dokumen'): string | null => {
  if (!docNo || docNo.trim() === '') return `${docLabel} wajib diisi.`;
  if (!DOCUMENT_NUMBER_REGEX.test(docNo.trim())) {
    return `${docLabel} mengandung karakter yang tidak valid (minimal 5 karakter).`;
  }
  return null;
};

export const validateDateRange = (startDateStr: string, endDateStr: string): string | null => {
  if (!startDateStr || !endDateStr) return null;
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  if (end < start) {
    return 'Tanggal selesai tidak boleh lebih awal dari tanggal mulai.';
  }
  return null;
};
