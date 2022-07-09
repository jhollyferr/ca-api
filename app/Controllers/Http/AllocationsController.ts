import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Allocation from 'App/Models/Allocation'
import ClassRoom from 'App/Models/ClassRoom'
import Student from 'App/Models/Student'
import Teacher from 'App/Models/Teacher'

export default class AllocationsController {
  public async store({ request, response, params }: HttpContextContract) {
    const teacher = await Teacher.find(params.teacherRegistration)

    if (!teacher)
      return response.status(404).json({
        message: 'Teacher not found',
      })

    const body = request.body()
    body.teacherRegistration = params.teacherRegistration
    body.teacherName = teacher.name

    const classRoom = await teacher
      ?.related('classRooms')
      .query()
      .where('registration', body.classRoomRegistration)
      .first()

    if (!classRoom)
      return response.status(404).json({
        message: 'Class room not linked to the teacher',
      })

    const student = await Student.findBy('registration', body.studentRegistration)

    if (!student)
      return response.status(404).json({
        message: 'Student not found',
      })

    const isAllocatedStudent = await Allocation.query()
      .where('student_registration', body.studentRegistration)
      .where('class_room_registration', body.classRoomRegistration)
      .first()

    if (isAllocatedStudent)
      return response.status(400).json({
        message: 'Student already has allocation in this class room',
      })

    const allocation = await Allocation.query().where(
      'class_room_registration',
      body.classRoomRegistration
    )

    if (allocation.length >= classRoom.capacity) {
      await classRoom
        .merge({
          available: false,
        })
        .save()

      return response.status(400).json({
        message: 'Class room is full',
      })
    }

    await Allocation.create(body)

    return response.status(201).json({
      message: 'Student allocated successfully',
      data: body,
    })
  }

  public async index({ request, response, params }: HttpContextContract) {
    const allocations = await Allocation.query().where(
      'class_room_registration',
      params.classRegistration
    )

    return response.status(200).json(allocations)
  }

  public async destroy({ request, params, response }: HttpContextContract) {
    const teacher = await Teacher.find(params.teacherRegistration)

    if (!teacher)
      return response.status(404).json({
        message: 'Teacher not found',
      })

    const body = request.body()
    body.teacherRegistration = params.teacherRegistration

    const classRoom = await teacher
      ?.related('classRooms')
      .query()
      .where('registration', body.classRoomRegistration)
      .first()

    if (!classRoom)
      return response.status(404).json({
        message: 'Class room not linked to the teacher',
      })

    const student = await Student.findBy('registration', body.studentRegistration)

    if (!student)
      return response.status(404).json({
        message: 'Student not found',
      })

    const isAllocatedStudent = await Allocation.query()
      .where('student_registration', body.studentRegistration)
      .where('class_room_registration', body.classRoomRegistration)
      .first()

    if (!isAllocatedStudent)
      return response.status(400).json({
        message: 'Student not allocated in this class room',
      })

    const allocation = await Allocation.findBy('registration', isAllocatedStudent.registration)

    await allocation?.delete()

    await classRoom
      .merge({
        available: true,
      })
      .save()

    return response.status(200).json({
      message: 'Student deallocated successfully',
    })
  }
}
