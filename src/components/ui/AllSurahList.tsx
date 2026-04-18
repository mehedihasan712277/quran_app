import { getSurahNames } from "@/utils/fetchData";
import SurahSearchBox from "@/components/ui/SurahSearchBox";

const AllSurahList = async ({ classes = "grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-5xl mx-auto" }: { classes?: string }) => {
    const allSurahList = await getSurahNames();

    return (
        <div className="space-y-5  max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-baseline gap-3">
                <h2 className="text-xl font-medium text-text-primary">Surahs</h2>
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand/10 text-brand">{allSurahList.length} Surahs</span>
            </div>

            {/* Search + Grid */}
            <SurahSearchBox surahs={allSurahList} cardClasses={classes} />
        </div>
    );
};

export default AllSurahList;
