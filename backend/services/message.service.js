const dbMessages = require('../utils/db').messages;

module.exports = {
    create,
    getAllByUserId,
    getAllByUserIdAndLoggedInUser,
    deleteByCreationDate
};

function validateMessage(message) {
    const missingFields = [];
    if (!message.receiver) {
        missingFields.push('receiver');
    }
    if (!message.sender) {
        missingFields.push('sender');
    }
    if (!message.message) {
        missingFields.push('message');
    }
    if (!message.subject) {
        missingFields.push('subject');
    }

    if (missingFields.length > 0) {
        throw `Not all fields were filled, the following fields are missing: ${missingFields.toString()}.`;
    }
}

async function create(message) {

    validateMessage(message);

    dbMessages.push({ ...message, "creationDate": Date.now() });
}

async function getAllByUserId(targetUserId) {
    const sent = [];
    const received = [];

    dbMessages.forEach(message => {
        if (message.sender === targetUserId) {
            sent.push(message);
        }

        if (message.receiver === targetUserId) {
            received.push(message);
        }
    })

    return { sent, received };
}

async function getAllByUserIdAndLoggedInUser(targetUserId, loggedInUserId) {
    const sent = [];
    const received = [];

    dbMessages.forEach(message => {
        if (message.sender === targetUserId && message.receiver === loggedInUserId) {
            received.push(message);
        }

        if (message.receiver === targetUserId && message.sender === loggedInUserId) {
            sent.push(message);
        }
    })

    return { sent, received };
}

async function deleteByCreationDate(creationDate) {
    const index = dbMessages.findIndex(message => message.creationDate === parseInt(creationDate));
    if (index > -1) {
        dbMessages.splice(index, 1);
    }
    else {
        throw `Message with creation date = ${creationDate} was not found`;
    }
}