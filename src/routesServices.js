const { Router } = require('express');
const  { v4 } = require ('uuid');

const routerServices = Router();
const services = [];

routerServices.get('/services', (req, res)=>{
    return res.json(services);
})

routerServices.get('/services/:id', (req, res) => {
    const  { id } = req.params;
    const result = services.find(product => product.id === id)
    
    return res.json(result);
})

routerServices.post('/services', (req, res) => {
    const { name, description, price } = req.body;
    const result = { id: v4(), name, description, price } 
    services.push( result );
    return res.json(result)
})

routerServices.put('/procucts/:id', (req, res)=>{
    const  { id } = req.params;
    const { name, description, price } = req.body;
    const productIndex = services.findIndex(product => {
        product.id === id;
    }) 

    if(productIndex === -1){
        return res.status(400).json({message: "Product doesn't exists!"});
    }

    services[productIndex] = { id, name, description, price };

    return res.json(services[productIndex]);
})

module.exports = { routerServices }