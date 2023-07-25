import * as localDB from '../controller/localdb.js';

const localroutes = [
  {
    method: 'GET',
    url: '/users/:username',
    handler: localDB.getUser,
  },
  {
    method: 'POST',
    url: '/users/:username',
    handler: localDB.addUser,
  },
  {
    method: 'PUT',
    url: '/users/:username',
    handler: localDB.updateUser,
  },
  {
    method: 'DELETE',
    url: '/users/:username',
    handler: localDB.deleteUser,
  },
];

export default localroutes;
