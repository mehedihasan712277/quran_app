import AllSurahList from "@/components/ui/home/AllSurahList";
import Hero from "@/components/ui/home/Hero";

const page = () => {
    return (
        <div className="space-y-4">
            <Hero></Hero>
            <AllSurahList classes="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-5xl mx-auto px-4 xl:px-0"></AllSurahList>
        </div>
    );
};

export default page;
