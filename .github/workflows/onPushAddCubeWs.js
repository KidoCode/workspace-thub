const fs = require('fs');
const axios = require("axios");

function stop(e) {
    console.log(e);
    process.exit(0);
}

const run = async () => {
    const cube = fs.readFileSync(`../../cubes/now`, 'utf8');
    const userInfo = JSON.parse(fs.readFileSync(`../../.cubie/cube.json`, 'utf8')).user;
    console.log("cube name: ", cube);
    console.log("username: ", userInfo.username);
    try {
        await axios.post(
            'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/kportal-grmuv/service/kportalWeb/incoming_webhook/addCube?secret=secret',
            {
                "username": userInfo.username,
                "repo": cube
            }
        );
    } catch (e) {
        stop(e)
    }
}

run();
