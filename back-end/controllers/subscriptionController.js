const {SubscriptionPlan , ValidateSubscriptionPlan} = require('../models/subscriptionPlan');
const NotFoundError = require('../errors/not-found-error');

exports.createPlan = async (req, res) => {
    const {error} = ValidateSubscriptionPlan(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    const {name} = req.body;

    const planExists = await SubscriptionPlan.findOne({name});
    if (planExists) {
        return res.status(400).json({ error: 'Plan already exists' });
    }
    const plan = new SubscriptionPlan(req.body);
    await plan.save();
    res.status(201).send({ data: { plan } });
}

exports.updatePlan = async (req, res) => {
    const plan = await SubscriptionPlan.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!plan) {
        throw new NotFoundError();
    }
    res.status(200).send({ data: { plan } });
}

exports.deletePlan = async (req, res) => {
    const plan = await SubscriptionPlan.findByIdAndDelete(req.params.id);
    if (!plan) {
        throw new NotFoundError();
    }
    res.status(200).send({ data: { plan } });
}

exports.getPlans = async (req, res) => {
    const plans = await SubscriptionPlan.find();
    if(!plans) {
        throw new NotFoundError();
    }
    res.status(200).send({ data: { plans } });
}
exports.getPlan = async (req, res) => {
    const plan = await SubscriptionPlan.findById(req.params.id);
    if(!plan) {
        throw new NotFoundError();
    }
    res.status(200).send({ data: { plan } });
}
// approve plan for specific user and update the subscription status
exports.approvePlanForUser = async (req, res) => {
    const plan = await SubscriptionPlan.findById(req.params.id);
    if(!plan) {
        throw new NotFoundError();
    }
    const user = await User.findById(req.params.userId);
    if(!user) {
        throw new NotFoundError();
    }
    if(user.role!== 'admin') {
        throw new NotFoundError();
    }
    plan.status = 'approved';
    await plan.save();
    res.status(200).send({ data: { plan } });
}



