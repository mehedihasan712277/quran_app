"use client";

import { useState, useRef, useMemo } from "react";
import { Search, X } from "lucide-react";
import { useSurahSettings } from "../shared/Surahsettingscontext";

interface AyahSearchBoxProps {
    verses: [string, string][]; // [verseKey, arabicText][]
    translations: Record<string, string>;
    surahName: string;
}

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

const AyahSearchBox = ({ verses, translations, surahName }: AyahSearchBoxProps) => {
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const { fontFamily, fontSize } = useSurahSettings();

    const arabicClass = fontFamily === "naskh" ? "font-arabic-naskh" : "font-arabic-kufi";

    const results = useMemo(() => {
        if (!query.trim()) return [];
        const q = query.toLowerCase();
        return verses.filter(([key]) => translations[key]?.toLowerCase().includes(q));
    }, [query, verses, translations]);

    const displayVerses = query.trim() ? results : [];

    return (
        <div className="space-y-4">
            {/* ── Search input ── */}
            <div className="relative">
                <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" strokeWidth={2} />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by translation…"
                    className="w-full rounded-xl border border-border bg-bg-soft py-2.5 pl-9 pr-9 text-sm text-text-primary placeholder:text-text-muted focus:border-brand/40 focus:bg-bg-main focus:outline-none focus:ring-1 focus:ring-brand/20"
                />
                {query && (
                    <button
                        onMouseDown={(e) => {
                            e.preventDefault();
                            setQuery("");
                            inputRef.current?.focus();
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-text-muted hover:text-text-primary"
                    >
                        <X size={14} strokeWidth={2} />
                    </button>
                )}
            </div>

            {/* ── Result count pill ── */}
            {query.trim() && (
                <div className="text-xs  text-green-500">
                    {results.length === 0 ? (
                        <span className="text-red-400">No verses matched</span>
                    ) : (
                        `${results.length} verse${results.length !== 1 ? "s" : ""} matched`
                    )}
                </div>
            )}

            {/* ── Verse list ── */}
            {displayVerses.length > 0 && (
                <div className="space-y-3">
                    {displayVerses.map(([key, arabicText], i) => {
                        const translation = translations[key];
                        const verseNumber = i + 1;

                        return (
                            <article
                                key={key}
                                className="rounded-2xl border border-border bg-bg-soft px-6 pt-5 pb-6 transition-shadow duration-200 hover:shadow-md"
                            >
                                {/* Badge row */}
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white shadow-sm">
                                        {verseNumber}
                                    </div>
                                    <span className="text-xs text-text-muted">
                                        {surahName} · {key.replace("_", " ")}
                                    </span>
                                </div>

                                {/* Arabic */}
                                <p
                                    dir="rtl"
                                    lang="ar"
                                    style={{ fontSize: `${fontSize}px` }}
                                    className={`text-right leading-loose tracking-wide text-text-primary ${arabicClass}`}
                                >
                                    {arabicText}
                                </p>

                                {/* Translation (always visible when search is open) */}
                                {translation && (
                                    <p className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-text-secondary">
                                        {highlight(translation, query)}
                                    </p>
                                )}
                            </article>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AyahSearchBox;
