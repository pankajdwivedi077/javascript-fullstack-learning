// jest.mock()

import { buildStudentSummary } from "../src/04_jest_mock"
import { getLevelLabel } from "../src/04_level_label"

// jest.fn()-> you pass a function directly as an argument
// jest.mock() -> your file imports dependency from another file

jest.mock("../src/04_level_label.ts")

// this imported function becomes a jest mock at runtime

// cast it
const mockGetLevelLable = getLevelLabel as jest.MockedFunction<typeof getLevelLabel>

describe("buildStudentSummary", ()=>{

    beforeEach(()=>{
        // reset it brfore every test so each test starts clean
        mockGetLevelLable.mockReset()
    })

    test("uses the mocked imported function and returns the mocked value", ()=>{
        // here we can decide what ur mocked funtion should return 
        // even if your actual functions is not returning the value
        mockGetLevelLable.mockReturnValue("Expert")

        const result = buildStudentSummary("sangam", 65)

        expect(mockGetLevelLable).toHaveBeenCalledTimes(1)

        expect(mockGetLevelLable).toHaveBeenLastCalledWith(65)

        expect(result).toEqual({
               studentName: "sangam",
               score: 65,
               level: "Expert",
                message: `sangam is currently at Expert level`,
        })

    })

})