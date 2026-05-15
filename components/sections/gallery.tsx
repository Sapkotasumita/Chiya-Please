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
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-[var(--chiya-bamboo)] transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <div className="max-w-4xl max-h-[90vh] bg-[var(--chiya-warm)] rounded-xl p-4 shadow-2xl">
              <div className="relative w-full h-[60vh] md:h-[70vh] rounded-lg overflow-hidden">
                <Image
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-center text-[var(--chiya-brown)] mt-4 font-medium">
                {galleryImages[selectedImage].alt}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
