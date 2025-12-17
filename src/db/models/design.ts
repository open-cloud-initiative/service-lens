import {
    AutoIncrement,
    Column,
    CreatedAt,
    DataType,
    DeletedAt,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt
} from 'sequelize-typescript'

@Table
export class Design extends Model<Design> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number

  @Column(DataType.STRING)
  title: string

  @Column(DataType.TEXT)
    body: string

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt: Date

  @CreatedAt
  @Column(DataType.DATE)
  createdAt: Date

  @DeletedAt
  @Column(DataType.DATE)
  deletedAt?: Date
}