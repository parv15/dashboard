"use client"

import { Card, CardContent } from "@/components/ui"
import { ChapterData, getTotalQuestions } from "@/lib/mock-data"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

const subjectIcons = {
  physics: "⚛",
  chemistry: "⚗",
  mathematics: "∑",
}

export function ChapterCard({ chapter }: { chapter: ChapterData }) {
  const totalQuestions = getTotalQuestions(chapter.yearWiseQuestionCount)
  const icon = subjectIcons[chapter.subject.toLowerCase() as keyof typeof subjectIcons] || "📚"
  const progressPercentage = (chapter.questionSolved / totalQuestions) * 100

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500">
              {icon}
            </div>
            <div>
              <h3 className="font-medium">{chapter.chapter}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>
                  2025: {chapter.yearWiseQuestionCount["2025"] || 0}Qs
                  {chapter.yearWiseQuestionCount["2025"] > (chapter.yearWiseQuestionCount["2024"] || 0) ? (
                    <ArrowUpIcon className="ml-1 inline-block h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownIcon className="ml-1 inline-block h-4 w-4 text-red-500" />
                  )}
                </span>
                <span className="text-gray-300">|</span>
                <span>2024: {chapter.yearWiseQuestionCount["2024"] || 0}Qs</span>
              </div>
            </div>
          </div>
          <div className="text-right text-sm text-gray-500">
            {chapter.questionSolved}/{totalQuestions} Qs
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 