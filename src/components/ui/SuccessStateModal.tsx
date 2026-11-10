import React from 'react';
import { CheckCircle2, ArrowRight, RotateCcw, X } from 'lucide-react';
import Button from './Button';

export interface SuccessDetailItem {
  label: string;
  value: string;
}

export interface SuccessStateModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  details?: SuccessDetailItem[];
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  onClose?: () => void;
}

export const SuccessStateModal: React.FC<SuccessStateModalProps> = ({
  isOpen,
  title,
  description,
  details = [],
  primaryActionLabel = 'Lanjutkan',
  onPrimaryAction,
  secondaryActionLabel,
  onSecondaryAction,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-corporate-border transform animate-in zoom-in-95 duration-200 relative">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-corporate-slate hover:bg-slate-100 transition-colors"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-status-success flex items-center justify-center mx-auto mb-5 border-4 border-emerald-100">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-corporate-navy tracking-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-corporate-slate mt-2 leading-relaxed">
            {description}
          </p>
        </div>

        {details.length > 0 && (
          <div className="bg-corporate-slateLighter rounded-xl p-4 mb-6 border border-corporate-border divide-y divide-slate-200/60 text-xs">
            {details.map((item, idx) => (
              <div key={idx} className="flex justify-between py-2 first:pt-0 last:pb-0">
                <span className="text-corporate-slate font-medium">{item.label}</span>
                <span className="text-corporate-navy font-bold text-right truncate max-w-[60%]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          {secondaryActionLabel && onSecondaryAction && (
            <Button
              type="button"
              variant="secondary"
              size="md"
              className="flex-1"
              leftIcon={<RotateCcw className="w-4 h-4" />}
              onClick={onSecondaryAction}
            >
              {secondaryActionLabel}
            </Button>
          )}

          {primaryActionLabel && onPrimaryAction && (
            <Button
              type="button"
              variant="primary"
              size="md"
              className="flex-1"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={onPrimaryAction}
            >
              {primaryActionLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessStateModal;
