const mongoose = require('mongoose');

const PlantsSchema = new mongoose.Schema({
    plant_id: String,
    scientific_name: String,
    introduction: String
});

const PlantsModel = mongoose.models.Plants || mongoose.model('Plants', PlantsSchema);
module.exports = PlantsModel;