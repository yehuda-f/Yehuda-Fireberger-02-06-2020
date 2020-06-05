const express = require('express');

const messageService = require('../../services/message.service');
const jwt = require('../../utils/jwt');

const router = express.Router();

router.post('/write', create);
router.get('/:id', getAllByUserId);
router.get('/mine/:id', jwt(), getAllByUserIdAndLoggedInUser);
router.delete('/:creationDate', deleteByCreationDate)

function create(req, res, next) {
    messageService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAllByUserId(req, res, next) {
    messageService.getAllByUserId(req.params.id)
        .then(messages => res.json(messages))
        .catch(err => next(err));
}

function getAllByUserIdAndLoggedInUser(req, res, next) {
    messageService.getAllByUserIdAndLoggedInUser(req.params.id, req.userId)
        .then(messages => res.json(messages))
        .catch(err => next(err));
}


function deleteByCreationDate(req, res, next) {
    messageService.deleteByCreationDate(req.params.creationDate)
        .then(() => res.json({}))
        .catch(err => next(err));
}

module.exports = router;