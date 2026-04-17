import { getSingleSurah } from "@/utils/fetchData";

const SurahPage = async ({ params }: { params: Promise<{ index: string }> }) => {
    const { index } = await params;
    const surah = await getSingleSurah(index);
    return <div></div>;
};

export default SurahPage;
