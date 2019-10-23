/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const dummy = require("mongoose-dummy");
const { connectToDatabase, disconnectDatabase } = require("../src/config/db");
const Customer = require("../src/models/Customer.model");

function cleanCollection(Model) {
  return Model.deleteMany({});
}

function generateDummyDocument(Model) {
  const ignoredFields = ["_id", "created_at", "__v", /detail.*info/];

  const dummyObject = dummy(Model, {
    ignore: ignoredFields,
    returnDate: true
  });

  return dummyObject;
}

function generateDummyDocuments(Model, n = 10) {
  return [...Array(n)].map(() => {
    const instance = new Model(generateDummyDocument(Model));
    return instance.save();
  });
}

const models = [Customer];

(async () => {
  try {
    await connectToDatabase();
    await Promise.all(
      models.reduce((final, Model) => {
        const result = final.length ? final : [cleanCollection(Model)];
        return [...result, ...generateDummyDocuments(Model, 20)];
      }, [])
    );
    await disconnectDatabase();
    console.log("finished!");
  } catch (err) {
    console.error("error: ", err.message);
    process.exit(1);
  }
})();
