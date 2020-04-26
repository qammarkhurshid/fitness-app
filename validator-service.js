module.exports.validate = (message) => {
    console.log('in validator', message);

    if (message.newSteps == undefined || message.newSteps == null || message.newSteps == '') {
        return false;
    } else if (message.username == undefined || message.username == null || message.username == '') {
        return false;
    }
    else if (message.ts == undefined || message.ts == null || message.ts == '') {
        return false;
    }
    else if (message.update_id == undefined || message.update_id == null || message.update_id == '') {
        return false;
    } else {
        return true;
    }
}