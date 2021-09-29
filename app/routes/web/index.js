const express = require("express");
const router = express.Router();

const homeController = require("../../http/controllers/homeController");

// Middlewares
const errorHandler = require("../../http/middleware/errorHandler");

//tip:This route is for add customers.Send name , email , password in body
router.post(
  "/customers",
  homeController.addCustomers
);

//tip:This route is for add courses . Send name , teacher_name in body
router.post(
  "/courses",
  homeController.addCourses
);

//tip:this route is for add a student . Send customerId , courseId ,start_time in body
router.post(
    "/students",
    homeController.addStudents
  );


  //tip:This route is for add questions.Send stem, explanation and correct_option in body
  router.post(
    "/questions",
    homeController.addQuestions
  );

//tip:This route is for show  customers list with their students and count of them
  router.get(
    "/customers",
    homeController.getCustomers
  );
//tip:This route is for submit an answer for students.Sent studentId , questionId and option in body
  router.post(
    "/submitAnswer",
    homeController.submitAnswer
  );

  //tip:This route is for show percentages of answers and count of them . Sent studentId in params
  router.get(
    "/percentages/:studentId",
    homeController.percentages
  );

// Handle Errors
router.all("*", errorHandler.error404);
router.use(errorHandler.handler);

module.exports = router;
