"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { SurahName } from "@/utils/types";
import Link from "next/link";

const typeBadge = (type: string) => {
    const isMeccan = type.toLowerCase() === "makkiyah";
    return (
        <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-md uppercase tracking-wide ${
                isMeccan ? "bg-brand/10 text-amber-700" : "bg-brand/10 text-green-700"
            }`}
        >
            {type}
        </span>
    );
};

const highlight = (text: string, query: string) => {
    if (!query.trim()) return <>{text}</>;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return (
        <>
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <mark
                        key={i}
                        className="rounded-sm px-0.5 text-amber-800 dark:text-amber-300"
                        style={{ background: "oklch(0.97 0.12 85 / 0.35)" }}
                    >
                        {part}
                    </mark>
                ) : (
                    part
                ),
            )}
        </>
    );
};

interface SurahSearchBoxProps {
    surahs: SurahName[];
    cardClasses?: string;
}

const SurahSearchBox = ({ surahs, cardClasses = "grid grid-cols-1 gap-2" }: SurahSearchBoxProps) => {
    const [query, setQuery] = useState("");

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return surahs;
        return surahs.filter((s) => s.title.toLowerCase().includes(q) || s.titleAr.includes(q) || s.index.includes(q));
    }, [query, surahs]);

    return (
        <div className="space-y-4">
            {/* ── Search input ── */}
            <div className="relative">
                <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" strokeWidth={2} />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search surah by name…"
                    className="w-full rounded-xl border border-border bg-bg-soft py-2.5 pl-9 pr-9 text-sm text-text-primary placeholder:text-text-muted focus:border-brand/40 focus:bg-bg-main focus:outline-none focus:ring-1 focus:ring-brand/20 transition-colors duration-150"
                />
                {query && (
                    <button
                        onClick={() => setQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-text-muted hover:text-text-primary"
                    >
                        <X size={14} strokeWidth={2} />
                    </button>
                )}
            </div>

            {/* ── Result count ── */}
            {query.trim() && (
                <p className="text-xs text-brand">
                    {results.length === 0 ? (
                        <span className="text-red-400">No surahs matched</span>
                    ) : (
                        `${results.length} surah${results.length !== 1 ? "s" : ""} found`
                    )}
                </p>
            )}

            {/* ── Surah grid ── */}
            {results.length > 0 ? (
                <div className={cardClasses}>
                    {results.map((surah) => (
                        <Link href={`/surah/${surah.index}`} key={surah._id}>
                            <div className="group relative bg-bg-main border border-border rounded-xl px-4 py-3.5 flex flex-col gap-1 cursor-pointer transition-transform duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-bg-soft hover:shadow-[0_4px_16px_oklch(40.23%_0.17_274.6/0.07)] overflow-hidden">
                                {/* Left accent bar */}
                                <span className="absolute left-0 top-0 bottom-0 w-0.75 rounded-l-xl bg-linear-to-b from-brand-start to-brand-end opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                                {/* Top row */}
                                <div className="flex items-start gap-2.5">
                                    <div className="flex-1">
                                        <div className="font-medium text-[15px] space-x-3">
                                            <span className="text-brand">{Number(surah.index)}. </span>{" "}
                                            <span className="text-text-primary truncate leading-tight">
                                                Surah {highlight(`${surah.title}`, query)}
                                            </span>
                                        </div>
                                        <p className="pl-6 text-2xl font-bold text-text-muted mt-0.5 text-left" dir="rtl">
                                            {surah.titleAr}
                                        </p>
                                    </div>
                                    {typeBadge(surah.type)}
                                </div>

                                {/* Meta row */}
                                <div className="flex items-center gap-3.5 justify-end">
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-[10px] text-text-muted uppercase tracking-widest">Verses</span>
                                        <span className="text-[13px] text-text-secondary">{surah.count}</span>
                                    </div>
                                    <div className="w-px h-7 bg-border" />
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-[10px] text-text-muted uppercase tracking-widest">Page</span>
                                        <span className="text-[13px] text-text-secondary">{surah.pages}</span>
                                    </div>
                                    <div className="w-px h-7 bg-border" />
                                    <div className="flex flex-col gap-0.5">
                                        <span className="text-[10px] text-text-muted uppercase tracking-widest">Juz</span>
                                        <div className="flex flex-wrap gap-1 mt-0.5">
                                            {surah.juz.map((j, i) => (
                                                <span
                                                    key={i}
                                                    className="text-[10px] px-1.5 py-0.5 rounded border border-border bg-bg-soft text-text-muted"
                                                >
                                                    {j.index}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                query.trim() && (
                    <div className="flex flex-col items-center gap-2 py-10 text-center text-text-muted">
                        <Search size={28} strokeWidth={1.5} className="opacity-30" />
                        <p className="text-sm">No surah named &ldquo;{query}&rdquo;</p>
                    </div>
                )
            )}
        </div>
    );
};

export default SurahSearchBox;
