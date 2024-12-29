module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('Assignment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,  // Ensure the title is required
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,  // Ensures start date is required
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,  // Ensures due date is required
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
  Assignment.associate = (models) => {
    // Each Assignment belongs to a Lesson
    Assignment.belongsTo(models.Lesson, { foreignKey: 'lessonId', as: 'lesson' });

    // Optionally, if you want to include the relationship with Result (if there are results related to assignments)
    Assignment.hasMany(models.Result, { foreignKey: 'assignmentId' });
    models.Result.belongsTo(Assignment, { foreignKey: 'assignmentId' });
  };

  return Assignment;
};
