const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const id=null;
  const title = req.body.title;
  const size=req.body.size;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(id,title,size, imageUrl, description, price);
  product.save()
  .then(()=>{
    res.redirect('/');
  })
  .catch(err =>console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  if(!editMode) {
    return res.redirect('/');
  }
  const prodId=req.params.productId;
  Product.findById(prodId,product =>{
    if(!product){
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode ,
      product:product
    });
  });
};

exports.postEditProduct= (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  );
  updatedProduct.save()
    .then(()=>{
      res.redirect('/admin/products');
    })
    .catch(err =>console.log(err));
 
};


exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([products])=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err =>console.log(err));
};

exports.deleteproductbyID= (req, res, next) => {
  const id=req.body.productId;
  Product.delete(id).
  then(()=>{
    res.redirect('/admin/products');
  })
  .catch(err =>console.log(err));
  
};