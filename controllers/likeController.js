const models = require("../models");
const jwtUtils = require("../utils/jwt.utils");
const asyncLib = require("async");


module.exports = {
    likePost: (req, res) => {
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        const messageId = parseInt(req.params.messageId);
        if (messageId <= 0)
            return res.status(400).json({"error": "invalid parameters"});

        asyncLib.waterfall([
            (done) => {
                models.Message.findOne({
                    where: {id: messageId}
                }).then((messageFound) => {
                    done(null, messageFound)
                }).catch((err) => {
                    return res.status(500).json({"error": "unable to verify message"});
                });
            },

            (messageFound, done) => {
                if (messageFound) {
                    models.User.findOne({
                        where: {id: userId}
                    }).then((userFound) => {
                        done(null, messageFound, userFound);
                    }).catch((err) => {
                        return res.status(500).json({"error": "post already liked"});
                    })
                } else {
                    res.status(404).json({"error": "post already liker"});
                }
            },

            (messageFound, userFound, done) => {
                if (userFound) {
                    models.Like.findOne({
                        where: {
                            userId: userId,
                            messageId: messageId
                        }
                    }).then((isUserAlreadyLiked) => {
                       done(null, messageFound, userFound, isUserAlreadyLiked);
                    }).catch((err) => {
                        return res.status(500).json({"error": "Unable to verify"})
                    })
                } else {
                    res.status(404).json({"error": "user not exist"});
                }
            },
            
            (messageFound, userFound, isUserAlreadyLiked, done) => {
                if (!isUserAlreadyLiked) {
                    messageFound.addUser(userFound)
                        .then((alreadyLikeFound) => {
                            done(null, messageFound, userFound, isUserAlreadyLiked);
                         })
                        .catch((err) => {
                            return res.status(500).json({"error": "error"});
                        })
                } else {
                    res.status(409).json({'error':"message already liked"})
                }
            },

            (messageFound, userFound, done) => {
                messageFound.update({
                    like: messageFound.like + 1,
                }).then(() => {
                    done(messageFound);
                }).catch((err) => {
                    res.status(500).json({"error": "Cannot update like"});
                });
            },
        ], () => {

        });
    },
    dislikePost: (req, res) => {

    }
};