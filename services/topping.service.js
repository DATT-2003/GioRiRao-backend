const toppingRepository = require("../repositories/topping.repo");
const { BadRequest, NotFound, InternalServerError } = require("../config/error.response.config");

const createTopping = async (data) => {
    /**
     * Logic:
     * Kiểm tra đã có topping trước đó ?
     * Nếu có, lỗi
     * Tiến hành thêm topping vào db
     */

    const existingTopping = await toppingRepository.findTopping({name: data.name})

    if (existingTopping) {
        throw new BadRequest("Topping is already exist")
    }

    const newTopping = await toppingRepository.createTopping(data)

    if (!newTopping) {
        throw new InternalServerError("An error happen when we create new topping");
    }

    return newTopping
};

const updateTopping = async (query ,data) => {
  /**
   * Logic:
   * không cần kiểm tra gì, tiến hành gọi db và update dữ liệu luôn
   */
  
    const updatedTopping = await toppingRepository.updateTopping(query, data);

    if (!updatedTopping) {
        throw new InternalServerError("Fail to update topping")
    }

  return updatedTopping
};

module.exports = {
  createTopping,
  updateTopping,
};