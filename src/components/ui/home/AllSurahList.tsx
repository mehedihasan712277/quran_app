import { getSurahNames } from "@/utils/fetchData";
import SurahSearchBox from "@/components/ui/home/SurahSearchBox";

const AllSurahList = async ({ classes = "grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-5xl mx-auto" }: { classes?: string }) => {
    const allSurahList = await getSurahNames();

    return (
        <div className="space-y-5  max-w-5xl mx-auto">
            {/* Search + Grid */}
            <SurahSearchBox surahs={allSurahList} cardClasses={classes} />
        </div>
    );
};

export default AllSurahList;
