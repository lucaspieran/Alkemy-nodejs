const testimonialServices = require('../services/testimonialServices');
const {setResponseWithOk} = require('../util/common-response');
const statusCodes = require('../constants/statusCodes');
const statusMessages = require('../constants/statusMessages');
const s3Service = require('../services/s3Service');
const fs = require('fs');
const util  = require('util');
const unlinkFile = util.promisify(fs.unlink);

const paginationTestimonials = async(req, res, next)=> {
    const { page } = req.query;
    const limit = 10;
    let previousPage ;
    let nextPage ;
    
    try {
        const testimonials = await testimonialServices.paginationTestimonials(page,limit);

        const totalPages = parseInt(testimonials.count / limit);

        const content= testimonials.rows;

        if(page > 0 ){
          previousPage =  `testimonials?page=${parseInt(page) - 1}`;
        }

        if(page < totalPages){
            nextPage =`testimonials?page=${parseInt(page) + 1}`;
        }
        
        setResponseWithOk(res,statusCodes.OK,statusMessages.SUCCESS,'ok',{content, totalPages, nextPage, previousPage});
    } catch (error) {

        next(error)
    }
}

const createTestimonial = async (req,res,next)=>{
    try {
        const testimonial = req.body;
        const file = req.file;
        const result = await s3Service.uploadFile(file);
        await unlinkFile(file.path);
        testimonial.image = result.key;
        const testimonials = await testimonialServices.createTestimonial(testimonial);
        setResponseWithOk(res,statusCodes.CREATED,statusMessages.SUCCESS_CREATE,'ok',testimonials);
        
    } catch (error) {
        next(error);
    }

}

const updateTestimonial = async (req, res, next)=>{
    try {
    const exists = await testimonialServices.existsTestimonial(req.params.id);
      if (!exists) {
        setResponseWithError(res,statusCodes.NOT_FOUND,statusMessages.INVALID_ID,'error',exists);
      }
    const updateTestimonial = await testimonialServices.updateTestimonial(req.params.id,req.body);
    setResponseWithOk(res,statusCodes.OK,statusMessages.SUCCESS_UPDATE,'ok',updateTestimonial);
    } catch (error) {
        next(error);
    }

}
const deleteTestimonial = async (req, res, next)=>{
    const{id}=req.params
    try {
        const exists = await testimonialServices.existsTestimonial(req.params.id);
        if (!exists) {
            setResponseWithError(res,statusCodes.NOT_FOUND,statusMessages.INVALID_ID,'error',exists);
        }
        await s3Service.deleteImage(category.image);
        await testimonialServices.deleteTestimonial(id);
        setResponseWithOk(res,statusCodes.OK,statusMessages.SUCCESS_DELETE,'ok',message);
      } catch (error) {
        next(error);
      }

}



module.exports = {
    paginationTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial   
}