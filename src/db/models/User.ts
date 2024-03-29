import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../../config/dbConnect';

interface UserAttributes {
  id?: number;
  username?: string;
  email?: string;
  roleId?: number;
  password?: string;
  accessToken?: string | null;
  isVerified?: boolean;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, 'id'> { }
export interface UserOutput extends Required<UserAttributes> { }

class User
  extends Model<UserAttributes, UserInput>
  implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public roleId!: number;
  public password!: string;
  public accessToken!: string;
  public isVerified!: boolean;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    password: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    accessToken: {
      allowNull: true,
      type: DataTypes.TEXT

    },
    isVerified: {
      allowNull: true,
      type: DataTypes.BOOLEAN
    },
    isActive: {
      allowNull: true,
      type: DataTypes.BOOLEAN
    }
  }, {
  sequelize: connection,
  underscored: false,
  timestamps: true
})

export default User