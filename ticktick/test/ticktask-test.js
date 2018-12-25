var should = require('chai').should();
var expect = require('chai').expect;
var assert = require('chai').assert;

var TickTask = require('../ticktask');

describe("Task creation", () => {

    it("should create a task", async () => {
        let task = new TickTask({title:"foo"});
        expect(task.title).to.be.equal("foo");
    });

    it('should throw and exception if the task data has no title', async () => {
        let exceptionThrown = false;
        try{
            let task = new TickTask({content:"foo"});
        }catch(err){
            exceptionThrown = true;
            expect(err).to.be.equal("Invalid task data");
        }

        if(!exceptionThrown){
            assert.fail("Exception expected");
        }
    });
});