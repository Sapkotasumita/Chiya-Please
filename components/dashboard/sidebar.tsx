"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ImageIcon, 
  MessageSquare, 
  Star,
  Home
} from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/menu", label: "Menu Items", icon: UtensilsCrossed },
  { href: "/dashboard/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/testimonials", label: "Testimonials", icon: Star },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-card border-r border-primary/10 hidden md:block">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-primary/10">
          <Link href="/dashboard" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="चिया Please!"
              width={48}
              height={48}
              className="rounded-lg border-2 border-[var(--chiya-bamboo)]/50 shadow-md bg-[var(--chiya-warm)] p-0.5 object-cover w-12 h-12"
            />
            <div>
              <h1 className="font-serif text-lg text-primary font-semibold">चिया Please!</h1>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/dashboard" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-primary/10">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Home className="w-5 h-5" />
            View Website
          </Link>
        </div>
      </div>
    </aside>
  )
}
