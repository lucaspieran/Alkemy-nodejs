const {setResponseWithError} = require('../../util/common-response');
const statusCodes = require('../../constants/statusCodes');
const statusMessages = require('../../constants/statusMessages');

const createTestimonialValidation  = (req, res, next) => {
        try {
            if(!req.body.name){
                setResponseWithError(res,statusCodes.BAD_REQUEST,statusMessages.TESTIMONIAL_NAME_REQUIRED);
            }  else if(!req.body.content){
                setResponseWithError(res,statusCodes.BAD_REQUEST,statusMessages.TESTIMONIAL_CONTENT_REQUIRED);
            } else{
                next();
            }
            
        } catch (error) {
            next(error);
        }
    

    }
module.exports = {
    createTestimonialValidation  
}