const {
  Model,
  DataTypes,
  Op,
} = require('sequelize');
const { sequelize } = require('../core/db');
const { keywords } = require('./keywords');

class Article extends Model {
  static async getArticles(list, page) {
    let ids = [];
    for (let i = page * 5; i < page * 5 + 5; i++) {
      ids.push(list[i].arcid);
    }
    let articles = Article.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
    return articles;
  }

  static async getArticleByid(id) {
    let article = await Article.findOne({
      where: {
        id,
      },
    });
    return article;
  }

  static async getIdsByKey(key) {
    let ids = await keywords.getIdByKey(key);
    return ids;
  }

  static async updateArticle({ id, title, conclude, link, magazine}) { // eslint-disable-line
    await Article.update({ title, conclude, link, magazine }, { // eslint-disable-line
      where: { id },
    });
  }

  static async deleteArticle({ id }) {
    await Article.destroy({
      where: {
        id,
      },
    });
  }
}
Article.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  year: DataTypes.INTEGER,
  conclude: DataTypes.STRING,
  link: DataTypes.STRING,
  magazine: DataTypes.STRING,
}, {
  sequelize,
  tableName: 'article',
});

module.exports = {
  Article,
};