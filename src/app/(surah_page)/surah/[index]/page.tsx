import SurahPageClient from "@/components/ui/surah/SurahPageClient";
import { getSingleSurah, getSingleTranslation, getSurahNames } from "@/utils/fetchData";
import { Surah, Translation } from "@/utils/types";
import { Metadata } from "next";

export async function generateStaticParams() {
    const surahs = await getSurahNames();

    return surahs.map((surah) => ({
        index: surah.index.toString(),
    }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ index: string }> }): Promise<Metadata> {
    const { index } = await params;
    const surah = await getSingleSurah(index);

    return {
        title: `Surah ${surah.name} (${surah.index}) | Al Quran`,
        description: `Read Surah ${surah.name} – ${surah.count} verses`,
    };
}

const SurahPage = async ({ params }: { params: Promise<{ index: string }> }) => {
    const { index } = await params;
    const [surah, translation]: [Surah, Translation] = await Promise.all([getSingleSurah(index), getSingleTranslation(index)]);

    const verses = Object.entries(surah.verse);

    return (
        <main className="bg-bg-main">
            <div className="space-y-6">
                <div className="border border-border rounded-2xl overflow-hidden">
                    {/* ── Header Banner ── */}

                    <div className="relative text-center space-y-4">
                        <div className=" bg-hero px-8 py-8 space-y-4">
                            <span className="inline-block rounded-full border border-white/30 bg-brand/10 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm">
                                Surah {surah.index}
                            </span>
                            <h1 className="font-outfit text-2xl text-white">{surah.name}</h1>
                            <div className="flex justify-center gap-8 text-white/70 text-sm py-6">
                                <div className="flex flex-col items-center gap-0.5">
                                    <span className="text-2xl font-semibold text-white">{surah.count}</span>
                                    <span>Verses</span>
                                </div>
                                <div className="w-px bg-white/20" />
                                <div className="flex flex-col items-center gap-0.5">
                                    <span className="text-2xl font-semibold text-white">{surah.juz.length}</span>
                                    <span>{surah.juz.length === 1 ? "Juz" : "Juz sections"}</span>
                                </div>
                                <div className="w-px bg-white/20" />
                                <div className="flex flex-col items-center gap-0.5">
                                    <span className="text-2xl font-semibold text-white">{surah.juz[0]?.index ?? "—"}</span>
                                    <span>Juz number</span>
                                </div>
                            </div>

                            {/* ── Search input only ── */}
                            <section className="mx-auto">{/* rendered inside SurahPageClient below */}</section>
                        </div>
                    </div>

                    {/* ── Juz Range Bar ── */}
                    {surah.juz.length > 0 && (
                        <div className="border-t border-border px-6 py-3">
                            <div className="flex justify-center flex-wrap items-center gap-3">
                                <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">Juz Breakdown</span>
                                {surah.juz.map((j) => (
                                    <span
                                        key={j._id ?? j.index}
                                        className="rounded-full border border-border bg-bg-main px-3 py-0.5 text-xs text-text-secondary"
                                    >
                                        Juz {j.index} · {j.verse.start.replace("_", " ")} → {j.verse.end.replace("_", " ")}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Search input + Verses (client) ── */}
                <SurahPageClient verses={verses} translations={translation.verse} surahName={surah.name} />
            </div>

            {/* ── Footer ── */}
            <div className="border-t border-border py-8 text-center text-sm text-text-muted">
                End of Surah {surah.name} · {surah.count} verses
            </div>
        </main>
    );
};
export default SurahPage;
