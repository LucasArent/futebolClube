import { QueryInterface, DataTypes } from 'sequelize';

export default {
    up: async (queryInterface: QueryInterface) => {
        await queryInterface.createTable('teams', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            team_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        });
    },
    down: async (queryInterface: QueryInterface) => {
        await queryInterface.dropTable('teams');
    },
};
