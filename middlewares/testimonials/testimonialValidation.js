const db = require('../../models');
const {setResponseWithError} = require('../../util/common-response');
const statusCodes = require('../../constants/statusCodes');
const statusMessages = require('../../constants/statusMessages');
const testimonialValidation =  async (req,res,next)=>{
try {
    const testimonial = await db.Testimonial.findByPk(req.params.id);

    if (!testimonial){
        setResponseWithError(res,statusCodes.NOT_FOUND,statusMessages.ID_DOESNT_EXISTS)
    };
    next(); 
} catch (error) {
    next(error)
}
   
}

module.exports = {
    testimonialValidation  
}