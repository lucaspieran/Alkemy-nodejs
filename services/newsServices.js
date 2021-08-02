const { News } = require('../models');

const getNews = () => News.findAll({ attributes: ['name', 'image', 'content', 'categoryId'] });

const getWithPagination = async (currentPage) => {
    let response = {};
    const limit = 10;
    const offset = (currentPage - 1) * limit;
    const news = await News.findAndCountAll({
        limit,
        offset,
        attributes: ['name', 'image', 'content', 'categoryId'] 
    });
    const totalPages = await parseInt(Math.ceil(news.count / limit));
    response.news = news.rows;
   if (currentPage !== 1) {
    response.prevPage = `/categories?page=${parseInt(currentPage) - 1}`;
   }
   if (currentPage < totalPages) {
    response.nextPage = `/categories?page=${parseInt(currentPage) + 1}`;
   }
  return response;

}
const getNewsbyId = id => News.findOne( {where: {id} , attributes: ['name', 'image', 'content', 'categoryId']});

const post = newNews => News.create(newNews);

const deleteNewsService = id => News.destroy({ where: { id } });

const exists = id => News.findByPk(id);

const update = (body, id) => News.update(body, { where: { id } });

module.exports = {
    getNews,
    getWithPagination,
    getNewsbyId,
    post,
    deleteNewsService,
    exists,
    update
}