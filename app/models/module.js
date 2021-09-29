module.exports = (sequelize, DataTypes) => {
    const Module = sequelize.define("module", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
      name: {
        type: DataTypes.STRING
      }
    });
  
    return Module;
  };