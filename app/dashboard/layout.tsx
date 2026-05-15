import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background texture */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(107,62,38,0.03),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(227,182,107,0.05),transparent_50%)] pointer-events-none" />
      
      <div className="relative flex">
        <DashboardSidebar />
        <div className="flex-1 md:ml-64">
          <DashboardHeader user={user} />
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
