"use client"

import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui"
import { RootState } from "@/lib/store/store"
import { toggleSort } from "@/lib/store/features/chapters/chaptersSlice"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

export function SortToggle() {
  const dispatch = useDispatch()
  const { sort } = useSelector((state: RootState) => state.chapters)

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center gap-1 text-sm text-muted-foreground"
      onClick={() => dispatch(toggleSort())}
    >
      <span>Sort</span>
      {sort.ascending ? (
        <ArrowUpIcon className="h-4 w-4" />
      ) : (
        <ArrowDownIcon className="h-4 w-4" />
      )}
    </Button>
  )
} 