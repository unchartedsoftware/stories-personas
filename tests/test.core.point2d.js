
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
