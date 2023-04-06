const router = require('express').Router();
const ProductServices = require('../Service/productService.js');
const ProductModel = require('../Models/productModel.js')

// ROTAS

// Rota para pegar lista de itens 
router.get('/product', async(req,res)=>{
    try { 
        const response = await ProductServices.findAll()
        if (response.length == 0) {
            return res.status(200).json({"text":"create the first product"})
        }  
        return res.send(response).status(200)
    } catch (err) {
        return res.status(500).json(error) 
    }
})

// Rota para pegar lista de itens usando o nome como parametro
router.get('/product/:name', async(req,res)=>{
    const name = req.params 
    try {
        const products = await ProductServices.findByName(name.name);
        if (products.length == 0){
            return res.status(404).json({"Error":"can't find an product with this name"})
        }
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json(error)
    }
})

// Rota para pegar lista de itens usando a categoria como parametro
router.get('/product/category/:category', async(req,res)=>{
    const category = req.params 
    try {
        const products = await ProductServices.findByCategory(category.category);
        if (products.length == 0){
            return res.status(404).json({"Error":"can't find an product with this name"})
        }
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json(error)
    }
})

// Rota para criação de produtos
router.post('/product/create', async(req, res)=>{
    // Criando o produto usando como base o Body recebido 
    try {
        const createProduct = await ProductModel.create(req.body)
        return res.status(201).json(createProduct) 
    } catch (error) {
        return res.status(500).json(error)
    }
});

router.delete('/product/delete/:id', async(req, res)=>{
    // Deletando produto pelo id passado nos UrlParams
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id);
        if (product === null) {
            return res.status(404).json({"error":"Product not found"})
        };
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json(error)
    }
});

router.patch('/product/update/:id', async(req, res)=>{
    try {
        // Atualizando o produto pelo _id usando como base o Body recebido 
        const updatedProduct = await ProductModel.updateOne(
            {_id: req.params.id},
            {
                $set: {
                    name: req.body.name,
                    value: req.body.value,
                    category: req.body.category,
                    amount: req.body.amount
                }
            }
        );
        return res.status(200).json(updatedProduct)
    } catch (error) {
        return res.status(500).json(error)
    }
});

module.exports = router;