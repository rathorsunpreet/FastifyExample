import Fastify from 'fastify';
import fastifyView from '@fastify/view';
import fastifyStatic from '@fastify/static';
import pug from 'pug';
import getDirName from './src/helpers/fsmethods.js';
import dbroutes from './src/routes/dbroutes.js';

// Create fastify object with logger set to one-line-logger
const fastify = Fastify({
  logger: {
    transport: {
      target: '@fastify/one-line-logger',
    },
  },
});

// Register Pug with template root set to views folder
fastify.register(fastifyView, {
  engine: {
    pug,
  },
  root: getDirName('../../views'),
});

// Register @fastify/static with fastify
fastify.register(fastifyStatic, {
  root: getDirName('../../public');
});

fastify.get('/', (req, reply) => {
  reply.send({ hello: 'world' });
});

dbroutes.forEach((rte, index) => {
  fastify.route(rte);
});

// Set fastify's not found handler 
fastify.setNotFoundHandler((request, reply) => {
  reply
    .code(404)
    .send({ error: 'Page Not Found!' });
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log(err);
    process.exit(1);
  }
});
