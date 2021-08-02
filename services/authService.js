const jwt = require('jsonwebtoken');
const UserService = require('../services/userService');
const userService = new UserService();
const mailServices = require('./mailServices');
const AppError = require('../errors/appError');
const bcrypt = require('bcrypt');
const statusCodes = require('../constants/statusCodes');
const statusMessages = require('../constants/statusMessages'); 
const mailText = require('../constants/mailText');
const config = require('../config/config').authentication;
const commentService = require('./comments');
const roleService = require('./roleServices');
const {setResponseWithError} = require('../util/common-response');

const register = async(res, user) => {
    try {
        let userCreated = await userService.save(user);
        let token;
        if(userCreated){
            mailServices(userCreated.email, mailText.REGISTERED_USER);
            token = _createToken(res, userCreated.id);
        }        
        return {
            token,
            userCreated
        }
    } catch (error) {
        return setResponseWithError(res, statusCodes.INTERNAL_SERVER_ERROR, error.message,'error');
    }
}

const login = async(res, email, password) => {
    try {
        let userFound = await userService.findByEmail(email);
        if(!userFound){
            return setResponseWithError(res, statusCodes.BAD_REQUEST, statusMessages.INVALID_AUTHENTICATION,'error');
        }

        const validPass =await bcrypt.compare(password, userFound.password);

        if(!validPass){
            return setResponseWithError(res, statusCodes.BAD_REQUEST, statusMessages.INVALID_AUTHENTICATION,'error');
        }

        const token = _createToken(res, userFound.id)
        
        return {
            token,
            userFound
        }

    } catch (err) {
        throw new Error(err.message)
    }
}

const _createToken = (res, id) => {
        try {
            return jwt.sign({ id }, config.secret_key, {expiresIn: config.ttl})
        } catch (error) {
            return setResponseWithError(res, statusCodes.FORBIDDEN, error.message,'error');
        }
}

const validToken = async (res, token) =>{
    try{
        const {id} = jwt.verify(token, config.secret_key)
        const userFound = await userService.findById(id);
        if(!userFound){
            return setResponseWithError(res, statusCodes.FORBIDDEN, statusMessages.INVALID_TOKEN,'error');
        }
        return userFound   
    }
    catch(err){
        throw new AppError(statusMessages.INVALID_TOKEN, statusCodes.BAD_REQUEST);
    } 
}

const validRoles = async ( user, ...roles) =>{
    const role = await roleService.getRoleById(user.roleId)
    if(!roles.includes(role.name)){
        throw new AppError(statusMessages.INVALID_ROLE, statusCodes.FORBIDDEN);
    }
    return true
}

const hasRole = async (user, ...roles) => {
    const role = await roleService.getRoleById(user.roleId);
    if(!roles.includes(role.name)){
        return false;
    }
    return true;
}

const validRoleOrOwnership = async (commentId, token, ...roles) => {
    try {
        const userFound = await validToken(res, token);
        if (!userFound) {
            throw new AppError(statusMessages.INVALID_TOKEN, statusCodes.FORBIDDEN);
        }
        const isOwner = await commentService.isOwner(commentId, userFound.id);
        const isRole = await hasRole(userFound, roles);
        if(isOwner || isRole){
            return true;
        }else{
            return false;
        }
    } catch (err) {
        throw new AppError(`${err.name}: ${err.message}`, statusCodes.FORBIDDEN);
    }

}


module.exports = {
    register,
    login,
    validToken,
    validRoles,
    validRoleOrOwnership
};