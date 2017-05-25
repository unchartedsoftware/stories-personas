/*
 * Copyright 2017 Uncharted Software Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* enable strict mode */
'use strict';

/**
 * Event center is designed to work as a central event router, useful when many objects need to listen for an event
 * but don't necessarily need access to the object emitting the event.
 *
 * @class EventCenter
 * @constructor
 */
function EventCenter() {
    /* member variables */
    this.mEventMap = {};
}

/**
 * Publishes an event and forwards the specified `var_args` to all the registered callbacks.
 *
 * @method publish
 * @param {string} event - The name of the event to emit.
 * @param {...*} var_args - Arguments to forward to the event listener callbacks.
 */
EventCenter.prototype.publish = function(event/* , varArgs*/) {
    var eventQueue = this.mEventMap[event];
    if (eventQueue) {
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, n = eventQueue.length; i < n; ++i) {
            var eventInfo = eventQueue[i];
            if (eventInfo) {
                eventInfo.callback.apply(eventInfo.context, args);
            }
        }
    }
};

/**
 * Subscribes to an event so the specified callback is called when the event is fired.
 *
 * @method subscribe
 * @param {string} event - The name of the event to subscribe to.
 * @param {Function} callback - The callback to invoke when the event is triggered.
 * @param {Object=} context - If passed the callback will be invoked within this context.
 * @returns {Object} An object containing this event subscription info. Useful to remove this listener from the event center.
 */
EventCenter.prototype.subscribe = function(event, callback, context) {
    var eventQueue = this.mEventMap[event];
    if (!eventQueue) {
        eventQueue = [];
        this.mEventMap[event] = eventQueue;
    }

    for (var i = 0, n = eventQueue.length; i < n; ++i) {
        if (eventQueue[i] === null) {
            eventQueue[i] = this._createEventInfo(event, callback, context, i);
            return eventQueue[i];
        }
    }

    var eventInfo = this._createEventInfo(event, callback, context, eventQueue.length);
    eventQueue.push(eventInfo);
    return eventInfo;
};

/**
 * Removes the specified `eventInfo` from this event center.
 *
 * @method remove
 * @param {Object} eventInfo - The object that was returned from the `subscribe` function.
 * @param {boolean=} invalidateInfo - Should the eventInfo be invalidated.
 */
EventCenter.prototype.remove = function(eventInfo, invalidateInfo) {
    if (eventInfo.event && this.mEventMap[eventInfo.event] && !isNaN(eventInfo.id)) {
        var eventQueue = this.mEventMap[eventInfo.event];
        if (eventQueue.length > eventInfo.id && eventQueue[eventInfo.id] === eventInfo) {
            eventQueue[eventInfo.id] = null;
            if (invalidateInfo) {
                this._invalidateEventInfo(eventInfo);
            }
        }
    }
};

/**
 * Removes all events and callbacks from this event center.
 *
 * @method dispose
 */
EventCenter.prototype.dispose = function() {
    var eventMap = this.mEventMap;
    for (var event in eventMap) {
        if (eventMap.hasOwnProperty(event)) {
            /* to truly avoid memory leaks invalidate all eventInfo objects manually
             * just in case another object is holding on to one of them */
            var eventQueue = eventMap[event];
            for (var i = 0, n = eventQueue.length; i < n; ++i) {
                if (eventQueue[i]) {
                    this._invalidateEventInfo(eventQueue[i]);
                }
            }
            this.mEventMap[event].length = 0;
            delete this.mEventMap[event];
        }
    }
};


/**
 * Utility function to create event info objects.
 *
 * @method _createEventInfo
 * @param {string} event - Thename of the event
 * @param {Function} callback - The callback function registered for this event.
 * @param {Object} context - The context from which the function will be called.
 * @param {number} id - The unique id for this event info within the event queue.
 * @returns {{event: *, callback: *, context: (*|null), id: *}}
 * @private
 */
EventCenter.prototype._createEventInfo = function(event, callback, context, id) {
    return {
        event: event,
        callback: callback,
        context: context || null,
        id: id,
    };
};

/**
 * Utility function to invalidate an event info object.
 *
 * @method _invalidateEventInfo
 * @param {Object} eventInfo - The event info object to invalidate.
 * @private
 */
EventCenter.prototype._invalidateEventInfo = function(eventInfo) {
    if (eventInfo.hasOwnProperty('event')) {
        delete eventInfo.event;
    }

    if (eventInfo.hasOwnProperty('callback')) {
        delete eventInfo.callback;
    }

    if (eventInfo.hasOwnProperty('context')) {
        delete eventInfo.context;
    }

    if (eventInfo.hasOwnProperty('id')) {
        delete eventInfo.id;
    }
};

/**
 * @export
 * @type {EventTracker}
 */
module.exports = EventCenter;
