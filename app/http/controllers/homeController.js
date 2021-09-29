const controller = require("../controllers/controller");
const db = require('../../../config/db');
const bcrypt = require('bcrypt');

class homeController extends controller {
  async addStudents(req, res)
  { 
    try { 
    let { customerId , courseId ,start_time } = req.body
     start_time = start_time ? 
     start_time :
      new Date()
    const newStudent = await db.student.create
    (
      { start_time , customerId , courseId}
    );
    return res.json(newStudent)
  } 
  catch(error) 
  {
    return res.json(error)
  }

  }

  async addCourses(req, res)
  { 
    try { 
    const { name , teacher_name } = req.body
    const newCourse = await db.course.create
    (
      { name , teacher_name }
    );
    return res.json(newCourse)
  } 
  catch(error) 
  {
    return res.json(error)
  }

  }

  async addQuestions(req, res)
  { 
    try { 
    let { stem , explanation, correct_option} = req.body
    const newQuestion = await db.question.create
    (
      { stem , explanation, correct_option }
    );
    return res.json(newQuestion)
  } 
  catch(error) 
  {
    return res.json(error)
  }

  }



  async addCustomers(req, res)
  { 
    try { 
    let { name , email , password } = req.body
    password = password ? 
    await bcrypt.hash(password , 10) :
     null;
    const newStudent = await db.customer.create
    (
      { password, name , email}
    );
    return res.json(newStudent)
  } 
  catch(error) 
  {
    return res.json(error)
  }

  }

  async getCustomers(req, res)
  { 
    try { 
     const customers = await db.customer.findAll
     (
       { include: ["students"] }
     )
     const customersCount = customers.length
     const result = customers.map(customer=>{
       return {
         customer,
         studentsCount:customer.students.length
       }
     },
    )
    return res.json({ result, customersCount})

  } 
  catch(error) 
  {
    return res.json(error)
  }
  }


  async submitAnswer(req, res)
  { 
    try { 
      const { studentId , questionId , option } = req.body
      const student = await db.student.findByPk(studentId);
      if(!student)
      {
        return res.json({
          message:"invalid information"
        })
      }
      await db.student_question.findOrCreate({
        where: { studentId , questionId },
        defaults: {
          studentId,questionId,option
        }
      });
      const question = await db.student_question.update
      (
        { option },
        {
          returning: true, where: {studentId , questionId} 
        }
      )
      if(!question)
      {
        const newQuestion = await db.student_question.create
        ({
           studentId , questionId , option
        });
        return res.json(newQuestion)
      }
      return res.json(question[1][0])
    } 
    catch(error) 
    {
      return res.json(error)
    }
  
  }

  async percentages(req, res)
  { 
    try { 
    const { studentId } = req.params
    const questions = await db.student_question.findAll
    (
      { where: { studentId } , include: ["question" , "student"] }
    );
    const questionsCount = questions.length
    const array = questions.filter(item => item.option === item.question.correct_option)
    const percentages = (array.length / questionsCount ) * 100
    return res.json({
      questionsCount,
      courseId:questions[0].student.courseId,
      percentages,
      questions
    })

  } 
  catch(error) 
  {
    return res.json(error)
  }
  }

}

module.exports = new homeController();
