const {check,validationResult} = require('express-validator');

exports.validatePoductInsert =[
    check('name').notEmpty().withMessage('Product name is required')
]