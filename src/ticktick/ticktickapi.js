var request = require('request').defaults({'jar': true});

function do_async_request(data)
{
    return new Promise((resolve, reject) => {
        request(data, (error, response, body) => {
            if(error || response.statusCode != 200) {
                reject(error);
            }else{
                resolve(body);
            }
        })
    })
}

function build_request_data(url, base_data, data)
{
    let request_data = {...base_data};
    request_data.url = url;
    request_data.json = data;

    return request_data;
}

class TickTickApi
{
    constructor(user, pass)
    {
        this.user = user;
        this.pass = pass;
        this.logged = false;
        this.base_url = "https://ticktick.com";
        this.base_api = this.base_url + "/api/v2";
        this.base_data = {
            method: "POST",
            url: "",
            headers: {
                "Content-Type": "application/json",
                Origin: this.base_url
            }
        };
    }

    isLogged() {
        return this.logged;
    }

    async login() 
    {
        if(this.logged){
            console.log("* Already logged");
            return;
        }

        let response = null;
        let url = this.base_api + "/user/signon?wc=true&remember=true";
        let request_data = build_request_data(url, this.base_data, 
            {
                username: this.user,
                password: this.pass
            }
        );

        try{
            console.log("* Logging in to TickTick...");
            response = await do_async_request(request_data);
        }catch(error){
            throw "Error logging in to TickTick";
        }
        
        if(!response || response.username !== this.user){
            throw "Invalid login response received";
        }

        this.logged = true;
        console.log("* Login successful");
    }

    async addTask(task)
    {
        let response = null;
        let url = this.base_api + "/task";
        let request_data = build_request_data(url, this.base_data, task);

        try{
            response = await do_async_request(request_data);
            console.log("* Added task '" + task.title + "'");
        }catch(error){
            throw "Error adding task";
        }
    }
}

module.exports = TickTickApi;


