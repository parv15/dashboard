"use client"

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/lib/store/store"
import { setActiveSubject } from "@/lib/store/features/chapters/chaptersSlice"
import { cn } from "@/lib/utils"
import Image from 'next/image'

export function Sidebar() {
  const dispatch = useDispatch()
  const { activeSubject } = useSelector((state: RootState) => state.chapters)

  const subjects = [
    {
      id: "physics",
      name: "Physics PYQs",
      icon: "⚛",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
      activeBg: "bg-orange-50",
    },
    {
      id: "chemistry",
      name: "Chemistry PYQs",
      icon: "⚗",
      iconBg: "bg-green-100",
      iconColor: "text-green-500",
      activeBg: "bg-green-50",
    },
    {
      id: "mathematics",
      name: "Mathematics PYQs",
      icon: "∑",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
      activeBg: "bg-blue-50",
    },
  ]

  return (
    <div className="h-screen w-64 border-r bg-white">
      <div className="flex h-14 items-center border-b px-4 justify-center">
        <div className="flex items-center gap-2">
          <div>
            <Image 
              src='/assets/jee.png' 
              alt='JEE Logo'
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="font-medium">JEE Main</span>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-4 text-sm text-muted-foreground">
          2025 - 2009 | 173 Papers | 1582
        </div>
        <div className="space-y-1">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                activeSubject === subject.id 
                  ? "bg-gray-900 text-white" 
                  : "hover:bg-gray-100"
              )}
              onClick={() => dispatch(setActiveSubject(subject.id))}
            >
              <div className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                activeSubject === subject.id 
                  ? subject.iconBg 
                  : "bg-gray-100"
              )}>
                <span className={cn(
                  "text-lg",
                  activeSubject === subject.id 
                    ? subject.iconColor
                    : "text-gray-500"
                )}>{subject.icon}</span>
              </div>
              <span>{subject.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 