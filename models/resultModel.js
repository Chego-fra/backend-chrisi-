module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('Result', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    score: DataTypes.INTEGER,
    examId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Exam', // Ensure this matches your Exam table name
        key: 'id',
      },
    },
    assignmentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Assignments', // Ensure this matches your Assignment table name
        key: 'id',
      },
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Students', // Ensure this matches your Student table name
        key: 'id',
      },
    },
  });

  return Result;
};
