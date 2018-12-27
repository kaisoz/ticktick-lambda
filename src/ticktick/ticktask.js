var ObjectID = require("bson-objectid");
var moment = require('moment');
require('moment-timezone')

function adjustDate(date, timezone) 
{
    return moment.tz(date, timezone).toISOString().replace("Z", "+0000");
}

class TickTask
{
    constructor(data)
    {
        if(!data.title){
            throw "Invalid task data";
        }

        this.title        = data.title;
        this.timeZone     = (data.timeZone)     ? data.timeZone                 : "Europe/Madrid";
        this.assignee     = (data.assignee)     ? data.assignee                 : null;
        this.content      = (data.content)      ? data.content                  : "";
        this.deleted      = (data.deleted)      ? data.deleted                  : 0;
        this.id           = (data.id)           ? data.id                       : ObjectID();
        this.isAllDay     = (data.isAllDay)     ? data.isAllDay                 : null;
        this.isDirty      = (data.isDirty)      ? data.isDirty                  : true;
        this.items        = (data.items)        ? data.items                    : [];
        this.local        = (data.local)        ? data.local                    : true;
        this.priority     = (data.priority)     ? data.priority                 : 0;
        this.progress     = (data.progress)     ? data.progress                 : 0;
        this.projectId    = (data.projectId)    ? data.projectId                : 0;
        this.reminder     = (data.reminder)     ? data.reminder                 : null;
        this.reminders    = (data.reminders)    ? data.reminders                : [{ id: ObjectID(), trigger: "TRIGGER=PT0S"}];
        this.remindTime   = (data.remindTime)   ? data.remindTime               : null;
        this.repeatFlag   = (data.repeatFlag)   ? data.repeatFlag               : null;
        this.sortOrder    = (data.sortOrder)    ? data.sortOrder                : 0;
        this.status       = (data.status)       ? data.status                   : 0;
        this.tags         = (data.tags)         ? data.tags                     : [];

        this.modifiedTime = adjustDate(data.modifiedTime, this.timeZone);
        this.dueDate      = (data.dueDate)      ? adjustDate(data.dueDate, this.timeZone)      : null;
        this.startDate    = (data.startDate)    ? adjustDate(data.startDate, this.timeZone)    : null;
    }
}

module.exports = TickTask;