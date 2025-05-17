const {check} = require('express-validator');

exports.cardDetailsValidationRules = [
    check('userId').trim().notEmpty().isMongoId().withMessage('Invalid userId.'),
    check('eventId').trim().notEmpty().isMongoId().withMessage('Invalid eventId.'),
]

