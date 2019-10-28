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

  async update(id, data) {
    const item = await this.Model.findOne({ _id: id });
    const updatedItem = Object.assign(item, data);
    await updatedItem.save();
    // eslint-disable-next-line no-underscore-dangle
    return updatedItem && updatedItem._id ? updatedItem : null;
  }

  async delete(id) {
    const response = await this.Model.deleteOne({ _id: id });
    return response.deletedCount >= 1;
  }
}

module.exports = Query;
