import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

export default class ClassRoom extends BaseModel {
  public static selfAssingPrimaryKey = true

  @column({ isPrimary: true })
  public registration: string

  @column()
  public capacity: number

  @column()
  public available: boolean

  @column()
  public teacherRegistration: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateRegistration(classRoom: ClassRoom) {
    classRoom.registration = uuid().substring(0, 8).toUpperCase()
  }
}
