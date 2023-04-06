const {db, mongoose} = require('../DataBase/MongoConnect');

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful!");
});

var ProductSchema = mongoose.Schema({
  name: String,
  value: Number,
  category: String,
  image: String,
});

const ProductModel = mongoose.model("model", ProductSchema, "products");

class ProductServices {
    static async findAll() {
        return await ProductModel.find()
    };

    static async findByName(name){
        try {
            // Verifica se o parametro name foi passado 
            if (!name){
                return res.status(500).json({"error":"Missing product name."})
            }
            // Busca uma lista de produtos com o mesmo nome
            const response = await ProductModel.find({"name":name})
            return response
        } catch (error) {
            return res.status(500).json(error)
        }
    };
    
    static async findByCategory(category){
        try {
            // Verifica se o parametro category foi passado 
            if (!category){
                return res.status(500).json({"error":"Missing product name."})
            }
            // Busca uma lista de produtos com a mesma categoria
            const response = await ProductModel.find({"category":category})
            return response
        } catch (error) {
            return res.status(500).json(error)
        }
    };
}

module.exports = ProductServices