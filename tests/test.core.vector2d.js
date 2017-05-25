
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
