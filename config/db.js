const config = require("./index");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.databaseName, config.userName, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: {
        max: config.pool_max,
        min: config.pool_min,
        acquire: config.pool_acquire,
        idle: config.pool_idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.course = require("../app/models/course")(sequelize, Sequelize);
db.customer = require("../app/models/customer")(sequelize, Sequelize);
db.module = require("../app/models/module")(sequelize, Sequelize);
db.question = require("../app/models/question")(sequelize, Sequelize);
db.student = require("../app/models/student")(sequelize, Sequelize);
db.student_question = require("../app/models/student_question")(sequelize, Sequelize);



db.course.hasMany(db.module, {as: 'modules'});
db.customer.hasMany(db.student, {as: 'students'});
db.module.belongsTo(db.course, {
    foreignKey: "courseId",
    as: "course",
  });

db.module.hasMany(db.question, {as: 'questions'});
db.question.belongsTo(db.module, {
    foreignKey: "moduleId",
    as: "module",
  });
db.student.belongsTo(db.course, { 
foreignKey: "courseId",
as: "course" });

db.student.belongsTo(db.customer, { 
    foreignKey: "customerId",
    as: "customer" });

db.student.belongsToMany(db.question, {
  through: "student_question",
  foreignKey: 'studentId',
  as: 'questions'
});
db.question.belongsToMany(db.student, {
  through: "student_question",
  foreignKey: 'questionId',
  as: 'students'
});

db.student_question.belongsTo(db.question, {
  foreignKey: "questionId",
  as: "question",
});
db.student_question.belongsTo(db.student, { 
foreignKey: "studentId",
as: "student" });

module.exports = db;
