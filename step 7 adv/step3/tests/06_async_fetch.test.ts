// await someAsyncFunc() -> final resolved value
// await expect(someAsyncFunc()).rejects.toThrow() -> you are expecting the promise to fail

import { fetchCourseTitle } from "../src/06_async_fetch"

describe("external api call", ()=>{

    beforeEach(()=>{
        global.fetch = jest.fn() as jest.Mock
    })

    afterEach(()=>{
        jest.clearAllMocks()
    })

    test("returns the cpurse title when the apu call successfull", async()=>{

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async ()=> ({
                id: 1,
                title: "Node js testing full course"
            })
        })
      
        const result = await fetchCourseTitle(1) 

        expect(result).toBe("Node js testing full course")

        expect(global.fetch).toHaveBeenCalledTimes(1)

        expect(global.fetch).toHaveBeenCalledWith("https://api.example.com/courses/1")

    })

    test("rejects with an error when the api returns non ok response", async()=>{

      (global.fetch as jest.Mock).mockRejectedValueOnce({
        ok: false,
        json: async ()=>({
            message: "Not found"
        })
      })

      await expect(fetchCourseTitle(20)).rejects.toThrow("Failed to fetch course")

      expect(global.fetch).toHaveBeenCalledTimes(1)

      expect(global.fetch).toHaveBeenCalledWith("https://api.example.com/courses/20")

    })

    test("rejects if any network related issue happens", async()=>{
        (global.fetch as jest.Mock).mockRejectedValueOnce(
            new Error("Network Error")
        )

        await expect(fetchCourseTitle(11)).rejects.toThrow("Network Error")

        expect(global.fetch).toHaveBeenCalledWith("https://api.example.com/courses/11")
    })

    test("rejects when the api response is successfully but in data title is missing", async()=>{

         (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok:true,
            json: async()=>({
                id:4,
            })
        
         })

        await expect(fetchCourseTitle(4)).rejects.toThrow("Course title is missing")

        expect(global.fetch).toHaveBeenCalledTimes(1)

        expect(global.fetch).toHaveBeenCalledWith("https://api.example.com/courses/4")

    })

    test("throws error immediately for an invalid courseId and does not call fetch at all", async()=>{

       await expect(fetchCourseTitle(-1)).rejects.toThrow("courseId must be greater than 0")

       expect(global.fetch).not.toHaveBeenCalled();

    })

})