import { ChevronDown } from 'lucide-react';

export default function FAQ() {
    return (
        <main className="min-h-screen bg-corporate-softGray flex flex-col p-4 sm:p-6 md:p-8">
        <header className="mb-8 text-center mt-10">
            <h1 className="text-3xl font-bold text-corporate-navy font-sans">
            Frequently Asked Questions
        </h1>
        <p className="text-corporate-slate mt-2 text-sm sm:text-base">
            Temukan jawaban atas pertanyaan yang sering diajukan terkait sistem kami.
        </p>
        </header>

        <section className="max-w-3xl w-full mx-auto flex-grow" aria-label="Daftar Pertanyaan">
            <article className="bg-corporate-surface rounded-lg shadow-sm border border-corporate-border mb-4 p-4 transition-colors hover:bg-corporate-slateLighter">
            <details className="group">
                <summary
                    className="flex justify-between items-center font-semibold cursor-pointer list-none text-corporate-navy focus:outline-none focus:ring-2 focus:ring-corporate-navy rounded"
                aria-expanded="false"
            role="button"
            >
            <span>Bagaimana cara memperbarui pengaturan profil?</span>
                <ChevronDown
                className="w-5 h-5 text-corporate-slate transition-transform group-open:rotate-180" 
                aria-hidden="true"
                />
            </summary>
            <p className="text-corporate-slate mt-4 text-sm sm:text-base leading-relaxed">
                Anda dapat memperbarui profil dengan masuk ke halaman Settings, kemudian pilih menu Edit Profile. Pastikan untuk menekan tombol Simpan setelah mengubah data.
            </p>
        </details>
        </article>

        <article className="bg-corporate-surface rounded-lg shadow-sm border border-corporate-border mb-4 p-4 transition-colors hover:bg-corporate-slateLighter">
            <details className="group">
            <summary 
                className="flex justify-between items-center font-semibold cursor-pointer list-none text-corporate-navy focus:outline-none focus:ring-2 focus:ring-corporate-navy rounded"
                aria-expanded="false"
                role="button"
            >
                <span>Bagaimana cara melihat laporan proyek?</span>
                <ChevronDown
                className="w-5 h-5 text-corporate-slate transition-transform group-open:rotate-180" 
                aria-hidden="true"
            />
            </summary>
            <p className="text-corporate-slate mt-4 text-sm sm:text-base leading-relaxed">
                Laporan proyek dapat diakses langsung melalui menu Laporan pada panel navigasi sebelah kiri untuk melihat rekapitulasi harian dan mingguan.
            </p>
            </details>
        </article>
    </section>
    </main>
    );
}