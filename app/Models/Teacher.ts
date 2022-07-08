import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

export default class Teacher extends BaseModel {
  public static selfAssingPrimaryKey = true

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
  public static async generateRegistration(teacher: Teacher) {
    teacher.registration = uuid().substring(0, 8).toUpperCase()
  }
}
