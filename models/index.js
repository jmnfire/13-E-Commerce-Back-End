// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

// Categories have many Products

// Products belongToMany Tags (through ProductTag)

// Tags belongToMany Products (through ProductTag)
Product.belongsTo(Category, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Tag,
    foreignKey: 'category_id',
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'product_category'
});

Category.belongsToMany(Product, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Tag,
    foreignKey: 'category_id',
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'category_product'
});

Product.belongsToMany(Tag, {
  // Define the third table needed to store the foreign keys
  through: {
    model: ProductTag,
    foreignKey: 'product_id',
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'products_tag'
});

Tag.belongsToMany(Product, {
  // Define the third table needed to store the foreign keys
  through: {
    model: ProductTag,
    foreignKey: 'tag_id',
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'tags_product'
});
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
