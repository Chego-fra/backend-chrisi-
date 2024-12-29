


module.exports= (sequelize, DataTypes) =>{


    const Admin = sequelize.define('Admin', {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          unique: true,
        },
      });

    return Admin

}