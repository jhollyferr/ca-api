import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/:teacherRegistration/classrooms/allocation', 'AllocationsController.store')
  
  Route.get(
    '/:teacherRegistration/classrooms/:classRegistration/allocation',
    'AllocationsController.index'
  )
  
  Route.delete(
    '/:teacherRegistration/allocation',
    'AllocationsController.destroy'
  )
}).prefix('/ca-api/teachers')
