"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ChapterFilters } from "./chapter-filters"
import { ChapterCard } from "@/components/chapter-card"
import { RootState } from "@/lib/store/store"
import { setActiveSubject, setChapters, toggleSort } from "@/lib/store/features/chapters/chaptersSlice"
import { mockChapters, getTotalQuestions } from "@/lib/mock-data"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

const subjectIcons = {
  physics: "⚛",
  chemistry: "⚗",
  mathematics: "∑",
}

const subjectColors = {
  physics: "bg-orange-100 text-orange-500",
  chemistry: "bg-green-100 text-green-500",
  mathematics: "bg-blue-100 text-blue-500",
}

export function ChapterList() {
  const dispatch = useDispatch()
  const { items: chapters, activeSubject, filters, sort } = useSelector((state: RootState) => state.chapters)

  useEffect(() => {
    dispatch(setChapters(mockChapters))
  }, [dispatch])

  const filteredChapters = chapters
    .filter((chapter) => chapter.subject.toLowerCase() === activeSubject)
    .filter((chapter) => {
      if (filters.classes.length > 0 && !filters.classes.includes(chapter.class)) return false
      if (filters.units.length > 0 && !filters.units.includes(chapter.unit)) return false
      if (filters.status.length > 0 && !filters.status.includes(chapter.status)) return false
      if (filters.weakChapters && !chapter.isWeakChapter) return false
      return true
    })
    .sort((a, b) => {
      const aProgress = (a.questionSolved / getTotalQuestions(a.yearWiseQuestionCount)) * 100
      const bProgress = (b.questionSolved / getTotalQuestions(b.yearWiseQuestionCount)) * 100
      return sort.ascending ? aProgress - bProgress : bProgress - aProgress
    })

  const totalQuestions = filteredChapters.reduce(
    (acc, chapter) => acc + getTotalQuestions(chapter.yearWiseQuestionCount),
    0
  )

  const totalPapers = filteredChapters.reduce(
    (acc, chapter) => acc + Object.keys(chapter.yearWiseQuestionCount).length,
    0
  )

  const subjectTitles = {
    physics: "Physics PYQs",
    chemistry: "Chemistry PYQs",
    mathematics: "Mathematics PYQs",
  }

  return (
    <div className="space-y-4">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <div className="flex items-center justify-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${subjectColors[activeSubject as keyof typeof subjectColors]}`}>
            <span className="text-xl">{subjectIcons[activeSubject as keyof typeof subjectIcons]}</span>
          </div>
          <h2 className="text-xl font-semibold">
            {activeSubject.charAt(0).toUpperCase() + activeSubject.slice(1)} PYQs
          </h2>
        </div>
      </div>

      {/* Mobile Header */}
      <div className=" hidden md:block">
        <p className="text-sm text-muted-foreground text-center">
          Chapter-wise Collection of {activeSubject.charAt(0).toUpperCase() + activeSubject.slice(1)} PYQs
        </p>
      </div>

      {/* Filters */}
      <ChapterFilters />

      {/* Chapter List */}
      <div className="space-y-3 px-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Showing all chapters ({filteredChapters.length})
            </p>
            <p className="text-sm text-muted-foreground">
              {totalQuestions} Questions
            </p>
          </div>
          <button 
            className="flex items-center gap-1 text-sm text-blue-600"
            onClick={() => dispatch(toggleSort())}
          >
            {sort.ascending ? (
              <ArrowUpIcon className="h-4 w-4" />
            ) : (
              <ArrowDownIcon className="h-4 w-4" />
            )}
            <span>Sort</span>
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {filteredChapters.map((chapter) => (
            <ChapterCard key={chapter.chapter} chapter={chapter} />
          ))}
        </div>
      </div>
    </div>
  )
} 