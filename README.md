# TickTick-Lambda

Since there's no public REST API to interact with TickTick, I'm writing my own in NodeJs.
So far it only consists of one Lambda function that allows you to add tasks.


##   Prerequisites

- At the moment, you need to have your lambda function already created in AWS for the NodeJs 8.10 runtime.
- [AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) is required to publish the function.


- You'll need **Mocha** command available to run the tests. For this:


```bash
npm install -g mocha
```

## Running the tests

Just go to the **src/** folder and run

```bash
npm test
```

## Deployment

You can pass the function name as an argument to the **publish.sh** script

```bash
./publish.sh ticktick-lambda
```

or just modify the *FUNC_NAME* variable of the **publish.sh** script

```bash
FUNC_NAME=ticktick-lambda
```

and then run the script without arguments

```bash
./publish.sh
```

## API

The function accepts a TickTick task definition in JSON. Currently these are all known task parameters:

| Field name   	| Field meaning                                                                      	|
|--------------	|------------------------------------------------------------------------------------	|
| title        	| Task title                                                                         	|
| content      	| Task body                                                                          	|
| status       	| 0 - open<br>2 - completed                                                          	|
| priority     	| 0 - None<br>1 - Low<br>2 - Medium low<br>3 - Medium<br>4 - Medium high<br>5 - High 	|
| isAllDay     	| If true, the task lasts the whole day                                              	|
| timeZone     	| Timezone used for dates                                                            	|
| startDate    	| When does the task start                                                           	|
| modifiedDate 	| Last time the task was modified                                                    	|
| dueDate      	| Task due date                                                                      	|


Since the dates are parsed using the moment library, they can be expressed in ISO 8601 formats and RFC 2822 Date time format. If the format is not known, moment falls back to new Date(string).

