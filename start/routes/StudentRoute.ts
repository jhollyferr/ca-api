import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'StudentsController.store')
  Route.get('/', 'StudentsController.index')
  Route.get('/:registration', 'StudentsController.show')
  Route.delete('/:registration', 'StudentsController.destroy')
  Route.put('/:registration', 'StudentsController.update')

  Route.get('/:registration/allocation', 'StudentsController.findClasses')
}).prefix('/ca-api/students')
