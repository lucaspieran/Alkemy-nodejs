const {setResponseWithError} = require('../../util/common-response');
const AppError = require('../../errors/appError');
const { check , validationResult } = require('express-validator');
const UserService = require('../../services/userService');
const userService = new UserService();
const {validToken, validRoles, validRoleOrOwnership} = require('../../services/authService');
const statusCodes = require('../../constants/statusCodes');
const statusMessages = require('../../constants/statusMessages');
const roleService = require('../../services/roleServices');

const _nameRequired = check('firstName', statusMessages.NAME_REQUIRED).not().isEmpty();
const _nameType = check('firstName', statusMessages.INVALID_NAME_REGISTER).isAlpha()
const _lastNameRequired = check('lastName', statusMessages.LAST_NAME_REQUIRED).not().isEmpty();
const _lastNameType = check('lastName', statusMessages.INVALID_LASTNAME_REGISTER).isAlpha()
const _emailExist = check('email').custom(
    async (email = '') => {
        const userFound = await userService.findByEmail(email);
        if(userFound){
            throw new Error(statusMessages.EMAIL_EXISTS, statusCodes.BAD_REQUEST);
        }
    }
);
const _emailRequired = check('email', statusMessages.EMAIL_REQUIRED).not().isEmpty();
const _emailValid = check('email', statusMessages.EMAIL_INVALID).isEmail();
const _passwordRequired = check('password', statusMessages.PASSWORD_REQUIRED).not().isEmpty();
const _roleExist = check('roleId').custom(
    async (roleId = "") =>{
        const roleFound = await roleService.getRoleById(roleId);
        if(!roleFound){
            throw new Error(statusMessages.INVALID_ROLE_AUTH, statusCodes.BAD_REQUEST)
        }
    }
)

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

const validJWT = async(req, res, next) =>{
    try {
        const token = req.header('Authorization'); 
        const user = await validToken(res, token);
        req.user = user; 
        next();          
    } catch (err) {      
        next(err)
    }
}

const hasUserOwnership = async(req, res, next) =>{
    try {
        if(+req.params.id === req.user.id){
            next();          
        }else{
            return setResponseWithError(res,statusCodes.UNAUTHORIZED,statusMessages.INVALID_ID,'error');
        }
    }catch (err) {      
        next(err)
    }
}

const hasRole = (...roles) => {
    return async (req, res, next) => {
        try {
            await validRoles(req.user, ...roles);
            next()
        } catch (error) {
            setResponseWithError(res, error.status, error.message,'error');
        }
    }
}
    
const hasRoleOrOwnership = async (req, res, next) => {
    try {
        const commentId = req.params.id;
        const reqToken = req.header('Authorization'); 
        const response = await validRoleOrOwnership(commentId, reqToken, 'Admin');
        if(response)
            next();
        else
            return setResponseWithError(res, statusCodes.BAD_REQUEST, statusMessages.VALIDATION_ERRORS,'error');
    } catch (error) {
        next(error);
    }
}


const postRegisterRequestValidations = [
    _nameRequired,
    _nameType,
    _lastNameType,
    _lastNameRequired,
    _emailRequired,
    _emailValid,
    _emailExist,
    _passwordRequired,
    _roleExist,
    validResult
]


const postLoginRequestValidations = [
    _emailRequired,
    _emailValid,
    _passwordRequired,
    validResult
]


module.exports = {
    postRegisterRequestValidations,
    postLoginRequestValidations,
    validJWT,
    hasRole,
    hasRoleOrOwnership,
    hasUserOwnership
};