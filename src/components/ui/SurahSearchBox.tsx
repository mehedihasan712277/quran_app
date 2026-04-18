"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { SurahName } from "@/utils/types";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type FilterType = "all" | "makkiyah" | "madaniyah";

const FILTERS: { label: string; value: FilterType }[] = [
    { label: "All", value: "all" },
    { label: "Makki", value: "makkiyah" },
    { label: "Madani", value: "madaniyah" },
];

const getBackground = (value: FilterType) => {
    if (value === "makkiyah") return "linear-gradient(135deg, #d97706, #b45309)";
    if (value === "madaniyah") return "linear-gradient(135deg, #16a34a, #15803d)";
    return "linear-gradient(135deg, var(--color-brand-start), var(--color-brand-end))";
};

const typeBadge = (type: string) => {
    const isMeccan = type.toLowerCase() === "makkiyah";
    return (
        <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-md uppercase tracking-wide ${
                isMeccan ? "bg-amber-500/10 text-amber-700" : "bg-green-500/10 text-green-700"
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
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        return surahs.filter((s) => {
            const matchesType = activeFilter === "all" || s.type.toLowerCase() === activeFilter;
            const matchesQuery = !q || s.title.toLowerCase().includes(q) || s.titleAr.includes(q) || s.index.includes(q);
            return matchesType && matchesQuery;
        });
    }, [query, surahs, activeFilter]);

    return (
        <div className="space-y-4">
            {/* Search + Filter row */}
            <div className="flex items-center gap-3">
                {/* Search input */}
                <div className="relative flex-1">
                    <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" strokeWidth={2} />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search surah by name…"
                        className="w-full rounded-xl border border-border bg-bg-soft py-2.5 pl-9 pr-9 text-sm text-text-primary placeholder:text-text-muted focus:border-brand/40 focus:bg-bg-main focus:outline-none focus:ring-1 focus:ring-brand/20"
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

                {/* Filter Buttons with Fade Effect */}
                <div className="flex items-center gap-0.5 rounded-xl border border-border bg-bg-soft p-1">
                    {FILTERS.map((f) => {
                        const isActive = activeFilter === f.value;
                        return (
                            <motion.button
                                key={f.value}
                                onClick={() => setActiveFilter(f.value)}
                                className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-150 overflow-hidden ${
                                    isActive ? "text-white" : "text-text-muted hover:text-text-primary"
                                }`}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                animate={{
                                    background: isActive ? getBackground(f.value) : "transparent",
                                }}
                                transition={{
                                    background: { duration: 0.25, ease: "easeInOut" },
                                }}
                            >
                                {/* Subtle fade overlay for active state */}
                                <motion.div
                                    className="absolute inset-0 rounded-lg"
                                    initial={false}
                                    animate={{
                                        opacity: isActive ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        background: isActive ? getBackground(f.value) : "transparent",
                                    }}
                                />

                                <span className="relative z-10">{f.label}</span>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Result count */}
            <AnimatePresence mode="wait">
                {query.trim() && (
                    <motion.p
                        key={results.length === 0 ? "none" : "found"}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.15 }}
                        className="text-xs text-brand"
                    >
                        {results.length === 0 ? (
                            <span className="text-red-400">No surahs matched</span>
                        ) : (
                            `${results.length} surah${results.length !== 1 ? "s" : ""} found`
                        )}
                    </motion.p>
                )}
            </AnimatePresence>

            {/* Surah grid */}
            <AnimatePresence mode="wait">
                {results.length > 0 ? (
                    <motion.div
                        key={`${activeFilter}-${query}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={cardClasses}
                    >
                        {results.map((surah, i) => (
                            <motion.div
                                key={surah._id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.18, delay: i * 0.025, ease: "easeOut" }}
                            >
                                <Link href={`/surah/${surah.index}`}>
                                    <div className="group relative bg-bg-main border border-border rounded-xl px-4 py-3.5 flex flex-col gap-1 cursor-pointer transition-transform duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-bg-soft hover:shadow-[0_4px_16px_oklch(40.23%_0.17_274.6/0.07)] overflow-hidden">
                                        {/* Left accent bar */}
                                        <span className="absolute left-0 top-0 bottom-0 w-0.75 rounded-l-xl bg-linear-to-b from-brand-start to-brand-end opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                                        {/* Top row */}
                                        <div className="flex items-start gap-2.5">
                                            <div className="flex-1">
                                                <div className="font-medium text-[15px] space-x-3">
                                                    <span className="text-brand">{Number(surah.index)}. </span>{" "}
                                                    <span className="text-text-primary truncate leading-tight">
                                                        Surah {highlight(surah.title, query)}
                                                    </span>
                                                </div>
                                                <p className="pl-6.5 text-2xl font-bold text-text-muted mt-0.5 text-left" dir="rtl">
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
                                                    {surah.juz.map((j, idx) => (
                                                        <span
                                                            key={idx}
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
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-2 py-10 text-center text-text-muted"
                    >
                        <Search size={28} strokeWidth={1.5} className="opacity-30" />
                        <p className="text-sm">{query.trim() ? `No surah named "${query}"` : `No ${activeFilter} surahs found`}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SurahSearchBox;
