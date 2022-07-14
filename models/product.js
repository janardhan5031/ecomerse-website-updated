const db=require('../util/database');

module.exports = class Product {
  constructor(id, title,size, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.size=size;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      'INSERT INTO products (title,price,imageUrl,description) VALUES (?,?,?,?)',
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static delete(prodId){
    return db.execute('DELETE FROM products WHERE products.id=?',
    [prodId]
    );
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id=?',[id]);
  }
};
