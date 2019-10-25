class Query {
  constructor(Model) {
    if (!Model) {
      throw new Error("Query needs a Model");
    }
    this.Model = Model;
  }

  async get(id = null) {
    const query = id ? { _id: id } : {};
    const results = await this.Model.find(query);
    return id ? results[0] || {} : results;
  }

  async add(data) {
    const instance = new this.Model(data);
    await instance.save();
    // eslint-disable-next-line no-underscore-dangle
    return instance && instance._id ? instance : null;
  }
}

module.exports = Query;
