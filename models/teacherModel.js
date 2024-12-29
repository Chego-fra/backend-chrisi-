module.exports = (sequelize, DataTypes) => {
  const { UUID, UUIDV4 } = DataTypes;  // Ensure that DataTypes is defined here
  
  const Teacher = sequelize.define('Teacher', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4, // Automatically generates a UUID
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true, // Optional field
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true, // Optional field
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true, // Optional field
    },
    bloodType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sex: {
      type: DataTypes.ENUM('MALE', 'FEMALE'),
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false, // Mandatory field
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
  });

  // Defining relationships
  Teacher.associate = (models) => {
    // Teacher - Subject association
    Teacher.hasMany(models.Subject, {
      foreignKey: {
        name: 'teacherId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });

    // Teacher - Lesson association
    Teacher.hasMany(models.Lesson, {
      foreignKey: {
        name: 'teacherId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });

    // Teacher - Class association
    Teacher.hasMany(models.Class, {
      foreignKey: {
        name: 'supervisorId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
  };

  return Teacher;
};
