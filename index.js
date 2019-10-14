const { connectToDatabase } = require("./src/config/db");
const app = require("./src/config/server");
const { port } = require("./src/config/vars");

(async () => {
  try {
    await connectToDatabase();
    // eslint-disable-next-line no-console
    console.log("[database] connected to database");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[database] error on connection", err.message);
    process.exit(1);
  }

  app.listen(port, err => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error("[server] failed on listening :(", err.message);
    }
    // eslint-disable-next-line no-console
    console.log(`[server] listening on port ${port}`);
  });
})();
