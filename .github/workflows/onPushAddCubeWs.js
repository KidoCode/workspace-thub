const fs = require('fs');
const axios = require("axios");

function stop(e) {
    console.log(e);
    process.exit(0);
}

const run = async () => {
    const cube = JSON.parse(fs.readFileSync(process.env.cube, 'utf8')).commits[0].message.split(".")[0];
    const userInfo = JSON.parse(fs.readFileSync(`.cubie/cube.json`, 'utf8')).user;
    console.log("cube name: ", cube);
    console.log("username: ", userInfo.username);
    try {
        let r1 = await axios.post(
            'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/kportal-grmuv/service/kportalWeb/incoming_webhook/addCube?secret=secret',
            {
                "username": userInfo.username,
                "repo": cube
            }
        );
        if(r1.data.result){
            setTimeout(async () => {
                let r2 = await axios.post(
                    'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/kportal-grmuv/service/kportalWeb/incoming_webhook/createChubCubeFile?secret=secret',
                    {
                        "username": userInfo.username,
                        "repo": cube
                    }
                );
                console.log(r2.data.result);
            }, 6000)
        }
    } catch (e) {
        stop(e)
    }
}

run();
