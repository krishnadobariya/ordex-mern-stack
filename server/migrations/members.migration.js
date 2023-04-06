module.exports = {
    up: (QueryInterface, Sequelize) => {
        return QueryInterface.createTable('members', {
            id: {
                allowNull: false,
                autoIncrement: true,
                // primaryKey: true,
                type: Sequelize.INTEGER
            },
            teamid: {
                type: Sequelize.INTEGER
            },
            memberprofile: {
                type: Sequelize.STRING(100)
            },
            name: {
                type: Sequelize.STRING(50)
            },
            performance: {
                type: Sequelize.STRING(50)
            },
            countryflag: {
                type: Sequelize.STRING(100)
            },
            countryname: {
                type: Sequelize.STRING(50)
            },
            countrycode: {
                type: Sequelize.STRING(10)
            },
            strengths: {
                type: Sequelize.STRING(50)
            },
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('members');
    }
};