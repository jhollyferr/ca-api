import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'

export default class Allocation extends BaseModel {
  public static selfAssingPrimaryKey = true

  @column({ isPrimary: true })
  public registration: string

  @column()
  public teacherRegistration: string

  @column()
  public teacherName: string

  @column()
  public classRoomRegistration: string

  @column()
  public studentRegistration: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateRegistration(allocation: Allocation) {
    allocation.registration = uuid().substring(0, 8).toUpperCase()
  }
}
