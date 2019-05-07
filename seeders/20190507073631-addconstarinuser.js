'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn("User", "id_message", {
                    type: Sequelize.INTEGER
                }, {transaction: t}),
                queryInterface.addConstraint('User', ["id_message"], {
                    type: "foreign key",
                    references: {
                        table: "Messages",
                        field: "id",
                    },
                    onDelete: "set null",
                    onUpdate: "set null",
                }, {transaction: t})
            ])
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('User', 'id_message', {transaction: t}),
                queryInterface.removeColumn('User', 'id_interface', {transaction: t}),
            ])
        })
    }
};