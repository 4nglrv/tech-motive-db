import { QueryInterface, DataTypes, QueryTypes } from "sequelize";
import { Fields } from "../utils/misc";

const up = (queryInterface: QueryInterface): Promise<void> =>
  queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'
    );

    await queryInterface.createTable(
      "Users",
      {
        ...Fields.uid(),
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          comment: "e-mail",
        },
        password: {
          type: DataTypes.TEXT,
          allowNull: false,
          comment: "пароль",
        },
        salt: {
          type: DataTypes.TEXT,
          allowNull: false,
          comment: "соли",
        },
        role: {
          type: DataTypes.ENUM({
            values: ["admin", "manager", "user"],
          }),
          allowNull: false,
          defaultValue: "user",
          comment: "роль пользователя",
        },
        is_confirmed: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          comment: "подтверждение аккаунта",
        },
        telegram: {
          type: DataTypes.STRING(255),
          allowNull: true,
          comment: "id в телеге",
        },
        api_key: {
          type: DataTypes.TEXT,
          allowNull: true,
          comment: "api ключ для телеграм бота",
        },
        ...Fields.timestamps(),
      },
      { transaction }
    );

    await queryInterface.createTable(
      "Clients",
      {
        ...Fields.id(),
        user_id: {
          type: DataTypes.UUID,
          references: {
            model: "Users",
            key: "uid",
          },
          onDelete: "cascade",
          comment: "аккаунт клиента",
          allowNull: true,
        },
        ...Fields.initials(),
        phone: {
          type: DataTypes.STRING(64),
          allowNull: false,
          unique: true,
          comment: "мобильный номер телефона",
        },
        about_client: {
          type: DataTypes.STRING(512),
          allowNull: true,
          comment: "дополнительная информация о клиенте",
        },
        ...Fields.timestamps(),
      },
      { transaction }
    );

    await queryInterface.createTable(
      "Addresses",
      {
        ...Fields.uid(),
        client_id: {
          type: DataTypes.INTEGER,
          references: {
            model: "Clients",
            key: "id",
          },
          onDelete: "cascade",
          comment: "id клиента",
          allowNull: true,
        },
        city: {
          type: DataTypes.STRING(64),
          allowNull: false,
          comment: "город",
        },
        address: {
          type: DataTypes.STRING(255),
          allowNull: false,
          comment: "адрес клиента",
        },
        metro: {
          type: DataTypes.STRING(255),
          allowNull: true,
          comment: "ближайшее метро клиента",
        },
        description: {
          type: DataTypes.STRING(512),
          allowNull: true,
          comment: "дополнительное описание к адресу",
        },
        ...Fields.timestamps(),
      },
      { transaction }
    );

    await queryInterface.createTable(
      "Specializations",
      {
        ...Fields.id(),
        title: {
          type: DataTypes.STRING(64),
          comment: "название специализации",
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING(255),
          comment: "описание специализации",
          allowNull: true,
        },
      },
      { transaction }
    );

    await queryInterface.createTable(
      "Personal",
      {
        ...Fields.id(),
        user_id: {
          type: DataTypes.UUID,
          references: {
            model: "Users",
            key: "uid",
          },
          onDelete: "cascade",
          comment: "аккаунт сотрудника",
          allowNull: true,
        },
        specialization_id: {
          type: DataTypes.INTEGER,
          references: {
            model: "Specializations",
            key: "id",
          },
          onDelete: "cascade",
          comment: "специализация сотрудника",
          allowNull: false,
        },
        ...Fields.initials(),
        birth: {
          type: DataTypes.DATE,
          allowNull: false,
          comment: "дата рождения",
        },
        passport: {
          type: DataTypes.INTEGER,
          allowNull: false,
          comment: "серия и номер паспорта",
        },
        address: {
          type: DataTypes.STRING(255),
          allowNull: false,
          comment: "адрес проживания",
        },
        metro: {
          type: DataTypes.STRING(255),
          allowNull: true,
          comment: "ближайшее метро от адреса проживания",
        },
        phone: {
          type: DataTypes.STRING(64),
          allowNull: false,
          unique: true,
          comment: "мобильный номер телефона",
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          comment: "статус работы",
        },
        ...Fields.timestamps(),
      },
      { transaction }
    );

    await queryInterface.createTable(
      "Orders",
      {
        ...Fields.uid(),
        client_id: {
          type: DataTypes.INTEGER,
          references: {
            model: "Clients",
            key: "id",
          },
          onDelete: "cascade",
          allowNull: false,
          comment: "клиент которому необходим ремонт",
        },
        address_id: {
          type: DataTypes.UUID,
          references: {
            model: "Addresses",
            key: "uid",
          },
          onDelete: "cascade",
          allowNull: false,
          comment: "id адреса клиента",
        },
        personal_id: {
          type: DataTypes.INTEGER,
          references: {
            model: "Personal",
            key: "id",
          },
          onDelete: "cascade",
          allowNull: true,
          comment: "сотрудник, на которого назначили выполнение заявки",
        },

        about_order: {
          type: DataTypes.STRING(512),
          allowNull: true,
          comment: "дополнительная информация о заказе",
        },
        status: {
          type: DataTypes.ENUM({
            values: ["создан", "подтвержден", "выполнен", "отменен"],
          }),
          allowNull: false,
          defaultValue: "создан",
          comment: "статус заказа",
        },
        ...Fields.timestamps(),
      },
      { transaction }
    );

    await queryInterface.createTable(
      "Equipments",
      {
        ...Fields.id(),
        title: {
          type: DataTypes.STRING(64),
          allowNull: false,
          unique: true,
          comment: "тип оборудования",
        },
        description: {
          type: DataTypes.STRING(255),
          allowNull: true,
          comment: "описание оборудования",
        },
      },
      { transaction }
    );

    await queryInterface.createTable(
      "Orders_Equipments",
      {
        ...Fields.uid(),
        order_id: {
          type: DataTypes.UUID,
          references: {
            model: "Orders",
            key: "uid",
          },
          onDelete: "cascade",
          comment: "заказ",
          allowNull: false,
        },
        equipment_id: {
          type: DataTypes.INTEGER,
          references: {
            model: "Equipments",
            key: "id",
          },
          onDelete: "cascade",
          comment: "тип оборудования",
          allowNull: false,
        },
      },
      { transaction }
    );

    await queryInterface.createTable(
      "Payments",
      {
        ...Fields.uid(),
        order_id: {
          type: DataTypes.UUID,
          references: {
            model: "Orders",
            key: "uid",
          },
          onDelete: "cascade",
          allowNull: false,
          comment: "заказ к которому закреплена оплата",
        },
        type: {
          type: DataTypes.ENUM({
            values: ["наличными", "картой"],
          }),
          allowNull: false,
          comment: "тип оплаты",
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
          comment: "стоимость оплаты в рублях",
        },
        link: {
          type: DataTypes.STRING(2048),
          allowNull: true,
          comment: "ссылка на чек",
        },
        is_paid: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          comment: "статус оплаты",
        },
      },
      { transaction }
    );
  });

const down = (queryInterface: QueryInterface): Promise<void> =>
  queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.dropTable("Payments", { transaction });
    await queryInterface.dropTable("Orders_Equipments", { transaction });
    await queryInterface.dropTable("Orders", { transaction });
    await queryInterface.dropTable("Equipments", { transaction });

    await queryInterface.dropTable("Personal", { transaction });
    await queryInterface.dropTable("Specializations", { transaction });
    await queryInterface.dropTable("Addresses", { transaction });
    await queryInterface.dropTable("Clients", { transaction });
  });

export { up, down };
