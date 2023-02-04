const mongoose = require('mongoose');
const UserModel = require('../../model/userModel');
class UserService {
    static async getAllUsers() {
        const result = await UserModel.find({}).exec();
        return result;
    }
    static async getUser(id) {
        const result = await UserModel.findById(id).exec();
        return result;
    }
    static async editUser(id, data) {
        const result = await UserModel.findOneAndUpdate({ _id: id }, { $set: { ...data } });
        return result;
    }
    static async deleteUser(id) {
        const result = await UserModel.findOneAndDelete(id);
        return result;
    }
    static async addUser(data) {
        const result = await UserModel.create(data);
        return result;
    }
}

module.exports = UserService;