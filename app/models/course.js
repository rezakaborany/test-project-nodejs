module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define("course", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
      name: {
        type: DataTypes.STRING,
        allowNull : false
      },
      teacher_name: {
        type: DataTypes.STRING,
        allowNull : false
      }
    });
  
    return Course;
  };