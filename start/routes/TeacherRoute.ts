import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/', 'TeachersController.store')
  Route.get('/', 'TeachersController.index')
  Route.get('/:registration', 'TeachersController.show')
  Route.delete('/:registration', 'TeachersController.destroy')
  Route.put('/:registration', 'TeachersController.update')
}).prefix('/ca-api/teachers')
