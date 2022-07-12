const fs=require('fs');
const path=require('path');

const p=path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports= class Cart{
    static addProduct(id,productSize,productPrice){
        //fetch the previous cart
        fs.readFile(p,(err,fileContent) => {
            let cart = { products: [], totalPrice: 0};
            if(!err){
                cart=JSON.parse(fileContent);
            }
             //analyze the cat=> find existing product
            const existingProductIndex=cart.products.findIndex((prod)=> {
               return (prod.id===id && prod.size===productSize);
            });

            const existingProduct=cart.products[existingProductIndex];
            
            let updatedProduct;
            // add new product/ increase quantity   
            if(existingProduct){    
                //if there is an existingProduct then replace that product index with updated product 

                updatedProduct={...existingProduct};
                updatedProduct.qty+=1;                      
                //and increasing the count
                cart.products=[...cart.products];
                cart.products[existingProductIndex]=updatedProduct;
            }else{
                const size=productSize;
                updatedProduct={ id:id,size:size,qty:1};      //else adding new product as well as existing products too to the cart
                cart.products=[...cart.products,updatedProduct];
            }
            cart.totalPrice=cart.totalPrice+ +productPrice;
            fs.writeFile(p,JSON.stringify(cart), err=> {
                console.log(err);
            });
        });
    }
}
