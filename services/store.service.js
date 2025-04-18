const storeRepository = require("../repositories/store.repo");
const areaRepository = require("../repositories/area.repo");
const cityRepository = require("../repositories/city.repo");
const staffRepository = require("../repositories/staff.repo");
const { BadRequest, NotFound } = require("../config/error.response.config");

const createStore = async (storeData) => {
  const { areaId, name } = storeData;

  // Kiểm tra xem Area có tồn tại hay không
  const area = await areaRepository.findAreaById(areaId);
  if (!area) {
    throw new NotFound("Area not found.");
  }

  // Kiểm tra xem Store với tên đã tồn tại chưa
  const existingStore = await storeRepository.findStoreByName(name);
  if (existingStore) {
    throw new BadRequest("This store already exists.");
  }

  // Gán cityId từ Area
  storeData.cityId = area.cityId;

  // Tạo store mới
  const store = await storeRepository.createStore(storeData);
  // Tạo store mớ

  // Tăng `totalStores` trong Area lên 1
  await areaRepository.updateArea(areaId, {
    $inc: { totalStores: 1 },
  });

  // Tăng `totalStores` trong City lên 1
  await cityRepository.updateCityById(area.cityId, {
    $inc: { totalStores: 1 },
  });

  return store;
};

const getStoreById = async (storeId) => {
  // Kiểm tra store có tồn tại hay không
  const store = await storeRepository.findStoreById(storeId);
  if (!store) {
    throw new NotFound("Store not found.");
  }
  // Kiểm tra store có bị xóa hay không
  if (store.deleted) {
    throw new BadRequest("Store has been deleted.");
  }
  return store;
};

const updateStore = async (storeId, updateData) => {
  // Kiểm tra store có tồn tại hay không
  const store = await storeRepository.findStoreById(storeId);
  if (!store) {
    throw new NotFound("Store not found.");
  }
  // Không cho phép cập nhật trường 'deleted'
  if (updateData.hasOwnProperty("deleted")) {
    throw new BadRequest("Cannot update the 'deleted' field.");
  }
  return await storeRepository.updateStore(storeId, updateData);
  // Kiểm tra store có tồn tại hay không
};
const updateManager = async (storeId, managerId) => {
  const store = await storeRepository.findStoreById(storeId);
  if (!store) {
    throw new NotFound("Store not found.");
  }
  if (store.deleted) {
    throw new BadRequest("Cannot update staff for a deleted store.");
  }
  return await storeRepository.updateStore(storeId, { managerId });
};
const updateStaff = async (storeId, staffIds) => {
  const store = await storeRepository.findStoreById(storeId);
  if (!store) {
    throw new NotFound("Store not found.");
  }
  const updatedStaffs = [...new Set([...(store.staffs || []), ...staffIds])];
  return await storeRepository.updateStore(storeId, { staffs: updatedStaffs });
};

const deleteStaff = async (storeId, staffIds) => {
  const store = await storeRepository.findStoreById(storeId);
  if (!store) {
    throw new NotFound("Store not found.");
  }
  // Lọc danh sách staff hiện tại, loại bỏ staff cần xóa
  const updatedStaffs = store.staffs.filter(
    (staff) => !staffIds.includes(staff.toString())
  );

  for (const staffId of staffIds) {
    await staffRepository.updateStaff(staffId, { deleted: true });
  }

  // Cập nhật lại danh sách staffs
  return await storeRepository.updateStore(storeId, { staffs: updatedStaffs });
};

const getStoresByArea = async (areaId) => {
  return await storeRepository.getStoresByArea(areaId);
};

const getStaffsOfTheStore = async (storeId) => {
  const staffs = await storeRepository.getStaffsOfTheStore(storeId);

  return staffs;
};

const addStaffToStore = async (storeId, staffId) => {
  // Kiểm tra xem store có tồn tại hay không
  const store = await storeRepository.findStoreById(storeId);
  if (!store) {
    throw new NotFound("Store not found.");
  }

  // Kiểm tra xem staff có tồn tại hay không
  const staff = await staffRepository.findStaffById(staffId);
  if (!staff) {
    throw new NotFound("Staff not found.");
  }

  // Cập nhật danh sách staffs của store
  const updatedStore = await storeRepository.updateStoreStaff(storeId, staffId);
  if (!updatedStore) {
    throw new BadRequest("Failed to update store staff.");
  }
  return updatedStore;
};

const changeStaffRole = async (storeId, staffs) => {
  // role phải khác storeManager

  // Kiểm tra xem store có tồn tại hay không
  const store = await storeRepository.findStoreById(storeId);
  if (!store) {
    throw new NotFound("Store not found.");
  }

  for (const staff of staffs) {
    const staffData = await staffRepository.findStaffById(staff.staffId);
    if (!staffData) {
      throw new NotFound("Staff not found.");
    }

    if (staff.role === "storeManager" || staff.role === "admin") {
      throw new BadRequest(
        "Cannot change staff role to storeManager or admin."
      );
    }

    // Cập nhật role của staff
    await staffRepository.updateStaff(staff.staffId, { role: staff.role });
  }

  return "Staff roles updated successfully.";
};

module.exports = {
  createStore,
  updateStore,
  updateManager,
  getStoresByArea,
  updateStaff,
  deleteStaff,
  getStoreById,
  addStaffToStore,
  getStaffsOfTheStore,
};
