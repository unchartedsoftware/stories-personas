
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

var Viewport = require('../src/personas.layout.viewport.js');
var Defaults = require('../src/personas.defaults');
var Events = Defaults.Persona.events;
var Node = require('../src/personas.core.node.js');
var EventCenter = require('../src/personas.core.eventCenter.js');

/**
 * Creates a wheel event to test zoom events.
 *
 * @method createWheelEvent
 * @param {Number} mouseX - The current X coordinate of the mouse.
 * @param {Number} mouseY - The current Y coordinate of the mouse.
 * @param {Number} deltaY - The amount of scrolling done in the Y axis (up/down)
 * @returns {Event}
 */
function createWheelEvent(mouseX, mouseY, deltaY) {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent('wheel', true, true, null);
    event.screenX = mouseX;
    event.screenY = mouseY;
    event.clientX = mouseX;
    event.clientY = mouseY;
    event.pageX = mouseX;
    event.pageY = mouseY;
    event.ctrlKey = true;
    event.deltaY = deltaY;
    return event;
}

/**
 * Creates a custom mouse event to simulate 'mousedown', 'mousemove' or 'mouseup'
 *
 * @method createMouseEvent
 * @param {String} type - The type of the event, either 'mousedown', 'mousemove' or 'mouseup'
 * @param {Number} mouseX - The current X coordinate of the mouse.
 * @param {Number} mouseY - The current Y coordinate of the mouse
 * @param {Number} moveX - The offset, in the X axis, by which the mouse moved during this event.
 * @param {Number} moveY - The offset, in the Y axis, by which the mouse moved during this event.
 * @returns {Event}
 */
function createMouseEvent(type, mouseX, mouseY, moveX, moveY) {
    var event = document.createEvent('CustomEvent');
    event.initCustomEvent(type, true, true, null);
    event.button = 0;
    event.buttons = 1;
    event.x = mouseX;
    event.y = mouseY;
    event.screenX = mouseX;
    event.screenY = mouseY;
    event.clientX = mouseX;
    event.clientY = mouseY;
    event.offsetX = mouseX;
    event.offsetY = mouseY;
    event.pageX = mouseX;
    event.pageY = mouseY;
    event.movementX = moveX;
    event.movementY = moveY;
    return event;
}

describe('Viewport', function() {
    var paper = null;
    var viewport = null;
    var options = {};

    before(function () {
        var svgElement = $('<svg id="undertest"></svg>').appendTo($('body'));
        paper = Node.mixinTouch(Snap(svgElement.element));

        for (var key in Defaults) {
            if (Defaults.hasOwnProperty(key)) {
                options[key] = Defaults[key];
            }
        }
        options.eventCenter = new EventCenter();
        viewport = new Viewport(paper, options);
    });

    it ('Triggers `deselectAll` event on click', function(done) {

        options.eventCenter.subscribe(Events.deselectAll, function () {
            done();
        });

        paper.click();
    });

    describe('Pan', function() {
        it('pans!', function() {
            /* add a circle to the group */
            viewport.circle(100, 100, 80);

            /* mouse event variables */
            var event;
            var startX = 50;
            var startY = 50;
            var mouseX = startX;
            var mouseY = startY;

            /* simulate a mouse down event */
            event = createMouseEvent('mousedown', mouseX, mouseY, 0, 0);
            paper.node.dispatchEvent(event);

            /* save the starting BB of the viewport */
            var startingBB = viewport.getBBox();

            /* test the pan 10 times */
            for (var i = 0; i < 10; ++i) {
                /* simulate a mouse move event with random distances */
                var distanceX = Math.floor(Math.random() * 500) - 250;
                var distanceY = Math.floor(Math.random() * 500) - 250;
                mouseX += distanceX;
                mouseY += distanceY;

                event = createMouseEvent('mousemove', mouseX, mouseY, distanceX, distanceY);
                paper.node.dispatchEvent(event);

                /* get the viewport's updated BB */
                var updatedBB = viewport.getBBox();

                /* make sure that the viewport moved with the mouse */
                expect(updatedBB.x - startingBB.x).to.equal(mouseX - startX);
                expect(updatedBB.y - startingBB.y).to.equal(mouseY - startY);
            }
        });
    });

    describe('Zoom', function() {
        it ('Zooms through the mouse wheel event', function () {
            /* simulate a large positive mouse wheel event */
            var event;
            for (var i = 0; i < 500; ++i) {
                event = createWheelEvent(50, 50, 1);
                paper.node.dispatchEvent(event);
            }

            /* test that the viewport zoomed to the max scale defined in the options */
            expect(viewport.transform().localMatrix.split().scalex).to.equal(viewport.minZoomScale);

            /* simulate a large negative mouse wheel event */
            for (var i = 0; i < 500; ++i) {
                event = createWheelEvent(50, 50, -1);
                paper.node.dispatchEvent(event);
            }

            /* test that the viewport zoomed to the min scale defined in the options */
            expect(viewport.transform().localMatrix.split().scalex).to.equal(viewport.maxZoomScale);
        });
    });
});
