module.exports = (sequelize, DataTypes) => {
  const Exam = sequelize.define('Exam', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,  // Ensure the title is required
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,  // Ensures start time is required
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,  // Ensures end time is required
    },
    lessonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Lesson',  // Ensure this matches the Lessons table name
        key: 'id',
      },
    },
  });

  // Define the relationship with Lesson
  Exam.associate = (models) => {
    // Each Exam belongs to a Lesson
    Exam.belongsTo(models.Lesson, { foreignKey: 'lessonId', as: 'lesson' });

    // Optionally, if you want to include the relationship with Result (if there are results related to exams)
    Exam.hasMany(models.Result, { foreignKey: 'examId' });
    models.Result.belongsTo(Exam, { foreignKey: 'examId' });
  };

  return Exam;
};
