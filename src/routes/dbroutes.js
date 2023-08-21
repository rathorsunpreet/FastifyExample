import * as Controller from '../controller/controllers.js';

const dbroutes = [
  {
    method: 'POST',
    url: '/auth',
    handler: Controller.auth,
  },
  {
    method: 'GET',
    url: '/users/:username',
    handler: Controller.getUser,
  },
  {
    method: 'POST',
    url: '/users/:username',
    handler: Controller.addUser,
  },
  {
    method: 'PUT',
    url: '/users/:username',
    handler: Controller.updateUser,
  },
  {
    method: 'DELETE',
    url: '/users/:username',
    handler: Controller.deleteUser,
  },
];

export default dbroutes;
