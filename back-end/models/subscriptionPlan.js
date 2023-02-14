const mongoose = require('mongoose');
const joi = require('joi');
const subscriptionPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },

  desc: {
    type: String,
    required: true
  },
  features: {
    type: [String],
    required: true 
  },
  spec : {
    size : {
      type: Number,
      },
      time : {
        type: Number,
      }
  },
  subscription_type: {
    type: String,
    enum: ['size', 'time'],
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    required: true
  }
});

const SubscriptionPlan = mongoose.model('subscriptionPlans', subscriptionPlanSchema);

exports.SubscriptionPlan = SubscriptionPlan;

exports.ValidateSubscriptionPlan = (subscriptionPlan) => {
  const schema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    desc: joi.string().required(),
    features: joi.array().required(),
    spec : joi.object({
      size : joi.number().optional(),
      time : joi.number().optional()
    }).required(),
    subscription_type: joi.string().valid('size', 'time').required(),
    status: joi.string().valid('active', 'inactive').required()
  });
  return schema.validate(subscriptionPlan,{abortEarly: false});
}
