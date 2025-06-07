import { ChapterList } from "@/components/chapter-list"
import { Sidebar } from "@/components/sidebar"
import { MobileHeader } from "@/components/mobile-header"

export default function Home() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar - Hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Header and Main Content */}
      <div className="flex-1">
        {/* Mobile Header - Only visible on mobile */}
        <div className="md:hidden">
          <MobileHeader />
        </div>

        {/* Main Content */}
        <div className="h-full px-4 py-4 md:px-6 md:py-6">
          <ChapterList />
        </div>
      </div>
    </div>
  )
} 