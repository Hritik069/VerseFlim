'use client';

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-36 bg-[#f5f6f8] flex items-center justify-center p-6 md:p-14 z-20 select-none"
    >
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-10 md:gap-16 items-start">
        {/* LEFT COLUMN (Subtle, low-weight metadata label) */}
        <div className="w-full md:w-[26%] flex flex-col items-start text-left">
          <span className="font-poppins text-[8px] md:text-[9px] font-bold tracking-[0.25em] text-[#6B7280] uppercase">
            01 / ABOUT
          </span>
          {/* Subtle 1px divider with extremely low opacity */}
          <div className="w-10 h-[1px] bg-black/[0.04] my-3.5" />
          <span className="font-poppins text-[8px] md:text-[9px] font-semibold tracking-[0.2em] text-[#6B7280] uppercase leading-relaxed">
            Visual Storytelling
          </span>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full md:w-[74%] text-left flex flex-col">
          {/* Main Statement Heading */}
          <h2 
            className="font-poppins text-2xl sm:text-3xl lg:text-[2.2vw] font-semibold leading-[1.12] tracking-[-0.03em] text-[#111111] antialiased"
            style={{ textRendering: 'optimizeLegibility' }}
          >
            <span className="heading-line block">Creative Product and Lifestyle Photographer</span>
            <span className="heading-line block">with 5+ years of experience working with brands</span>
            <span className="heading-line block">across different industries, including fitness,</span>
            <span className="heading-line block">activewear, and athletic events.</span>
          </h2>

          {/* Secondary Editorial Blocks */}
          <div className="max-w-[460px] flex flex-col gap-6 text-[15px] md:text-[16px] font-light leading-[1.65] tracking-wide font-poppins text-black mt-14 md:mt-18">
            <p className="body-p">
              Skilled in creating high-quality images that help businesses grow and connect with their audience.
            </p>
            <p className="body-p">
              Currently pursuing an editing course to enhance my post-production skills and expand my creative vision.
            </p>
            <p className="body-p">
              I believe photography is more than capturing moments — it’s about creating images that speak and leave a lasting impression.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


