"use client"

import { useState, useEffect } from "react"
import { Coffee, Soup, Cookie, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MenuItem } from "@/lib/types/database"

type MenuCategory = "chiya" | "coffee" | "snacks"

const categoryConfig = {
  chiya: {
    icon: Coffee,
    title: "Chiya",
  },
  coffee: {
    icon: Soup,
    title: "Coffee",
  },
  snacks: {
    icon: Cookie,
    title: "Snacks",
  },
}

export function Menu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("chiya")
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMenu() {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/menu?category=${activeCategory}`)
        if (!response.ok) {
          throw new Error("Failed to fetch menu")
        }
        const data = await response.json()
        setMenuItems(data)
      } catch (err) {
        setError("Unable to load menu. Please try again later.")
        console.error("Error fetching menu:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMenu()
  }, [activeCategory])

  return (
    <section id="menu" className="py-20 texture-bg">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[var(--chiya-brown)] mb-4">
            Our Menu
          </h2>
          <p className="text-[var(--chiya-brown)]/70 max-w-xl mx-auto">
            Explore our selection of authentic Nepali teas, coffees, and
            delicious snacks
          </p>
          <div className="w-24 h-1 bg-[var(--chiya-bamboo)] mx-auto rounded-full mt-4" />
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {(Object.keys(categoryConfig) as MenuCategory[]).map((category) => {
            const Icon = categoryConfig[category].icon
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all",
                  activeCategory === category
                    ? "bg-[var(--chiya-brown)] text-[var(--chiya-cream)] shadow-lg"
                    : "bg-[var(--chiya-warm)] text-[var(--chiya-brown)] hover:bg-[var(--chiya-bamboo)]/30"
                )}
              >
                <Icon size={20} />
                {categoryConfig[category].title}
              </button>
            )
          })}
        </div>

        {/* Menu Items */}
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 text-[var(--chiya-brown)] animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-12 text-[var(--chiya-brown)]/70">
              {error}
            </div>
          ) : menuItems.length === 0 ? (
            <div className="text-center py-12 text-[var(--chiya-brown)]/70">
              No items available in this category.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "bg-[var(--chiya-warm)] rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 border border-[var(--chiya-bamboo)]/20",
                    item.is_featured && "ring-2 ring-[var(--chiya-bamboo)]"
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-xl text-[var(--chiya-brown)]">
                        {item.name}
                      </h3>
                      {item.is_featured && (
                        <span className="text-xs bg-[var(--chiya-bamboo)] text-[var(--chiya-brown)] px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <span className="text-[var(--chiya-leaf)] font-bold text-lg">
                      Rs. {Number(item.price).toFixed(0)}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-[var(--chiya-brown)]/60 text-sm">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
