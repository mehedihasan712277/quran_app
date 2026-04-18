import AyathSlider from "./AyathSlider";

const Hero = () => {
    return (
        <section className=" border-b border-border">
            <div className=" px-4 py-0 pb-12 flex flex-col items-center text-center">
                {/* Badge */}
                <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-brand border border-brand/20 bg-brand/5 rounded-full px-4 py-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                    القرآن الكريم
                </span>

                {/* Heading */}
                <h1 className="font-outfit text-4xl sm:text-5xl font-semibold text-text-primary leading-tight tracking-tight">
                    Quran{" "}
                    <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--background-image-brand-gradient)" }}>
                        Majid
                    </span>
                </h1>

                {/* Sub-heading */}
                <p className="text-text-secondary text-base sm:text-lg font-light mb-10 max-w-md">
                    Recite, reflect, and reconnect — one ayah at a time.
                </p>

                {/* Ayah Slider card */}
                <AyathSlider />

                {/* Stats */}
                <div className="flex items-center gap-8 text-center mt-12">
                    {[
                        { value: "114", label: "Surahs" },
                        { value: "6,236", label: "Ayahs" },
                        { value: "30", label: "Juz" },
                    ].map((stat, i, arr) => (
                        <div key={stat.label} className="flex items-center gap-8">
                            <div className="flex flex-col items-center">
                                <span className="text-xl font-semibold text-text-primary font-outfit">{stat.value}</span>
                                <span className="text-xs text-text-muted tracking-wide uppercase mt-0.5">{stat.label}</span>
                            </div>
                            {i < arr.length - 1 && <div className="w-px h-8 bg-border" />}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
