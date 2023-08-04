import Fastify from 'fastify';
import dbroutes from './src/routes/dbroutes.js';

const fastify = Fastify({
  logger: {
    transport: {
      target: '@fastify/one-line-logger',
    },
  },
});

fastify.get('/', (req, reply) => {
  reply.send({ hello: 'world' });
});

dbroutes.forEach((rte, index) => {
  fastify.route(rte);
});

fastify.setNotFoundHandler((request, reply) => {
  reply.send({ msg: 'Page Not Found!' });
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log(err);
    process.exit(1);
  }
});
