import { QueryInterface, DataTypes, QueryTypes } from 'sequelize';

const up = (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      // here go all migration changes
    }
)

const down = (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
    async (transaction) => {
      // here go all migration undo changes
    }
)


export { up, down }