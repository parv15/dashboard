import { ChapterList } from "@/components/chapter-list"
import { Sidebar } from "@/components/sidebar"
import { MobileHeader } from "@/components/mobile-header"

export default function Home() {
  return (
    <div className="flex h-[100dvh] bg-white">
      {/* Sidebar - Hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Header and Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile Header - Only visible on mobile */}
        <div className="md:hidden">
          <MobileHeader />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <ChapterList />
        </div>
      </div>
    </div>
  )
} 