import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Student from 'App/Models/Student'

export default class StudentsController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    const email = await Student.query().where('email', body.email)

    if (email.length)
      return response.status(400).json({
        message: 'E-mail provided is already in use',
      })

    await Student.create(body)

    return response.status(201).json({
      message: 'Student created successfully',
      data: body,
    })
  }

  public async index({ response }: HttpContextContract) {
    const students = await Student.all()

    return response.status(200).json(students)
  }

  public async show({ response, params }: HttpContextContract) {
    const student = await Student.findBy('registration', params.registration)

    if (!student)
      return response.status(404).json({
        message: 'Student not found',
      })

    return response.status(200).json(student)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const student = await Student.findBy('registration', params.registration)

    if (!student)
      return response.status(404).json({
        message: 'Student not found',
      })

    const body = request.body()

    await student.merge(body).save()

    return response.status(200).json({
      message: 'Student updated successfully',
      data: student,
    })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const student = await Student.findBy('registration', params.registration)

    if (!student)
      return response.status(404).json({
        message: 'Student not found',
      })

    await student.delete()

    return response.status(200).json({
      message: 'Student deleted successfully',
    })
  }

  public async findClasses({ params, response }: HttpContextContract) {
    const student = await Student.query()
      .where('registration', params.registration)
      .preload('allocations')

    return response.status(200).json(student)
  }
}
