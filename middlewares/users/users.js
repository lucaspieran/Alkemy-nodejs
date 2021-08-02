const { check, validationResult } = require('express-validator');
const UserService = require('../../services/userService');
const userService = new UserService();
const {setResponseWithError} = require('../../util/common-response');
const statusCodes = require('../../constants/statusCodes');
const statusMessages = require('../../constants/statusMessages');

const _idRequired = check('id').not().isEmpty();
const _idExist = check('id').custom(
    async (id = '') =>{
        const userFound = await userService.findById(id);
        if (!userFound){
            throw new Error(statusMessages.ID_DOESNT_EXISTS,statusCodes.NOT_FOUND);
        };
    }
);

const validResult = (req, res, next) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return setResponseWithError(res,statusCodes.NOT_FOUND,statusMessages.VALIDATION_ERRORS,'error',errors.errors)        
    }   
    next();
};

const patchRequestValidations = [
    _idRequired,
    _idExist,
    validResult
]; 

const deleteRequestValidations = [
    _idRequired,
    _idExist,
    validResult
];

module.exports = {
    patchRequestValidations,
    deleteRequestValidations
};