const mongoose = require('mongoose');

const schema = mongoose.Schema({
    banner: [
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

const banner = mongoose.model('banner', schema);
module.exports = banner;
