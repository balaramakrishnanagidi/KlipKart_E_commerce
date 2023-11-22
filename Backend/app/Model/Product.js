const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: String,
    price: Number,
    discount: Number,
    productImage: [
        {
            type: String,
            set: (icon) => {
                if (icon) {
                    return icon;
                }
                return undefined;
            },
        },
    ],
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', schema);
module.exports = Product;
