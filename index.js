import Fastify from 'fastify';
import routes from './src/routes/routes.js';

const fastify = Fastify({
  logger: {
    transport: {
      target: '@fastify/one-line-logger',
    },
  },
});

routes.forEach((rte, index) => {
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
