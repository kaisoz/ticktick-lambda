var ObjectID = require("bson-objectid");

class TickTask
{
    constructor(data)
    {
        if(!data.title){
            throw "Invalid task data"; // This needs to be updated to grab dynamically
        }

        this.title        = data.title;
        this.assignee     = (data.assignee)     ? data.assignee     : null;
        this.content      = (data.content)      ? data.content      : "";
        this.deleted      = (data.deleted)      ? data.deleted      : 0;
        this.dueDate      = (data.dueDate)      ? data.dueDate      : null;
        this.id           = (data.id)           ? data.id           : ObjectID();
        this.isAllDay     = (data.isAllDay)     ? data.isAllDay     : null;
        this.isDirty      = (data.isDirty)      ? data.isDirty      : true;
        this.items        = (data.items)        ? data.items        : [];
        this.local        = (data.local)        ? data.local        : true;
        this.modifiedTime = (data.modifiedTime) ? data.modifiedTime : new Date().toISOString().replace("Z", "+0000"); //"2017-08-12T17=04=51.982+0000";
        this.priority     = (data.priority)     ? data.priority     : 0;
        this.progress     = (data.progress)     ? data.progress     : 0;
        this.projectId    = (data.projectId)    ? data.projectId    : 0;
        this.reminder     = (data.reminder)     ? data.reminder     : null;
        this.reminders    = (data.reminders)    ? data.reminders    : [{ id: ObjectID(), trigger: "TRIGGER=PT0S"}];
        this.remindTime   = (data.remindTime)   ? data.remindTime   : null;
        this.repeatFlag   = (data.repeatFlag)   ? data.repeatFlag   : null;
        this.sortOrder    = (data.sortOrder)    ? data.sortOrder    : 0;
        this.startDate    = (data.startDate)    ? data.startDate    : null;
        this.status       = (data.status)       ? data.status       : 0;
        this.tags         = (data.tags)         ? data.tags         : [];
        this.timeZone     = (data.timeZone)     ? data.timeZone     : "America/New_York"; // This needs to be updated to grab dynamically
    }
}

module.exports = TickTask;