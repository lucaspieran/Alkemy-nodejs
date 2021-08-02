const db = require('../models');

const paginationTestimonials = async (page,limit) => {   

    return await db.Testimonial.findAndCountAll({
        limit:limit,
        offset: page * limit
    });
    
}

const createTestimonial = async(testimonial)=>{
  
    return await db.Testimonial.create(testimonial);
 
}
const updateTestimonial = async(id, testimonial)=>{
  
    return await db.Testimonial.update(testimonial, {
        where: {
          id
        }
      });

}
const deleteTestimonial = async(id)=>{
    
    return await db.Testimonial.destroy( {
        where: {
          id
        }
      });

}

const existsTestimonial = async (id) => {
  try {
    const count = await db.Testimonial.count({
      where: {id}
    });
    if (count === 0){
      return false; //there is no register
    }
    else{
      return true; //there is a register with the specified id
    }
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
    paginationTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    existsTestimonial
}
