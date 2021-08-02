//Requiero express
const express = require('express');

const s3Service = require('../services/s3Service');
const fs = require('fs');
const util  = require('util');
const unlinkFile = util.promisify(fs.unlink);

const UserService = require('../services/userService');
const service = new UserService();
const {setResponseWithOk} = require('../util/common-response');
const statusCodes = require('../constants/statusCodes');
const statusMessages = require('../constants/statusMessages');

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const getAllUsers = async (req, res, next) =>{
    try{
        const users = await service.getAll();
        setResponseWithOk(res,statusCodes.OK,statusMessages.SUCCESS,'ok',users);
    }catch(err){
        next(err);
    }
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const getUser = async (req, res, next) =>{

    try{
        let { id } = req.params;
        const user = await service.findById(id);
        setResponseWithOk(res,statusCodes.OK,statusMessages.SUCCESS,'ok',user);
    }catch(err){
        next(err);
    }
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const createUser = async (req, res, next) => {

    try{
        let user = req.body;
        user = await service.save(user);
        setResponseWithOk(res,statusCodes.CREATED,statusMessages.SUCCESS_CREATE,'ok',user);
    }catch(err){
        next(err);
    }
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const updateUser = async (req, res, next) => {

    try{
        let { id } = req.params;
        let u = req.body;
        const userUpdated = await service.update(id, u);
        setResponseWithOk(res,statusCodes.OK,statusMessages.SUCCESS_UPDATE,'ok',userUpdated);
    }catch(err){
        next(err);
    }
}

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const deleteUser = async (req, res, next) => {

    try{
        let { id } = req.params;
        const user = await service.findById(id);
        await s3Service.deleteImage(user.photo);
        let userDeleted = await service.delete(id);
        setResponseWithOk(res,statusCodes.OK,statusMessages.SUCCESS_DELETE,'ok',userDeleted);
    }catch(err){
        next(err);
    }
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};