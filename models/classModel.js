module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    capacity: {
      type: DataTypes.INTEGER,
    },
    supervisorId: {
      type: DataTypes.UUID,  // Changed from STRING to UUID
      allowNull: true,
      references: {
        model: 'Teachers',  // Teacher table
        key: 'id',
      },
    },
    gradeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Grades',  // Grade table
        key: 'id',
      },
    },
  });

  return Class;
};
