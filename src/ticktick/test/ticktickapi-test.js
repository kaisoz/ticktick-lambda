var expect = require('chai').expect;
var assert = require('chai').assert;
var sinon = require('sinon');
var rewire = require('rewire');

var TickTask = require('../ticktask');
var TickTickApi = rewire('../ticktickapi');

describe('login', () => {

    var do_async_request_stub = null;

    beforeEach(() => {
        do_async_request_stub = sinon.stub();
        TickTickApi.__set__("do_async_request", do_async_request_stub);
    });

    it('should correctly login', async () => {
        do_async_request_stub.returns(Promise.resolve({username: "user"}));
        let ticktick = new TickTickApi("user", "pass");
        await ticktick.login();
    });

    it('should not login if already logged', async () => {
        do_async_request_stub.returns(Promise.resolve({username: "user"}));
        let ticktick = new TickTickApi("user", "pass");
        await ticktick.login();
        await ticktick.login();
        expect(do_async_request_stub.callCount).to.be.equal(1);
    });

    it('should throw and exception if login fails', async () => {
        let exceptionThrown = false;
        do_async_request_stub.returns(Promise.reject());
        let ticktick = new TickTickApi("user", "pass");
        try{
            await ticktick.login();
        }catch(err){
            exceptionThrown = true;
            expect(err).to.be.equal("Error logging in to TickTick");
        }

        if(!exceptionThrown){
            assert.fail("Exception expected");
        }
    });

    it('should throw and exception if the response does not have the correct fields', async () => {
        let exceptionThrown = false;
        do_async_request_stub.returns(Promise.resolve({usernme: "user"}));
        let ticktick = new TickTickApi("user", "pass");
        try{
            await ticktick.login();
        }catch(err){
            exceptionThrown = true;
            expect(err).to.be.equal("Invalid login response received");
        }

        if(!exceptionThrown){
            assert.fail("Exception expected");
        }
    });

    it('should throw and exception if the response is empty', async () => {
        let exceptionThrown = false;
        do_async_request_stub.returns(Promise.resolve(undefined));
        let ticktick = new TickTickApi("user", "pass");
        try{
            await ticktick.login();
        }catch(err){
            exceptionThrown = true;
            expect(err).to.be.equal("Invalid login response received");
        }

        if(!exceptionThrown){
            assert.fail("Exception expected");
        }
    });
});

describe('add task', () => {

    var do_async_request_stub = null;

    beforeEach(() => {
        do_async_request_stub = sinon.stub();
        TickTickApi.__set__("do_async_request", do_async_request_stub);
    });

    it("should correctly add a task", async () => {

        do_async_request_stub.onCall(0).returns(Promise.resolve({username: "user"}));
        do_async_request_stub.onCall(1).returns(Promise.resolve("Done"));

        let task = new TickTask({title: 'test task'});
        let ticktick = new TickTickApi("user", "pass");

        await ticktick.login();
        await ticktick.addTask(task);
    });

    it('should throw and exception if fails adding a task', async () => {
        let exceptionThrown = false;

        do_async_request_stub.onCall(0).returns(Promise.resolve({username: "user"}));
        do_async_request_stub.onCall(1).returns(Promise.reject());

        let task = new TickTask({title: 'test task'});
        let ticktick = new TickTickApi("user", "pass");
        try{
            await ticktick.login();
            await ticktick.addTask(task);
        }catch(err){
            exceptionThrown = true;
            expect(err).to.be.equal("Error adding task");
        }

        if(!exceptionThrown){
            assert.fail("Exception expected");
        }
    });

});