module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define("student", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        start_time: {
        type: DataTypes.DATE
      }
    });
  
    return Student;
  };