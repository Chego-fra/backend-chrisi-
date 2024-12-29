module.exports = (sequelize, DataTypes) => {
  const { UUID, UUIDV4 } = DataTypes;  // Ensure that DataTypes is defined here
  const Parent = sequelize.define('Parent', {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4, // Automatically generates a UUID
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    address: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
  });

  return Parent;
};
