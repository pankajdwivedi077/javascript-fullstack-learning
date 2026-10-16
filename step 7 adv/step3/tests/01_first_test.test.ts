import { getCourseAccessMessage, getEnrollmentMessage } from "../src/01_first_test"

describe("getEnrollmentMessage", ()=>{
    
   test("returns 'Sold Out' when seat count is 0", ()=>{
     const result = getEnrollmentMessage(0)

     expect(result).toBe("Sold Out")
   })

   test("returns 'Only 1 seat left' when seat count is 1", ()=>{
     const result = getEnrollmentMessage(1)

     expect(result).toBe("Only 1 seat left")
   })

   test("return more than 1 seats left when seat count is greather than 1", ()=>{
     const result = getEnrollmentMessage(10)

     expect(result).toBe("10 seats left")
   })

})

describe("getCourseAccessMessage", ()=>{
  
   test("returns 'Access Granted' when user is paid", ()=>{
    const result = getCourseAccessMessage(true)
    expect(result).toBe("Access Granted")
   })

   test("returns 'Payment Required' when user is paid", ()=>{
    const result = getCourseAccessMessage(false)
    expect(result).toBe("Payment Required")
   })

})