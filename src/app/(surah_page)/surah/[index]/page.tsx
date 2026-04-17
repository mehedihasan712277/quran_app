import AyathCard from "@/components/ui/AyathCard";
import AyahSearchBox from "@/components/ui/AyahSearchBox";
import { getSingleSurah, getSingleTranslation, getSurahNames } from "@/utils/fetchData";
import { Surah, Translation } from "@/utils/types";

export async function generateStaticParams() {
    const surahNames = await getSurahNames();
    return surahNames.map((surah) => ({ index: surah.index }));
}

const SurahPage = async ({ params }: { params: Promise<{ index: string }> }) => {
    const { index } = await params;
    const [surah, translation]: [Surah, Translation] = await Promise.all([getSingleSurah(index), getSingleTranslation(index)]);

    const verses = Object.entries(surah.verse);

    return (
        <main className="bg-bg-main">
            <div>
                {/* ── Header Banner ── */}
                <div className="relative overflow-hidden bg-brand-gradient py-16 px-6">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
                            backgroundSize: "24px 24px",
                        }}
                    />
                    <div className="relative mx-auto max-w-3xl text-center">
                        <span className="mb-4 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1 text-sm font-medium text-white/80 backdrop-blur-sm">
                            Surah {surah.index}
                        </span>
                        <h1 className="font-outfit text-4xl font-bold tracking-tight text-white md:text-5xl">{surah.name}</h1>
                        <div className="mx-auto my-5 h-px w-24 bg-white/30" />
                        <div className="flex justify-center gap-8 text-white/70 text-sm">
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
                    </div>
                </div>

                {/* ── Juz Range Bar ── */}
                {surah.juz.length > 0 && (
                    <div className="border-b border-border bg-bg-soft px-6 py-3">
                        <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-3">
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

                {/* ── Search box ── */}
                <section className="py-8 px-4 max-w-3xl mx-auto">
                    <AyahSearchBox verses={verses} translations={translation.verse} surahName={surah.name} />
                </section>

                {/* ── All Verses (when not searching) ── */}
                <section className="py-4 space-y-4 px-4 max-w-3xl mx-auto">
                    {verses.map(([key, text], i) => (
                        <AyathCard
                            key={key}
                            verseNumber={i + 1}
                            surahName={surah.name}
                            verseKey={key}
                            arabicText={text}
                            translation={translation.verse[key]}
                        />
                    ))}
                </section>
            </div>

            {/* ── Footer ── */}
            <div className="border-t border-border py-8 text-center text-sm text-text-muted">
                End of Surah {surah.name} · {surah.count} verses
            </div>
        </main>
    );
};

export default SurahPage;
