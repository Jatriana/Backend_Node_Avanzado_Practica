'use strict'

const multer = require('multer')
const path = require('path')

// SET storage 

var storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null,'./public/images/anuncios')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-'+ file.originalname)
    }

})

module.exports = storage