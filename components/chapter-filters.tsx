"use client"

import { useDispatch, useSelector } from "react-redux"
import { useRef, useState } from "react"
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui"
import { RootState } from "@/lib/store/store"
import {
  setClassFilter,
  setUnitFilter,
  setStatusFilter,
  toggleWeakChapters,
} from "@/lib/store/features/chapters/chaptersSlice"
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function ChapterFilters() {
  const dispatch = useDispatch()
  const { items: chapters, activeSubject, filters } = useSelector((state: RootState) => state.chapters)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const uniqueClasses = Array.from(
    new Set(chapters.filter((chapter) => chapter.subject.toLowerCase() === activeSubject).map((chapter) => chapter.class))
  )

  const uniqueUnits = Array.from(
    new Set(chapters.filter((chapter) => chapter.subject.toLowerCase() === activeSubject).map((chapter) => chapter.unit))
  )

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scrollTo = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="relative">
      {/* Desktop View */}
      <div className="hidden md:flex items-center gap-3 px-4 py-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-1">
              Class
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {uniqueClasses.map((className) => (
              <DropdownMenuItem
                key={className}
                onClick={() => {
                  const newClasses = filters.classes.includes(className)
                    ? filters.classes.filter((c) => c !== className)
                    : [...filters.classes, className]
                  dispatch(setClassFilter(newClasses))
                }}
              >
                <input
                  type="checkbox"
                  checked={filters.classes.includes(className)}
                  className="mr-2"
                  readOnly
                />
                {className}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-1">
              Units
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {uniqueUnits.map((unit) => (
              <DropdownMenuItem
                key={unit}
                onClick={() => {
                  const newUnits = filters.units.includes(unit)
                    ? filters.units.filter((u) => u !== unit)
                    : [...filters.units, unit]
                  dispatch(setUnitFilter(newUnits))
                }}
              >
                <input
                  type="checkbox"
                  checked={filters.units.includes(unit)}
                  className="mr-2"
                  readOnly
                />
                {unit}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          className={cn(
            "transition-colors",
            filters.status.includes("Not Started")
              ? "border-orange-200 bg-orange-50 text-orange-900 hover:bg-orange-100"
              : "hover:bg-gray-100"
          )}
          onClick={() => {
            const newStatus = filters.status.includes("Not Started")
              ? filters.status.filter((s) => s !== "Not Started")
              : [...filters.status, "Not Started"]
            dispatch(setStatusFilter(newStatus))
          }}
        >
          Not Started
        </Button>

        <Button
          variant="outline"
          className={cn(
            "transition-colors",
            filters.weakChapters
              ? "border-orange-200 bg-orange-50 text-orange-900 hover:bg-orange-100"
              : "hover:bg-gray-100"
          )}
          onClick={() => dispatch(toggleWeakChapters())}
        >
          Weak Chapters
        </Button>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => scrollTo('left')}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent px-2 py-4"
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
          </button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => scrollTo('right')}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent px-2 py-4"
          >
            <ChevronRightIcon className="h-5 w-5 text-gray-500" />
          </button>
        )}

        {/* Mobile Filters */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="no-scrollbar flex items-center gap-2 overflow-x-auto px-4 py-2"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1 rounded-full border-dashed pl-3 pr-2 shrink-0">
                Class
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {uniqueClasses.map((className) => (
                <DropdownMenuItem
                  key={className}
                  onClick={() => {
                    const newClasses = filters.classes.includes(className)
                      ? filters.classes.filter((c) => c !== className)
                      : [...filters.classes, className]
                    dispatch(setClassFilter(newClasses))
                  }}
                >
                  <input
                    type="checkbox"
                    checked={filters.classes.includes(className)}
                    className="mr-2"
                    readOnly
                  />
                  {className}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1 rounded-full border-dashed pl-3 pr-2 shrink-0">
                Units
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {uniqueUnits.map((unit) => (
                <DropdownMenuItem
                  key={unit}
                  onClick={() => {
                    const newUnits = filters.units.includes(unit)
                      ? filters.units.filter((u) => u !== unit)
                      : [...filters.units, unit]
                    dispatch(setUnitFilter(newUnits))
                  }}
                >
                  <input
                    type="checkbox"
                    checked={filters.units.includes(unit)}
                    className="mr-2"
                    readOnly
                  />
                  {unit}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-9 shrink-0 rounded-full transition-colors",
              filters.status.includes("Not Started")
                ? "border-orange-200 bg-orange-50 text-orange-900 hover:bg-orange-100"
                : "hover:bg-gray-100"
            )}
            onClick={() => {
              const newStatus = filters.status.includes("Not Started")
                ? filters.status.filter((s) => s !== "Not Started")
                : [...filters.status, "Not Started"]
              dispatch(setStatusFilter(newStatus))
            }}
          >
            Not Started
          </Button>

          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-9 shrink-0 rounded-full transition-colors",
              filters.weakChapters
                ? "border-orange-200 bg-orange-50 text-orange-900 hover:bg-orange-100"
                : "hover:bg-gray-100"
            )}
            onClick={() => dispatch(toggleWeakChapters())}
          >
            Weak Chapters
          </Button>
        </div>
      </div>
    </div>
  )
} 