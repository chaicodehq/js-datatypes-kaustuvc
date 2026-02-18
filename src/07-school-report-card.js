/**
 * 📝 School Report Card Generator
 *
 * Sharma ji ke bete ka report card generate karna hai! Student ka naam aur
 * subjects ke marks milenge, tujhe pura analysis karke report card banana hai.
 *
 * Rules:
 *   - student object: { name: "Rahul", marks: { maths: 85, science: 92, ... } }
 *   - Calculate using Object.values() and array methods:
 *     - totalMarks: sum of all marks (use reduce)
 *     - percentage: (totalMarks / (numSubjects * 100)) * 100,
 *       rounded to 2 decimal places using parseFloat(val.toFixed(2))
 *     - grade based on percentage:
 *       "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 *     - highestSubject: subject name with highest marks (use Object.entries)
 *     - lowestSubject: subject name with lowest marks
 *     - passedSubjects: array of subject names where marks >= 40 (use filter)
 *     - failedSubjects: array of subject names where marks < 40
 *     - subjectCount: total number of subjects (Object.keys().length)
 *   - Hint: Use Object.keys(), Object.values(), Object.entries(),
 *     reduce(), filter(), map(), Math.max(), Math.min(), toFixed()
 *
 * Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
 *
 * @param {{ name: string, marks: Object<string, number> }} student
 * @returns {{ name: string, totalMarks: number, percentage: number, grade: string, highestSubject: string, lowestSubject: string, passedSubjects: string[], failedSubjects: string[], subjectCount: number } | null}
 *
 * @example
 *   generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } })
 *   // => { name: "Rahul", totalMarks: 255, percentage: 85, grade: "A",
 *   //      highestSubject: "science", lowestSubject: "english",
 *   //      passedSubjects: ["maths", "science", "english"], failedSubjects: [],
 *   //      subjectCount: 3 }
 *
 *   generateReportCard({ name: "Priya", marks: { maths: 35, science: 28 } })
 *   // => { name: "Priya", totalMarks: 63, percentage: 31.5, grade: "F", ... }
 */
export function generateReportCard(student) {
  if (typeof student === "object" && student !== null && typeof student.name === "string" && student.name.length > 0 && typeof student.marks === "object" && Object.keys(student.marks).length > 0) {
    for (const marks of Object.values(student.marks)) {
      if (!(typeof marks === "number" && marks >= 0 && marks <= 100))
        return null
    }
    
    const name = student.name
    const totalMarks = Object.values(student.marks).reduce((sum, curr) => sum + curr, 0)
    const subjectCount = Object.keys(student.marks).length
    const percentage = parseFloat(((totalMarks / (subjectCount * 100)) * 100).toFixed(2))
    let grade = ""
    
    if (percentage >= 90)
      grade = "A+"
    else if (percentage >= 80)
      grade = "A"
    else if (percentage >= 70)
      grade = "B"
    else if (percentage >= 60)
      grade = "C"
    else if (percentage >= 40)
      grade = "D"
    else
      grade = "F"
    
    let highestSubject = Object.keys(student.marks)[0]
    let lowestSubject = Object.keys(student.marks)[0]
    let max = 0
    let min = 100
    for (const [key, value] of Object.entries(student.marks)) {
      if (max < value) {
        max = value
        highestSubject = key
       }
      if (min > value) {
        min = value
        lowestSubject = key
       }
    }
    
    const passedSubjects = (Object.entries(student.marks).filter(([subject, marks]) => marks >= 40)).map(arr => arr[0])
    const failedSubjects = (Object.entries(student.marks).filter(([subject, marks]) => marks < 40)).map(arr => arr[0])
    
    return {name, totalMarks, percentage, grade, highestSubject, lowestSubject, passedSubjects, failedSubjects, subjectCount}
  } else
    return null
}
