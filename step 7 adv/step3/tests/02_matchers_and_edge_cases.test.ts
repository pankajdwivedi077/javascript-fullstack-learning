import { buildCourseMeta, getCoursePriceLabel } from "../src/02_matchers_and_edge_cases"

describe("getCoursePriceLabel", ()=>{

   test("returns free when price is 0", ()=>{
     const result = getCoursePriceLabel(0)
     expect(result).toBe("Free");
   })

   test("returns invalid when price is in negative", ()=>{
     const result = getCoursePriceLabel(-2)
     expect(result).toBe("Invalid Price");
   })
   
   test("returns null if the price input is null", ()=>{
     const result = getCoursePriceLabel(null)
     expect(result).toBeNull();
   })

}),

describe("buildCourseMeta", ()=>{

   test("return the full object for valid inputs", ()=>{
     const result = buildCourseMeta("Node Testing", ["Intro", "Mocks"])
     expect(result).toEqual({
        title: "Node Testing",
        lessons: ["Intro", "Mocks"],
        totalLessons: 2,
        firstLesson: "Intro",
        hasLessons: true,
        errors: []
     })
   })

    test("stores all lessons and let us check array contains with toContain", ()=>{
     const result = buildCourseMeta("Node Testing", ["Intro", "Mocks"])
     expect(result.lessons).toContain("Mocks")
   })

   test("check array size", ()=>{
     const result = buildCourseMeta("Node Testing", ["Intro", "Mocks"])
     expect(result.lessons).toHaveLength(2)
     expect(result.errors).toHaveLength(0)
   })

   test("return hasLessons as true when lessons exists", ()=>{
     const result = buildCourseMeta("Node Testing", ["Intro", "Mocks"])
     expect(result.hasLessons).toBe(true)
   })

   test("sets firstlesson as undefined when the lessons array is empty", ()=>{
     const result = buildCourseMeta("Node Testing", [])
     expect(result.firstLesson).toBeUndefined()
   })

   test("add an error and empty lessons array when lessons are null", ()=>{
     const result = buildCourseMeta("Testing", null)
     expect(result.lessons).toEqual([])
     expect(result.totalLessons).toBe(0)
     expect(result.firstLesson).toBeUndefined()
     expect(result.errors).toContain("lessons are required")
   })

   test("does not include a lesson that was never provided", ()=>{
    const result = buildCourseMeta("Unit testing", ["JEST", "RTL"])
    expect(result.lessons).not.toContain("SUPER")
   })

})