import { getSurahNames } from "@/utils/fetchData";
import { SurahName } from "@/utils/types";
import Link from "next/link";

const typeBadge = (type: string) => {
    const isMeccan = type.toLowerCase() === "makkiyah";
    return (
        <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-md uppercase tracking-wide ${
                isMeccan ? "bg-brand/10 text-amber-700" : "bg-brand/10 text-green-500"
            }`}
        >
            {type}
        </span>
    );
};

const SurahCard = ({ surah }: { surah: SurahName }) => (
    <div className="group relative bg-bg-main border border-border rounded-xl px-4 py-3.5 flex flex-col gap-2.5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-bg-soft hover:shadow-[0_4px_16px_oklch(40.23%_0.17_274.6/0.07)] overflow-hidden">
        {/* Left accent bar */}
        <span className="absolute left-0 top-0 bottom-0 w-0.75 rounded-l-xl bg-linear-to-b from-brand-start to-brand-end opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        {/* Top row: index, title, type */}
        <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-brand-start to-brand-end flex items-center justify-center text-[11px] font-medium text-white shrink-0">
                {Number(surah.index)}
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-medium text-[15px] text-text-primary truncate  leading-tight">Surah {surah.title}</p>
                <p className="text-[13px] text-text-muted mt-0.5 text-left" dir="rtl">
                    {surah.titleAr}
                </p>
            </div>
            {typeBadge(surah.type)}
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3.5">
            <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-text-muted uppercase tracking-widest">Verses</span>
                <span className="text-[13px] text-text-secondary">{surah.count}</span>
            </div>
            <div className="w-px h-7 bg-border" />
            <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-text-muted uppercase tracking-widest">Pages</span>
                <span className="text-[13px] text-text-secondary">{surah.pages}</span>
            </div>
            <div className="w-px h-7 bg-border" />
            <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-text-muted uppercase tracking-widest">Juz</span>
                <div className="flex flex-wrap gap-1 mt-0.5">
                    {surah.juz.map((j, i) => (
                        <span key={i} className="text-[10px] px-1.5 py-0.5 rounded border border-border bg-bg-soft text-text-muted">
                            {j.index}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const AllSurahList = async () => {
    const allSurahList = await getSurahNames();

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-baseline gap-3">
                <h2 className="text-xl font-medium text-text-primary ">Surahs</h2>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand/10 text-brand">{allSurahList.length} Surahs</span>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {allSurahList.map((surah) => (
                    <Link href={`/surah/${surah.index}`} key={surah._id}>
                        <SurahCard surah={surah} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AllSurahList;
