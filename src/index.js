var TickTask = require('ticktick/ticktask');
var TickTickApi = require('ticktick/ticktickapi');

var ticktick = new TickTickApi(process.env.USER, process.env.PASSWORD);

exports.handler = async (event) => {

    let code = 200;
    let msg = "";

    try{
        let task = new TickTask(event);

        if(!ticktick.isLogged()){
            await ticktick.login();
        }

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

