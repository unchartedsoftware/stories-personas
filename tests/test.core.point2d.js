
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

var Point2D = require('../src/personas.core.point2d.js');

describe('Point2D', function () {
    var initialX = 0;
    var initialY = 0;
    var point = null;
    beforeEach(function () {
        initialX = Math.round(Math.random() * 1000);
        initialY = Math.round(Math.random() * 1000);
        point = new Point2D(initialX, initialY);
    });

    it ('Initializes with passed properties', function () {
        expect(point.x).equals(initialX);
        expect(point.y).equals(initialY);
    });

    it ('Updates position through `x` and `y` properties', function () {
        point.x += 10;
        point.y += 10;

        expect(point.x).equals(initialX + 10);
        expect(point.y).equals(initialY + 10);

        initialX = Math.round(Math.random() * 1000);
        initialY = Math.round(Math.random() * 1000);

        point.x = initialX;
        point.y = initialY;

        expect(point.x).equals(initialX);
        expect(point.y).equals(initialY);
    });

    it ('Updates position through `set` method', function () {
        initialX = Math.round(Math.random() * 1000);
        initialY = Math.round(Math.random() * 1000);

        point.set(initialX, initialY);

        expect(point.x).equals(initialX);
        expect(point.y).equals(initialY);
    });

    it ('`add` method works properly', function () {
        point.add(new Point2D(15, 15));

        expect(point.x).equals(initialX + 15);
        expect(point.y).equals(initialY + 15);
    });

    it ('`subtract` method works properly', function () {
        point.subtract(new Point2D(5, 5));

        expect(point.x).equals(initialX - 5);
        expect(point.y).equals(initialY - 5);
    });

    it ('Clones itself properly', function () {
        /* not used */
        var changedCallback = function () {
            var pi = Math.PI;
            ++pi;
        };

        point.changedCallback = changedCallback;

        var cloned = point.clone();

        expect(cloned.x).equals(initialX);
        expect(cloned.y).equals(initialY);
        expect(cloned.changedCallback).equals(changedCallback);
    });

    it ('Calls the `changedCallback` when the point is changed', function (done) {
        point.changedCallback = function () {
            point.changedCallback = function () {
                point.changedCallback = function () {
                    point.changedCallback = function () {
                        point.changedCallback = function () {
                            done();
                        };
                        point.subtract(new Point2D(10, 10));
                    };
                    point.add(new Point2D(20, 20));
                };
                point.set(10, 20);
            };
            point.y += 10;
        };

        point.x += 10;
    });
});
