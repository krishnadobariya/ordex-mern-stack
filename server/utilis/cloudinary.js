const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
    cloud_name: 'dfdhqh7ak',
    api_key: '772112729847178',
    api_secret: 'WAUSnSuMfGVuXwosd66Z0frNeus',
});

module.exports = cloudinary;