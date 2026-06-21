const Joi = require('joi');
const foodItems = require('./models/menu');

module.exports.menuSchema = Joi.object({
  foodItems : Joi.object({
    name: Joi.string()
    .min(2)                   
    .max(50)                 
    .required()             
    .messages({
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 50 characters',
      'any.required': 'Name is required',
    }),

  price: Joi.number()
    .positive().min(0).required()               
    .messages({
      'number.positive': 'Price must be greater than 0',
      'any.required': 'Price is required',
    }),

  description: Joi.string()
    .min(10)
    .max(200)
    // .required()
    .messages({
      'string.min': 'Description must be at least 10 characters',
      'any.required': 'Description is required',
    }),
  image: Joi.string().required(),
  
  }).required() ,
  category: Joi.string()
    .required()
    .messages({
      'any.required': 'Category is required',
    }),
    
});


// const validateImage = (req, res, next) => {

//   if (!req.file) {
//     return res.status(400).json({ errors: ['Image is required'] });
//   }


//   const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//   if (!allowedTypes.includes(req.file.mimetype)) {
//     return res.status(400).json({ errors: ['Only JPG or PNG  allowed'] });
//   }

//   if (req.file.size > 2 * 1024 * 1024) {
//     return res.status(400).json({ errors: ['Image must be less than 2MB'] });
//   }

//   next(); // image is valid — move to route handler
// };

// module.exports = {  validateImage };