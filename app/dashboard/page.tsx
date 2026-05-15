import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UtensilsCrossed, ImageIcon, MessageSquare, Star } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()
  
  // Fetch counts for dashboard stats
  const [menuResult, galleryResult, messagesResult, testimonialsResult] = await Promise.all([
    supabase.from("menu_items").select("*", { count: "exact", head: true }),
    supabase.from("gallery_images").select("*", { count: "exact", head: true }),
    supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("is_read", false),
    supabase.from("testimonials").select("*", { count: "exact", head: true }).eq("is_approved", false),
  ])

  const stats = [
    { 
      title: "Menu Items", 
      value: menuResult.count ?? 0, 
      description: "Total items on menu",
      icon: UtensilsCrossed,
      href: "/dashboard/menu",
      color: "text-amber-600"
    },
    { 
      title: "Gallery Images", 
      value: galleryResult.count ?? 0, 
      description: "Photos in gallery",
      icon: ImageIcon,
      href: "/dashboard/gallery",
      color: "text-green-600"
    },
    { 
      title: "Unread Messages", 
      value: messagesResult.count ?? 0, 
      description: "Pending contact forms",
      icon: MessageSquare,
      href: "/dashboard/messages",
      color: "text-blue-600"
    },
    { 
      title: "Pending Reviews", 
      value: testimonialsResult.count ?? 0, 
      description: "Awaiting approval",
      icon: Star,
      href: "/dashboard/testimonials",
      color: "text-yellow-600"
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-primary">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back to चिया Please! admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-primary/10">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <CardDescription className="mt-1">{stat.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="border-primary/10">
        <CardHeader>
          <CardTitle className="text-lg font-serif">Quick Actions</CardTitle>
          <CardDescription>Common tasks you can perform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Link 
              href="/dashboard/menu?action=add" 
              className="flex items-center gap-3 p-4 rounded-lg border border-primary/10 hover:bg-accent transition-colors"
            >
              <UtensilsCrossed className="w-5 h-5 text-primary" />
              <span className="font-medium">Add Menu Item</span>
            </Link>
            <Link 
              href="/dashboard/gallery?action=add" 
              className="flex items-center gap-3 p-4 rounded-lg border border-primary/10 hover:bg-accent transition-colors"
            >
              <ImageIcon className="w-5 h-5 text-primary" />
              <span className="font-medium">Upload Image</span>
            </Link>
            <Link 
              href="/dashboard/messages" 
              className="flex items-center gap-3 p-4 rounded-lg border border-primary/10 hover:bg-accent transition-colors"
            >
              <MessageSquare className="w-5 h-5 text-primary" />
              <span className="font-medium">View Messages</span>
            </Link>
            <Link 
              href="/dashboard/testimonials" 
              className="flex items-center gap-3 p-4 rounded-lg border border-primary/10 hover:bg-accent transition-colors"
            >
              <Star className="w-5 h-5 text-primary" />
              <span className="font-medium">Manage Reviews</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
