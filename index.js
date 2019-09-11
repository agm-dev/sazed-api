const server = require('./src/config/server');

const port = process.env.PORT || 8888;
server.listen(port, () => {
  // eslint-disable-next-line
  console.log(`server running on port ${port}`);
});
