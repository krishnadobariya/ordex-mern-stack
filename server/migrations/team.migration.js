module.exports = {
    up: (QueryInterface, Sequelize) => {
        return QueryInterface.createTable('team', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            teamprofile: {
                type: Sequelize.STRING(100)
            },
            publicurlid: {
                type: Sequelize.STRING(100)
            },
            teamname: {
                type: Sequelize.STRING(50)
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('team');
    }
};
