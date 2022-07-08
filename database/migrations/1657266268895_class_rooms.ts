import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'class_rooms'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('registration').notNullable().primary().unique()

      table.integer('capacity').notNullable()

      table.boolean('available').notNullable().defaultTo(true)

      table
        .string('teacher_registration')
        .unsigned()
        .notNullable()
        .references('teachers.registration')
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
