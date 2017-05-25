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
 * Utility class to easily keep track, register and unregister events.
 * NOTE: Only one event can be registered per channel.
 *
 * @class EventTracker
 * @param {EventCenter} eventCenter - The event center to use in this event tracker.
 * @constructor
 */
function EventTracker(eventCenter) {
    /* member variables */
    this.mEventCenter = eventCenter;
    this.mRegisteredEvents = {};
}

/**
 * Returns the internal container with all registered events.
 *
 * @property registeredEvents
 * @type {Object}
 * @readonly
 */
Object.defineProperty(EventTracker.prototype, 'registeredEvents', {
    get: function() {
        return this.mRegisteredEvents;
    },
});

/**
 * Registers and tracks an event at the specified channel.
 *
 * @method registerEvent
 * @param {String} channel - The channel to listen to.
 * @param {Function} callback - The function to be called when the event is triggered.
 */
EventTracker.prototype.registerEvent = function (channel, callback) {
    if (this.mRegisteredEvents[channel]) {
        this.unregisterEvent(channel);
    }
    this.mRegisteredEvents[channel] = this.mEventCenter.subscribe(channel, callback);
};

/**
 * Unregisters an event listener for the specified channel.
 *
 * @method unregisteredEvent
 * @param {String} channel - The channel in which the event was registered.
 */
EventTracker.prototype.unregisterEvent = function (channel) {
    if (this.mRegisteredEvents.hasOwnProperty(channel) && this.mRegisteredEvents[channel]) {
        var eventDescriptor = this.mRegisteredEvents[channel];
        this.mEventCenter.remove(eventDescriptor);
        this.mRegisteredEvents[channel] = null;
    }
};

/**
 * Unregisters all the events being tracked by this instance.
 *
 * @method unregisterAllEvents
 */
EventTracker.prototype.unregisterAllEvents = function () {
    for (var channel in this.mRegisteredEvents) {
        if (this.mRegisteredEvents.hasOwnProperty(channel)) {
            this.unregisterEvent(channel);
        }
    }
};

/**
 * @export
 * @type {EventTracker}
 */
module.exports = EventTracker;
