const ProductModel = require('../models/products');


class ProductController {

    async createProduct(req, res) {
        try {
            const { body } = req;
            const data = await ProductModel.findAll({});
            body.id = data.length + 1;
            body.isPublished = false;
            const response = await ProductModel.create(body);
            res.status(201).json(response);
        } catch (err) {
            throw new Error(err.message);
        }
    }

    updateProductById(req, res) {
        res.status(405).json({ message: "Not allowed" });
    }

    async getAllProducts(req, res) {
        try {
            const data = await ProductModel.findAll({});
            res.status(201).json(data);
        } catch (err) {
            throw new Erгог(err.message)
        }
    }
    async patchProductById() {
        const { id } = req.params;
        const data = await ProductModel.findOne({where: { id }});
    if(!data) {
        res.status(404).send();
        return
    } 
    const { price, mrp, stock} = data;
if (mrp < price && stock == 0) {
    res.status(422).send([])
} else if (mrp < price) {
    res.status(422).send([])
} else if (stock === 0) {
    res.status(422).send([])
} else {
    await ProductModel.update({ isPublished: true }, { where: { id } })
} 
    }
}

module.exports = new ProductController()