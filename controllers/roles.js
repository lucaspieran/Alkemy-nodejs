const roleServices = require('../services/roleServices');
const {setResponseWithOk } = require('../util/common-response');
const statusCodes = require('../constants/statusCodes');
const statusMessages = require('../constants/statusMessages');


const getAllRoles = async(req, res, next)=> {
    try {
        const roles = await roleServices.getAllRoles();
        setResponseWithOk(res, statusCodes.OK, statusMessages.SUCCESS, 'ok' , roles)
    } catch (error) {
        next(error)
    }
}

const getRoleById = async(req, res, next)=> {
    try {
        const role = await roleServices.getRoleById(req.params.id)
        setResponseWithOk(res, statusCodes.OK, statusMessages.SUCCESS, 'ok', role)
    } catch (error) {
        next(error)
    }
}

const createRole = async(req, res, next)=> {
    try {
        const roleCreated = await roleServices.createRole(req.body)
        setResponseWithOk(res, statusCodes.CREATED, statusMessages.SUCCESS_CREATE, 'ok', roleCreated)
    } catch (error) {
        next(error)
    }
}

const updateRole = async(req, res, next)=> {
    try {
        const roleUpdated = await roleServices.updateRole(req.params.id, req.body)
        setResponseWithOk(res, statusCodes.OK, statusMessages.SUCCESS_UPDATE, 'ok', roleUpdated)
    } catch (error) {
        next(error)
    }
}

const deleteRole = async(req, res, next)=> {
    try {
        
        const roleDeleted = await roleServices.deleteRole(req.params.id)
        console.log(roleDeleted);
        setResponseWithOk(res, statusCodes.OK, statusMessages.SUCCESS_DELETE, 'ok', roleDeleted)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
}