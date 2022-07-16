const Sequielize=require('sequelize');

const sequelize=require('../util/database');

const Product=sequelize.define('product',{  //defining the table name and creaing the fields to it as SQL
  id:{
    type:Sequielize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  title: {type:Sequielize.STRING},
  price:{
    type:Sequielize.DOUBLE,
    allowNull:false
  },
  imageUrl:{
    type:Sequielize.STRING,
    allowNull:false
  },
  description:{
    type:Sequielize.STRING,
    allowNull:false
  }  
});

module.exports=Product;
