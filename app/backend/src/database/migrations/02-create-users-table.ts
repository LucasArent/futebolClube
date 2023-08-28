import  userInterface from '../../Interfaces/Users/user.model';
import { Model, QueryInterface, DataTypes } from 'sequelize';

export default {
  up(queryInterface: QueryInterface){
    return queryInterface.createTable<Model<userInterface>>('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },  
    })
  },
  down(queryInterface: QueryInterface){
    return queryInterface.dropTable('users');
  }
}