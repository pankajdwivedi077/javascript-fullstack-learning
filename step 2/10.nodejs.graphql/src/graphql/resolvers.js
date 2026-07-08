

const products = require("../data/products");

const resolvers = {
    Query: {
        products:()=> products,
        product: (_, { id }) => products.find(item => item.id === id),
    },
    Mutation: {
        createProduct: (_, {title, category, price, inStock}) => {
            const newCreatedProducts = {
                id: String(products.length + 1),
                title,
                category,
                price,
                inStock
            }
            products.push(newCreatedProducts)
            return newCreatedProducts
        },
        deleteProduct: (_, { id }) => {
            const index = products.findIndex(product => product.id === id);
            if(index === -1) return false;

            products.splice(index, 1);
            return true;
        },
        updateProduct: (_, { id, ...updates }) => {
           const index = products.findIndex(product => product.id === id);
            if(index === -1) return null;  
            
            const updatedProducts = {

                ...products[index], ...updates
            }
            products[index] = updatedProducts;
            return updatedProducts;
        }
    }
}

module.exports = resolvers;