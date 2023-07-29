const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('User', {
      id:{
         type: DataTypes.UUID,
         primaryKey : true,
         allowNull: false,
         defaultValue: DataTypes.UUIDV4
      },
      email:{
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         validate:{
            isEmail:true,
         }
      },
      password:{
         type: DataTypes.STRING,
         allowNull: false,
         validate:{
            len:[6,100]
         }
      }

   }, { timestamps: false });
};
