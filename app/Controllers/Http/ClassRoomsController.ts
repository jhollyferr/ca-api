import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ClassRoom from 'App/Models/ClassRoom'
import Teacher from 'App/Models/Teacher'

export default class ClassRoomsController {
  public async store({ request, response, params }: HttpContextContract) {
    const body = request.body()

    const teacher = await Teacher.findBy('registration', params.teacherRegistration)

    if (!teacher)
      return response.status(404).json({
        message: 'Teacher not found',
      })

    body.teacherRegistration = params.teacherRegistration

    const classRoom = await ClassRoom.create(body)

    return response.status(201).json({
      message: 'ClassRoom created with success',
      data: classRoom,
    })
  }

  public async index({ request, response, params }: HttpContextContract) {
    const teacher = await Teacher.findBy('registration', params.teacherRegistration)

    if (!teacher)
      return response.status(404).json({
        message: 'Teacher not found',
      })

    const classRooms = await ClassRoom.query().where(
      'teacherRegistration',
      params.teacherRegistration
    )

    if(!classRooms.length)
      return response.status(404).json({
        message: 'ClassRooms not found',
      })

    return response.status(200).json(classRooms)
  }

  public async show({ request, response, params }: HttpContextContract) {
    const teacher = await Teacher.findBy('registration', params.teacherRegistration)

    if (!teacher)
      return response.status(404).json({
        message: 'Teacher not found',
      })

    const [classRoom] = await ClassRoom.query()
      .where('teacherRegistration', params.teacherRegistration)
      .where('registration', params.registration)

    if (!classRoom)
      return response.status(404).json({
        message: 'ClassRoom not found',
      })
      
    return response.status(200).json(classRoom)
  }

  public async update({ request, response, params }: HttpContextContract) {
    const teacher = await Teacher.findBy('registration', params.teacherRegistration)

    if (!teacher)
      return response.status(404).json({
        message: 'Teacher not found',
      })

    const body = request.body()

    const [classRoom] = await ClassRoom.query()
      .where('teacherRegistration', params.teacherRegistration)
      .where('registration', params.registration)

    if (!classRoom)
      return response.status(404).json({
        message: 'ClassRoom not found',
      })

    await classRoom.merge(body).save()

    return response.status(200).json({
      message: 'ClassRoom updated successfully',
      data: classRoom,
    })
  }

  public async destroy({ request, response, params }: HttpContextContract) {
    const teacher = await Teacher.findBy('registration', params.teacherRegistration)

    if (!teacher)
      return response.status(404).json({
        message: 'Teacher not found',
      })

    const [classRoom] = await ClassRoom.query()
      .where('teacherRegistration', params.teacherRegistration)
      .where('registration', params.registration)

    if (!classRoom)
      return response.status(404).json({
        message: 'ClassRoom not found',
      })

    await classRoom.delete()

    return response.status(200).json({
      message: 'ClassRoom deleted successfully',
    })
  }
}
