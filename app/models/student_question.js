const db = require("../../config/db");

module.exports = (sequelize, DataTypes) => {
    const Student_Question = sequelize.define("student_question", {
          option:{
            type:DataTypes.INTEGER,
            validate: {
              max:4,
              min:1
            }
          },
    });
  
    return Student_Question;
  };