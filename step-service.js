const store = require('./store.js');

module.exports.add = async (username, ts, update_id, stepCount) => {
    var stp = parseInt(stepCount);

    console.log(username, ts, update_id, stepCount);
    var s = await store.create({
        username: username,
        ts: ts,
        update_id: update_id,
        stepCount: stepCount
    });
    return s;
}

module.exports.get = async (username) => {

    // const user = await store.findOne({ username: username });

    var user = [
        {
            $match:
            {
                "username": username
            }
        },
        {
            $group:
            {
                _id: "$username",
                "cumulativeSteps": { $sum: "$stepCount" },
            }
        }
    ]
    return store.aggregate(user);
}