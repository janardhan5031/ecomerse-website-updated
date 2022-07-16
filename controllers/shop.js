const cart = require('../models/cart');
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then((rows)=>{
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err=>console.log(err));
};

exports.getProduct=(req,res,next)=>{
  const prodId=req.params.productId;
  Product.findAll({where:{id:prodId} })  //finding the single product with id using where clause
  .then((products)=>{   //it will return array of elements those matches
    res.render('shop/product-detail',{
      product:products[0],
      pageTitle:'product details',
      path:'/'
    }); 
  })
  .catch(err=>console.log(err));

  //another method
 /* Product.findById(prodId)
    .then((product)=>{      //here destructuring the resultant array to store the data array using '[]'
      //console.log(product);
      res.render('shop/product-detail',{
        product:product,
        pageTitle:'product details',
        path:'/'
      });   // redirecting to home page for confirmation
    })
    .catch(err=>console.log(err));
    */
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(products=>{
    res.render('shop/index',{
      prods:products,
      pageTitle:'shop',
      path:'/'
    });
  })
  .catch(err =>console.log(err));
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postcart=(req, res, next) => {
  const prodId=req.body.productId;
  const size=req.body.size;
  console.log(size);
  Product.findById(prodId, (product)=>{
    //storing data in cart model file using cart class we defined
    cart.addProduct(prodId, size,product.price);
  });
  res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
