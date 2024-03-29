import { DataTypes, Model, Optional } from 'sequelize';
import connection from '../../config/dbConnect';

interface RoleAttributes {
  id?: number,
  roleName?: string | null,
  isActive?: boolean | null,
  createdAt?: Date,
  updatedAt?: Date
}

export interface RoleInput extends Optional<RoleAttributes, 'id'> { }
export interface RoleOutput extends Required<RoleAttributes> { }

class Role extends Model<RoleAttributes, RoleInput> implements RoleAttributes {
  public id!: number;
  public roleName!: string;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Role.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  roleName: {
    allowNull: true,
    type: DataTypes.STRING
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

export default Role