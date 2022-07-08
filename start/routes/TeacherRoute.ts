import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'TeachersController.store')
  Route.get('/', 'TeachersController.index')
  Route.get('/:registration', 'TeachersController.show')
  Route.delete('/:registration', 'TeachersController.destroy')
  Route.put('/:registration', 'TeachersController.update')

  Route.post('/:teacherRegistration/classrooms', 'ClassRoomsController.store')
  Route.get('/:teacherRegistration/classrooms', 'ClassRoomsController.index')
  Route.get('/:teacherRegistration/classrooms/:registration', 'ClassRoomsController.show')
  Route.put('/:teacherRegistration/classrooms/:registration', 'ClassRoomsController.update')
  Route.delete('/:teacherRegistration/classrooms/:registration', 'ClassRoomsController.destroy')
  
}).prefix('/ca-api/teachers')
