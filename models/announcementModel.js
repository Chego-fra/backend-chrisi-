module.exports = (sequelize, DataTypes) => {
  const Announcement = sequelize.define('Announcement', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false, // Ensuring the title is a mandatory field
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false, // Ensuring the date is a mandatory field
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Optional field
      references: {
        model: 'Class', // Ensure this matches your Class table name
        key: 'id',
      },
    },
  });

  return Announcement;
};
