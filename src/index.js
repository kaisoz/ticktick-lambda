var TickTask = require('ticktick/ticktask');
var TickTickApi = require('ticktick/ticktickapi');

exports.handler = async (event) => {

    let code = 200;
    let msg = "";

    try{
        let task = new TickTask(event);
        let ticktick = new TickTickApi(process.env.USER, process.env.PASSWORD);

        await ticktick.login();
        await ticktick.addTask(task);
        msg="Added task '" + task.title + "'";
    }catch(error){
        code = 500;
        msg = error;
    }

    return {
        statusCode: code,
        body: JSON.stringify(msg),
    };
};

