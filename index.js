const app = require("./src/config/server");
const { port } = require("./src/config/vars");

app.listen(port, err => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error("Failed on listening :(", err);
  }
  // eslint-disable-next-line no-console
  console.log(`app listening on port ${port}`);
});
