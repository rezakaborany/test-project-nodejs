module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define("question", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        stem: {
        type: DataTypes.STRING
      },
      correct_option: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          max:4,
          min:1
        }
      },
      explanation: {
        type: DataTypes.STRING,
        allowNull: false
    }
    });
  
    return Question;
  };