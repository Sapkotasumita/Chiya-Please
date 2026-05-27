"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  LogOut, 
  User as UserIcon, 
  Menu,
  X,
  LayoutDashboard,
  UtensilsCrossed,
  ImageIcon,
  MessageSquare,
  Star,
  Home
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { User } from "@supabase/supabase-js"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/menu", label: "Menu", icon: UtensilsCrossed },
  { href: "/dashboard/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/testimonials", label: "Testimonials", icon: Star },
]

export function DashboardHeader({ user }: { user: User }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  return (
    <>
      <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-sm border-b border-primary/10">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Page title on mobile */}
          <div className="md:hidden flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="चिया Please!"
              width={32}
              height={32}
              className="rounded-md border border-[var(--chiya-bamboo)]/50 shadow-sm bg-[var(--chiya-warm)] object-cover w-8 h-8"
            />
          </div>

          {/* Spacer */}
          <div className="hidden md:block" />

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-primary" />
                </div>
                <span className="hidden sm:inline text-sm font-medium">
                  {user.email?.split("@")[0]}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                {user.email}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/" className="cursor-pointer">
                  <Home className="w-4 h-4 mr-2" />
                  View Website
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <nav 
            className="absolute left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-card border-r border-primary/10 p-4 space-y-1"
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/dashboard" && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
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
        </div>
      )}
    </>
  )
}
