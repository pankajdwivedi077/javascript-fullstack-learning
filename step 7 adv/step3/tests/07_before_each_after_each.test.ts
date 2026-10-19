import { addLesson, clearLessons, getLessonCount, getLessons } from "../src/07_before_each_after_each"

// test 1 adds data
// test 2 runs later
// test 2 still see the old data from test 1

// test pollution

// ensure every test start clean
// one test should not change another test result

// beforeEach -> before every test
// afterEach -> after every test

describe("before each and after each concept", ()=>{

    beforeEach(()=>{
        clearLessons()
    })

    afterEach(()=>{
        clearLessons()
    })

    test("starts with an empty lesson list in array in every fresh start", ()=>{

         expect(getLessons()).toEqual([])

         expect(getLessonCount()).toBe(0)
    })

    test("add one lesson and increase the count", ()=>{

        addLesson("react")

        expect(getLessons()).toEqual(["react"])

        expect(getLessonCount()).toBe(1)

    })

    test("add multiple lesson", ()=>{

        addLesson("react")
        addLesson("html")
        addLesson("css")

        expect(getLessons()).toEqual(["react", "html", "css"])

        expect(getLessonCount()).toBe(3)

    })

})