import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'allocations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('registration').notNullable().primary().unique()

      table.string('teacher_name').notNullable()

      table
        .string('teacher_registration')
        .unsigned()
        .notNullable()
        .references('teachers.registration')
        .onDelete('CASCADE')

      table
        .string('class_room_registration')
        .unsigned()
        .notNullable()
        .references('class_rooms.registration')
        .onDelete('CASCADE')

      table
        .string('student_registration')
        .unsigned()
        .notNullable()
        .references('students.registration')
        .onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
