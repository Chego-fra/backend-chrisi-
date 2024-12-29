module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define('Lesson', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    day: {
      type: DataTypes.ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'),
    },
    startTime: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
    endTime: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Subject',
        key: 'id',
      },
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Class',
        key: 'id',
      },
    },
    teacherId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Teacher',
        key: 'id',
      },
    },
  });

  Lesson.associate = (models) => {
    // Lesson - Subject
    Lesson.belongsTo(models.Subject, { foreignKey: 'subjectId', as: 'subject' });

    // Lesson - Class
    Lesson.belongsTo(models.Class, { foreignKey: 'classId', as: 'class' });

    // Lesson - Teacher
    Lesson.belongsTo(models.Teacher, { foreignKey: 'teacherId', as: 'teacher' });

    // Lesson - Exam
    Lesson.hasMany(models.Exam, { foreignKey: 'lessonId' });
    models.Exam.belongsTo(Lesson, { foreignKey: 'lessonId' });

    // Lesson - Assignment
    Lesson.hasMany(models.Assignment, { foreignKey: 'lessonId' });
    models.Assignment.belongsTo(Lesson, { foreignKey: 'lessonId' });

    // Lesson - Attendance
    Lesson.hasMany(models.Attendance, { foreignKey: 'lessonId' });
    models.Attendance.belongsTo(Lesson, { foreignKey: 'lessonId' });
  };

  return Lesson;
};
