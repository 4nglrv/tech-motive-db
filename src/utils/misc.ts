import { DataTypes, ModelAttributes, Sequelize, literal } from "sequelize";

export class Fields {
  static id(): ModelAttributes {
    return {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    };
  }

  static uid(): ModelAttributes {
    return {
      uid: {
        type: DataTypes.UUID,
        defaultValue: literal("uuid_generate_v4()"),
        allowNull: false,
        primaryKey: true,
      },
    };
  }

  static timestamps(): ModelAttributes {
    return {
      create_dt: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "Время создания записи",
        defaultValue: Sequelize.literal("NOW()"),
      },
      update_dt: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "Время изменения записи",
        defaultValue: Sequelize.literal("NOW()"),
      },
    };
  }

  static initials(): ModelAttributes {
    return {
      first_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: "имя",
      },
      last_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: "фамилия",
      },
      patronymic: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: "отчество",
      },
    };
  }
}
