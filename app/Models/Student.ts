import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Allocation from './Allocation'

export default class Student extends BaseModel {
  public static selfAssingPrimaryKey = true

  @hasMany(() => Allocation)
  public allocations: HasMany<typeof Allocation>

  @column({ isPrimary: true })
  public registration: string

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public birthdate: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateRegistration(student: Student) {
    student.registration = uuid().substring(0, 8).toUpperCase()
  }
}
