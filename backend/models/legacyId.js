function addLegacyId(Model) {
  Model.prototype.toJSON = function toJSON() {
    return { ...this.get({ plain: true }), _id: this.id };
  };
  return Model;
}

module.exports = addLegacyId;