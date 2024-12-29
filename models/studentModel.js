


module.exports= (sequelize, DataTypes) =>{
  const { UUID, UUIDV4 } = DataTypes;  // Ensure that DataTypes is defined here

  const Student = sequelize.define('Student', {
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
    parentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Parent', // Ensure this matches your Parent table name
        key: 'id',
      },
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Class', // Ensure this matches your Class table name
        key: 'id',
      },
    },
    gradeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Grade', // Ensure this matches your Grade table name
        key: 'id',
      },
    },
  });

    return Student

}