const express = require('express');
const { routerProducts } = require('./routesProducts');
const { routerServices } = require('./routesServices');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocsJSON = require('./documentation/products.json');

const swaggerDocsYAML = YAML.load('./src/documentation/products.yaml')

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocsJSON));

app.get('/terms', (req, res)=>{
    return res.json({
        message: 'Termos de Serviço',
    });
})

app.use(routerProducts);
app.use(routerServices);

app.listen(3000, ()=> console.log('Server is running on port 3000'));