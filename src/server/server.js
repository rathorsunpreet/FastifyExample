import app from './app.js';

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log(err);
    process.exit(1);
  }
});
