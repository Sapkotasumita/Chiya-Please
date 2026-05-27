import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/chiya-bg.jpg"
          alt="Chiya Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Logo Area */}
          <div className="relative mb-10 group">
            {/* Floating Leaves */}
            <svg
              className="absolute -left-12 -top-6 w-20 h-20 text-[var(--chiya-leaf)] opacity-40 animate-pulse rotate-[-35deg] transition-all duration-500 group-hover:rotate-[-20deg] group-hover:scale-110 drop-shadow-md"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path d="M50 5C30 20 10 50 10 70C10 90 30 95 50 95C70 95 90 90 90 70C90 50 70 20 50 5Z" />
            </svg>

            <svg
              className="absolute -right-12 -top-6 w-20 h-20 text-[var(--chiya-leaf)] opacity-40 animate-pulse rotate-[35deg] transition-all duration-500 group-hover:rotate-[20deg] group-hover:scale-110 drop-shadow-md"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <path d="M50 5C30 20 10 50 10 70C10 90 30 95 50 95C70 95 90 90 90 70C90 50 70 20 50 5Z" />
            </svg>

            {/* Logo Card Container with Rounded Bamboo Border and Premium Shadow */}
            <div className="relative flex justify-center mb-6">
              <div className="relative overflow-hidden rounded-[2.5rem] border-[6px] border-[var(--chiya-bamboo)] shadow-[0_15px_35px_rgba(107,62,38,0.3)] bg-[var(--chiya-warm)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_20px_45px_rgba(107,62,38,0.4)]">
                <Image
                  src="/images/logo.png"
                  alt="Chiya Please"
                  width={170}
                  height={170}
                  className="object-cover w-[170px] h-[170px]"
                  priority
                />
              </div>

              {/* Steam Animation */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-2.5 z-10 pointer-events-none">
                <span className="w-2.5 h-12 bg-amber-100/35 rounded-full animate-steam"></span>
                <span className="w-2.5 h-9 bg-amber-100/35 rounded-full animate-steam delay-200"></span>
                <span className="w-2.5 h-12 bg-amber-100/35 rounded-full animate-steam delay-500"></span>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-2xl md:text-3xl text-white font-serif italic mb-6">
            Time Pauses Here...
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
            A cozy place to enjoy authentic Nepali chiya, delicious snacks, and
            relaxing moments with friends.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-[var(--chiya-brown)] hover:bg-[var(--chiya-brown)]/90 text-[var(--chiya-cream)] px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <Link href="#menu">View Menu</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-[var(--chiya-brown)] px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <Link href="#contact">Visit Us</Link>
            </Button>
          </div>

          {/* Scroll Icon */}
          <div className="mt-16 animate-bounce">
            <svg
              className="w-6 h-6 text-white/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
