import type { SectionInfo } from '../types'

export const SECTIONS: SectionInfo[] = [
  {
    id: 1,
    name: 'Section 1: Planning',
    shortName: 'Planning',
    weightPercent: 12,
    countInExam: 7,
  },
  {
    id: 2,
    name: 'Section 2: Architecture and Design',
    shortName: 'Architecture and Design',
    weightPercent: 15,
    countInExam: 9,
  },
  {
    id: 3,
    name: 'Section 3: Installation',
    shortName: 'Installation',
    weightPercent: 13,
    countInExam: 8,
  },
  {
    id: 4,
    name: 'Section 4: Configuration',
    shortName: 'Configuration',
    weightPercent: 16,
    countInExam: 10,
  },
  {
    id: 5,
    name: 'Section 5: System Integration',
    shortName: 'System Integration',
    weightPercent: 16,
    countInExam: 10,
  },
  {
    id: 6,
    name: 'Section 6: Advanced Customization',
    shortName: 'Advanced Customization',
    weightPercent: 18,
    countInExam: 11,
  },
  {
    id: 7,
    name: 'Section 7: Testing, Troubleshooting, and Maintenance',
    shortName: 'Testing, Troubleshooting, and Maintenance',
    weightPercent: 10,
    countInExam: 6,
  },
]

export const TOTAL_EXAM_QUESTIONS = SECTIONS.reduce((sum, s) => sum + s.countInExam, 0)

export const EXAM_DURATION_SECONDS = 90 * 60

export const PASSING_SCORE = 37

export function sectionById(id: number): SectionInfo {
  const s = SECTIONS.find((sec) => sec.id === id)
  if (!s) throw new Error(`Unknown section id ${id}`)
  return s
}
