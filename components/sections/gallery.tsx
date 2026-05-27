"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const galleryImages = [
  {
    src: "/images/gallery/chiya-cup.jpg",
    alt: "Freshly brewed chiya in a traditional cup",
    title: "Fresh Chiya",
  },
  {
    src: "/images/gallery/momo.jpg",
    alt: "Steaming hot momos with chutney",
    title: "Hot Mo:Mo",
  },
  {
    src: "/images/gallery/cafe-interior.jpg",
    alt: "Cozy cafe interior with warm lighting",
    title: "Our Space",
  },
  {
    src: "/images/gallery/samosa.jpg",
    alt: "Crispy samosas served fresh",
    title: "Samosa",
  },
  {
    src: "/images/gallery/friends.jpg",
    alt: "Friends enjoying tea together",
    title: "Good Times",
  },
  {
    src: "/images/gallery/spices.jpg",
    alt: "Traditional tea spices",
    title: "Our Spices",
  },
  {
    src: "/images/gallery/space.jpg",
    alt: "Place where memories are brewed",
    title: "Night View",
  },
  {
    src: "/images/gallery/interior.jpeg",
    alt: "Warm and inviting cafe interior",
    title: "Cozy Corners",
  },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-20 texture-warm">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[var(--chiya-brown)] mb-4">
            Gallery
          </h2>
          <p className="text-[var(--chiya-brown)]/70 max-w-xl mx-auto">
            A glimpse into the warmth and joy at चिया Please!
          </p>
          <div className="w-24 h-1 bg-[var(--chiya-bamboo)] mx-auto rounded-full mt-4" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className="group relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              {/* Show real image */}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover rounded-xl"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[var(--chiya-brown)]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-[var(--chiya-cream)] font-serif text-xl">
                  {image.title}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300 animate-in fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/80 hover:text-[var(--chiya-bamboo)] hover:scale-110 transition-all duration-200 z-10"
              onClick={() => setSelectedImage(null)}
              aria-label="Close gallery"
            >
              <X size={36} />
            </button>
            <div 
              className="relative w-full max-w-3xl bg-[var(--chiya-warm)] rounded-2xl p-3 md:p-4 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border border-[var(--chiya-bamboo)]/20 animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full overflow-hidden rounded-xl">
                <Image
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  width={1200}
                  height={900}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-inner bg-black/5"
                  priority
                />
              </div>
              <p className="text-center text-[var(--chiya-brown)] mt-3 md:mt-4 font-serif text-base md:text-lg italic px-4 select-none">
                {galleryImages[selectedImage].alt}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
