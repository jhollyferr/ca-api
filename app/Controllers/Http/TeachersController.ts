import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Teacher from 'App/Models/Teacher'

export default class TeachersController {
  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    const email = await Teacher.query().where('email', body.email)

    if (email.length)
      return response.status(400).json({
        message: 'E-mail provided is already in use',
      })

    await Teacher.create(body)

    return response.status(201).json({
      message: 'Teacher created successfully',
      data: body,
    })
  }

  public async index({ response }: HttpContextContract) {
    const teachers = await Teacher.all()

    return response.status(200).json(teachers)
  }

  public async show({ response, params }: HttpContextContract) {
    const teacher = await Teacher.findBy('registration', params.registration)

    if (!teacher)
      return response.status(404).json({
        message: 'Teacher not found',
      })

    return response.status(200).json(teacher)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const teacher = await Teacher.findBy('registration', params.registration)

    if (!teacher)
      return response.status(404).json({
        message: 'Teacher not found',
      })

    const body = request.body()

    await teacher.merge(body).save()

    return response.status(200).json({
      message: 'Teacher updated successfully',
      data: teacher,
    })
  }

  public async destroy({ params, response }: HttpContextContract) {
    const teacher = await Teacher.findBy('registration', params.registration)

    if (!teacher)
      return response.status(404).json({
        message: 'Teacher not found',
      })

    await teacher.delete()

    return response.status(200).json({
      message: 'Teacher deleted successfully',
    })
  }
}
