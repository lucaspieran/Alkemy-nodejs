const { Users } = require('../models');
const bcrypt = require('bcrypt');
const {setResponseWithError} = require('../util/common-response');
const statusCodes = require('../constants/statusCodes');
const statusMessages = require('../constants/statusMessages'); 

class UserService{
    constructor(){

    }

    async getAll(){
        return await Users.findAll();
    }

    async findById(id){
        return await Users.findByPk(id);
    }

    async findByEmail(email){
        return await Users.findOne({
            where: {
                email}
            })
    }

    async save(user){
        user.password = await bcrypt.hash(user.password,10);
        return await Users.create(user);
    }

    async update(id,user){
        return await Users.update(user, {
            where: {
                id
          }});
    }

    async delete(id){
        return await Users.destroy({
            where: {
                id
            }
          });
    }

}

module.exports = UserService ;