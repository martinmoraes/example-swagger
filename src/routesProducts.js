const { Router } = require('express');
const  { v4 } = require ('uuid');

const routerProducts = Router();
const products = [];

routerProducts.get('/products', (req, res)=>{
    return res.json(products);
})

routerProducts.get('/products/:id', (req, res) => {
    const  { id } = req.params;
    const result = products.find(product => product.id === id)
    
    return res.json(result);
})

routerProducts.post('/products', (req, res) => {
    const { name, description, price } = req.body;
    const result = { id: v4(), name, description, price } 
    products.push( result );
    return res.json(result)
})

routerProducts.put('/procucts/:id', (req, res)=>{
    const  { id } = req.params;
    const { name, description, price } = req.body;
    const productIndex = products.findIndex(product => {
        product.id === id;
    }) 

    if(productIndex === -1){
        return res.status(400).json({message: "Product doesn't exists!"});
    }

    products[productIndex] = { id, name, description, price };

    return res.json(products[productIndex]);
})

module.exports = { routerProducts }