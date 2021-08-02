const { check, validationResult } = require('express-validator');
const statusCodes = require('../../constants/statusCodes');
const statusMessages = require('../../constants/statusMessages');
const roleService = require('../../services/roleServices');
const {setResponseWithError} = require('../../util/common-response')

const _idRequired = check('id').not().isEmpty();
const _idExist = check('id').custom(
    async (id = '') =>{
        const userFound = await roleService.getRoleById(id);
        if (!userFound){
            throw new Error(statusMessages.INVALID_ID, statusCodes.BAD_REQUEST);
        };
    }
);

const validResult = (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return setResponseWithError(res, statusCodes.BAD_REQUEST, statusMessages.VALIDATION_ERRORS,'error', errors.errors);
        }
        next()
    } catch (error) {
        next(error)
    }
};

requestValidations = [
    _idRequired,
    _idExist,
    validResult
]

module.exports = requestValidations