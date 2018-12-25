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


    async login() 
    {
        let response = null;
        let url = this.base_api + "/user/signon?wc=true&remember=true";
        let request_data = build_request_data(url, this.base_data, 
            {
                username: this.user,
                password: this.pass
            }
        );

        try{
            response = await do_async_request(request_data);
        }catch(error){
            throw "Could not login";
        }
        
        if(!response || response.username !== this.user){
            throw "Invalid response";
        }
    }

    async addTask(task)
    {
        let response = null;
        let url = this.base_api + "/task";
        let request_data = build_request_data(url, this.base_data, task);

        try{
            response = await do_async_request(request_data);
        }catch(error){
            throw "Error adding a task";
        }
    }
}

module.exports = TickTickApi;


