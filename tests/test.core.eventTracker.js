
/*
 * *
 *  Copyright © 2017 Uncharted Software Inc.
 *
 *  Property of Uncharted™, formerly Oculus Info Inc.
 *  http://uncharted.software/
 *
 *  Released under the MIT License.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy of
 *  this software and associated documentation files (the "Software"), to deal in
 *  the Software without restriction, including without limitation the rights to
 *  use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 *  of the Software, and to permit persons to whom the Software is furnished to do
 *  so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 * /
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
