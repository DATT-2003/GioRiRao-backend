const Area = require("../models/Area");

const createArea = async (areaData) => {
    const area = new Area(areaData);
    return await area.save(areaData);
};

const findAreaById = async (id) => {

    return await Area.findById(id).lean();
};

const updateArea = async (id, updateData) => {
    return await Area.findByIdAndUpdate(id, updateData, { new: true }).lean();
};

const findAreasByCityId = async (cityId) => {
    return await Area.find({ cityId, deleted: false }).lean();
};

module.exports = {
    createArea,
    findAreaById,
    updateArea,
    findAreasByCityId,
};