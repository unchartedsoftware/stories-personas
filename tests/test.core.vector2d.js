
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

var Vector2D = require('../src/personas.core.vector2d.js');

describe('Vector2D', function () {
    var initialX = 0;
    var initialY = 0;
    var vector = null;
    beforeEach(function () {
        initialX = Math.round(Math.random() * 1000);
        initialY = Math.round(Math.random() * 1000);
        vector = new Vector2D(initialX, initialY);
    });

    it ('Initializes with passed properties', function () {
        expect(vector.x).equals(initialX);
        expect(vector.y).equals(initialY);
    });

    it ('Calculates its length and unit vector properly', function () {
        var lengthSQ = (initialX * initialX) + (initialY * initialY);
        var length = Math.sqrt(lengthSQ);
        expect(vector.lengthSQ).equals(lengthSQ);
        expect(vector.length).equals(length);

        var unit = vector.unit;
        expect(unit.x).equals(vector.x / length);
        expect(unit.y).equals(vector.y / length);
    });

    it ('Calculates dot product properly', function () {
        var otherVector = new Vector2D(Math.round(Math.random() * 1000), Math.round(Math.random() * 1000));
        var dot = vector.dot(otherVector);
        expect(dot).equals((vector.x * otherVector.x) + (vector.y * otherVector.y));
    });

    it ('Calculates cross product properly', function () {
        var otherVector = new Vector2D(Math.round(Math.random() * 1000), Math.round(Math.random() * 1000));
        var cross = vector.cross(otherVector);
        expect(cross).equals((vector.x * otherVector.y) - (vector.y * otherVector.x));
    });
});
