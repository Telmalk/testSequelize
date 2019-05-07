const model = require("../models");
// Example Relation query With Sequelize

const test = (res, req) => {
    const fields = req.query.fields;
    const litmit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    const order = req.query.order;

    model.Message.findAll({
        order: [(order != null) ? order.split(':') : ['title', 'ASC']],
        attributes: (fields !== '*' && fields != null) ? fields.split(",") : null,
        limit: (!isNaN(litmit)) ? litmit : null,
        offset: (!isNaN(offset) )? offset : null,
        // include relation
        include: [{
            model: model.User,
            attributes: ['username', 'email']
        }]
    }).then((message) => {
        if (message)
            res.status.json(message);
    }).catch((err) => {
        res.status(500).json({"error": "Invalid fields"});
    });
};