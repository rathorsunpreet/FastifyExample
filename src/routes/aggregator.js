import localroutes from './localroutes.js';
import dbroutes from './dbroutes.js';
import dbState from '../helpers/dbconnector.js';

const routeObj = {
  name: '',
  routes: '',
};

// If mongodb connected, delete local property of routeObj
// otherwise delete db property and set the name property
// accordingly
if (dbState.val) {
  routeObj.name = 'MongoDB';
  routeObj.routes = dbroutes;
} else {
  routeObj.name = 'LocalDB';
  routeObj.routes = localroutes;
}

export default routeObj;
