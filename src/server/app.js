import Fastify from 'fastify';
import fastifyView from '@fastify/view';
import fastifyStatic from '@fastify/static';
import pug from 'pug';
import getDirName from '../helpers/fsmethods.js';
import dbroutes from '../routes/dbroutes.js';
import '../helpers/dbconnector.js';

// Create fastify object with logger set to one-line-logger
const app = Fastify({
  logger: {
    transport: {
      target: '@fastify/one-line-logger',
    },
  },
});

// Register Pug with template root set to views folder
app.register(fastifyView, {
  engine: {
    pug,
  },
  root: getDirName('../../views'),
  propertyName: 'render',
});

// Register @fastify/static with fastify
// Used to render images
app.register(fastifyStatic, {
  root: getDirName('../../public'),
});

app.get('/', (req, reply) => {
  // reply.send({ hello: 'world' });
  reply.render('index');
});

dbroutes.forEach((rte, index) => {
  app.route(rte);
});

// Set fastify's not found handler
app.setNotFoundHandler((request, reply) => {
  reply
    .code(404)
    .send({ error: 'Page Not Found!' });
});

export default app;
