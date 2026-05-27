"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#menu", label: "Menu" },
  { href: "#gallery", label: "Gallery" },
  { href: "#why-us", label: "Why Us" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--chiya-warm)]/95 backdrop-blur-md shadow-lg"
          : "bg-white shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="चिया Please!"
              width={40}
              height={40}
              className="rounded-md border border-[var(--chiya-bamboo)]/50 shadow-sm bg-[var(--chiya-warm)] object-cover w-10 h-10"
              priority
            />
            <span className="font-serif font-bold text-lg text-[var(--chiya-brown)] hidden sm:block">
              चिया Please!
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--chiya-brown)] hover:text-[var(--chiya-leaf)] transition-colors font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--chiya-bamboo)] transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-[var(--chiya-brown)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[var(--chiya-warm)] border-t border-[var(--chiya-bamboo)]/30 py-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[var(--chiya-brown)] hover:text-[var(--chiya-leaf)] transition-colors font-medium px-4 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
