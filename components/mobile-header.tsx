"use client"

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/lib/store/store"
import { setActiveSubject } from "@/lib/store/features/chapters/chaptersSlice"
import { cn } from "@/lib/utils"
import { Signal, Wifi, Battery } from "lucide-react"
import Image from "next/image"

const subjects = [
  {
    id: "physics",
    name: "Phy",
    icon: "⚛",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
  },
  {
    id: "chemistry",
    name: "Chem",
    icon: "⚗",
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
  },
  {
    id: "mathematics",
    name: "Math",
    icon: "∑",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
]

export function MobileHeader() {
  const dispatch = useDispatch()
  const { activeSubject } = useSelector((state: RootState) => state.chapters)

  return (
    <div className="flex flex-col bg-white">

      {/* Title */}
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

      {/* Subject Tabs */}
      <div className="flex justify-center border-b">
        <div className="flex w-full max-w-sm justify-between px-8">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              className="relative flex flex-col items-center py-3"
              onClick={() => dispatch(setActiveSubject(subject.id))}
            >
              <div
                className={cn(
                  "mb-1 flex h-10 w-10 items-center justify-center rounded-lg",
                  subject.iconBg
                )}
              >
                <span className={cn("text-xl", subject.iconColor)}>
                  {subject.icon}
                </span>
              </div>
              <span
                className={cn(
                  "text-sm",
                  activeSubject === subject.id
                    ? "font-medium text-blue-600"
                    : "text-gray-500"
                )}
              >
                {subject.name}
              </span>
              {activeSubject === subject.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 