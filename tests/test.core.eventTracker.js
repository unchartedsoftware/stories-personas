
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

var EventTracker = require('../src/personas.core.eventTracker.js');
var EventCenter = require('../src/personas.core.eventCenter.js');

describe('EventTracker', function() {
    var eventCenter = new EventCenter();
    var tracker = null;

    beforeEach(function () {
        tracker = new EventTracker(eventCenter);
    });

    afterEach(function () {
        eventCenter.dispose();
        tracker = null;
    });

    it ('Registers events properly', function (done) {
        var mockFunction01 = function () {
            eventCenter.publish('channel 02');
        };

        var mockFunction02 = function() {
            done();
        };

        tracker.registerEvent('channel 01', mockFunction01);
        tracker.registerEvent('channel 02', mockFunction02);

        var registeredEvents = tracker.registeredEvents;
        expect(registeredEvents['channel 01'].callback).equals(mockFunction01);
        expect(registeredEvents['channel 02'].callback).equals(mockFunction02);

        eventCenter.publish('channel 01');
    });

    it ('Unregisters events properly', function () {

        var mockFunction01 = function () {
            throw ('This mockFunction01 should not be called');
        };

        var mockFunction02 = function() {
            throw ('This mockFunction02 should not be called');
        };

        tracker.registerEvent('channel 01', mockFunction01);
        tracker.registerEvent('channel 02', mockFunction02);

        tracker.unregisterEvent('channel 01');

        var registeredEvents = tracker.registeredEvents;
        expect(registeredEvents['channel 01']).equals(null);
        expect(registeredEvents['channel 02'].callback).equals(mockFunction02);

        eventCenter.publish('channel 01');

        tracker.unregisterEvent('channel 02');

        registeredEvents = tracker.registeredEvents;
        expect(registeredEvents['channel 01']).equals(null);
        expect(registeredEvents['channel 02']).equals(null);

        tracker.registerEvent('channel 01', mockFunction01);
        tracker.registerEvent('channel 02', mockFunction02);

        registeredEvents = tracker.registeredEvents;
        expect(registeredEvents['channel 01'].callback).equals(mockFunction01);
        expect(registeredEvents['channel 02'].callback).equals(mockFunction02);

        tracker.unregisterAllEvents();

        registeredEvents = tracker.registeredEvents;
        expect(registeredEvents['channel 01']).equals(null);
        expect(registeredEvents['channel 02']).equals(null);

        eventCenter.publish('channel 01');
        eventCenter.publish('channel 02');

        /* since all events have been unregistered, this shouldn't do anything */
        tracker.unregisterEvent('channel 02');
    });

    it ('Overrides events properly', function (done) {
        var mockFunction01 = function () {
            throw ('This mockFunction01 should not be called');
        };

        var mockFunction02 = function() {
            done();
        };

        tracker.registerEvent('channel 01', mockFunction01);

        var registeredEvents = tracker.registeredEvents;
        expect(registeredEvents['channel 01'].callback).equals(mockFunction01);

        tracker.registerEvent('channel 01', mockFunction02);

        registeredEvents = tracker.registeredEvents;
        expect(registeredEvents['channel 01'].callback).equals(mockFunction02);

        eventCenter.publish('channel 01');
    });
});
