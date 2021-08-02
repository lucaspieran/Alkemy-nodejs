const authService = require('../services/authService');
const s3Service = require('../services/s3Service');
const fs = require('fs');
const util  = require('util');
const unlinkFile = util.promisify(fs.unlink);
const { request, response } = require('express');
const {setResponseWithOk, setResponseWithError } = require('../util/common-response');
const statusCodes = require('../constants/statusCodes');
const statusMessages = require('../constants/statusMessages');

const register = async(req = request, res = response, next) => {

    const user = req.body;
    const file = req.file;
    const result = await s3Service.uploadFile(file);
    await unlinkFile(file.path);
    user.photo = result.key;
    if(!user.roleId){
        user.roleId = 2;
    }
    try{
        let userCreated = await authService.register(res, user);
        if(userCreated.userCreated){
            setResponseWithOk(res, statusCodes.CREATED, statusMessages.SUCCESS_CREATE, 'ok', userCreated)
        }
    }catch(error){
        setResponseWithError(res, statusCodes.BAD_REQUEST, statusMessages.BAD_REQUEST, 'error')
    }

}

const login = async(req = request, res = response, next) => {
    try {
        let userLog = await authService.login(res, req.body.email, req.body.password);
        if (userLog.userFound){
            setResponseWithOk(res, statusCodes.OK, statusMessages.SUCCESS_LOGIN, 'ok', userLog)
        }
    } catch (error) {
        next(error)
    }
}

const getUSerByJwt = async(req = request, res = response, next) => {
    try{
        const token = req.header('Authorization');
        const user = await authService.validToken(res, token);
    
        setResponseWithOk(res, statusCodes.OK, statusMessages.SUCCESS, 'ok', user)
    }catch(error){
        next(error);
    }
}

module.exports = {
    register,
    login,
    getUSerByJwt
};