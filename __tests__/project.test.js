const testDb = require("../config/db");
const request = require("supertest");
const app = require("../app/test_index");
afterAll(() => {
    setTimeout(() => 1000)
})

  describe("tests", () => 
  {
    test("it should pass all tests", async () => 
    {
    const newCustomer = await request(app)
    .post("/customers").send({
        name:"test",
        email:"test",
        password:"test"
    })
    expect(newCustomer.statusCode).toBe(200);
    expect(newCustomer.body.name).toBe("test");
    const customers = await request(app)
    .get("/customers")
    expect(customers.statusCode).toBe(200);
    

    const newCourse = await request(app)
    .post("/courses").send({
        name:"test",
        teacher_name:"test",
    })
    expect(newCourse.statusCode).toBe(200);
    expect(newCourse.body.name).toBe("test");

    const newStudent = await request(app)
    .post("/students").send({
        customerId:newCustomer.body.id ,
        courseId:newCourse.body.id ,
    })
    expect(newStudent.statusCode).toBe(200);

    const newQuestion = await request(app)
    .post("/questions").send({
        stem:"test" ,
        explanation:"test",
        correct_option:1
    })
    expect(newQuestion.statusCode).toBe(200);
    expect(newQuestion.body.stem).toBe("test");

    const newSubmit = await request(app)
    .post("/submitAnswer").send({
        studentId:newStudent.body.id ,
        questionId:newQuestion.body.id ,
        option:1
    })
    expect(newSubmit.statusCode).toBe(200);
    expect(newSubmit.body.option).toBe(1);


    const percentages = await request(app)
    .get(`/percentages/${newStudent.body.id}`)
    expect(percentages.statusCode).toBe(200);
    expect(percentages.body.percentages).toBe(100);
    }
    );
  }
  );
