import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChapterData } from "@/lib/mock-data"

export interface Chapter {
  subject: string
  chapter: string
  class: string
  unit: string
  yearWiseQuestionCount: {
    [year: string]: number
  }
  questionSolved: number
  status: "Not Started" | "In Progress" | "Completed"
  isWeakChapter: boolean
}

export type SortOption = "name" | "questions" | "progress"

interface ChaptersState {
  items: ChapterData[]
  activeSubject: string
  filters: {
    classes: string[]
    units: string[]
    status: string[]
    weakChapters: boolean
  }
  sort: {
    ascending: boolean
  }
}

const initialState: ChaptersState = {
  items: [],
  activeSubject: 'physics',
  filters: {
    classes: [],
    units: [],
    status: [],
    weakChapters: false,
  },
  sort: {
    ascending: true,
  },
}

export const chaptersSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    setChapters: (state, action: PayloadAction<ChapterData[]>) => {
      state.items = action.payload
    },
    setActiveSubject: (state, action: PayloadAction<string>) => {
      state.activeSubject = action.payload
      // Reset filters when switching subjects
      state.filters = {
        classes: [],
        units: [],
        status: [],
        weakChapters: false,
      }
      // Reset sort to default
      state.sort.ascending = true
    },
    setClassFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.classes = action.payload
    },
    setUnitFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.units = action.payload
    },
    setStatusFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.status = action.payload
    },
    toggleWeakChapters: (state) => {
      state.filters.weakChapters = !state.filters.weakChapters
    },
    toggleSort: (state) => {
      state.sort.ascending = !state.sort.ascending
    },
  },
})

export const {
  setChapters,
  setActiveSubject,
  setClassFilter,
  setUnitFilter,
  setStatusFilter,
  toggleWeakChapters,
  toggleSort,
} = chaptersSlice.actions

export default chaptersSlice.reducer 