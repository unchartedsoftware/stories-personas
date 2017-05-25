
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

var OrbitSystem = require('../src/personas.layout.orbitSystem.js');
var Node = require('../src/personas.core.node.js');

describe('OrbitSystem', function() {
    var system = null;

    beforeEach(function () {
        system = new OrbitSystem();
    });

    it ('Calculates its radius properly', function () {
        expect(system.radius).equals(0);

        var object = new Node();
        object.radius = Math.round(Math.random() * 20) + 10;

        system.addObject(object);
        expect(system.radius).equals(object.radius);
    });

    it ('Repositions objects using the `orbitPadding` property', function () {
        /* set the orbit padding to 0 */
        system.orbitPadding = 0;
        expect(system.orbitPadding).equals(0);

        /* add 15 objects of the same size to the system, this should create at least three orbits */
        var objectRadius = Math.round(Math.random() * 20) + 10;
        var object = null;
        for (var i = 0; i < 15; ++i) {
            object = new Node();
            object.radius = objectRadius;
            system.addObject(object);
        }

        /* save the position of the last object added */
        var savedX = object.position.x;
        var savedY = object.position.y;

        /* change the orbit padding to a number between 10 and 30 */
        var newPadding = Math.round(Math.random() * 20) + 10;
        system.orbitPadding = newPadding;
        expect(system.orbitPadding).equals(newPadding);

        /* test that the object moved to a different position */
        if (savedX !== 0) {
            expect(object.position.x).not.equals(savedX);
        }

        if (savedY !== 0) {
            expect(object.position.y).not.equals(savedY);
        }

        /* change the padding back to 0 */
        system.orbitPadding = 0;
        expect(system.orbitPadding).equals(0);

        /* make sure the object moved back to its original position */
        expect(object.position.x).equals(savedX);
        expect(object.position.y).equals(savedY);
    });

    it ('Objects can be added to the system', function() {
        var tangentAngle = Math.sin(Math.PI * 0.125); // 45 deg / 2
        var halfLengthRatio = Math.cos(Math.PI * 0.25); // 45 deg
        var objectRadius = 64;
        var object = new Node();
        object.radius = objectRadius;

        /* create 65 objects which should create 9 orbits in the system */
        system.addObject(object);

        for (var i = 0; i < 64; ++i) {
            object = new Node();
            objectRadius = tangentAngle * (halfLengthRatio * system.radius); // this is an approximation
            object.radius = objectRadius;
            system.addObject(object);
        }

        expect(system.mOrbits.length).to.equal(9);
        expect(system.mOrbits[0].mObjects.length).to.equal(1); // first orbit only has one object
    });

    it ('Can find if it contains an object', function () {
        var object = new Node();
        object.radius = Math.round(Math.random() * 20) + 10;

        system.addObject(object);
        expect(system.containsObject(object)).equals(true);
        expect(system.containsObject({})).equals(false);
    });

    it ('Can iterate through all the objects in the system', function () {
        var objects = [];
        var numberOfObjects = Math.round(Math.random() * 90) + 10;
        var i;

        for (i = 0; i < numberOfObjects; ++i) {
            var object = new Node();
            object.radius = Math.round(Math.random() * 20) + 10;
            objects.push(object);
            system.addObject(object);
        }

        system.forEach(function (object) {
            object.iterated = true;
        });

        for (i = 0; i < numberOfObjects; ++i) {
            expect(objects[i].iterated).equals(true);
        }
    });

    it ('Invalidates all the objects in the system properly', function () {
        var invalidateFunction = function () {
            this.invalidated = true;
        };

        var objects = [];
        var numberOfObjects = Math.round(Math.random() * 90) + 10;
        var i;

        for (i = 0; i < numberOfObjects; ++i) {
            var object = new Node();
            object.radius = Math.round(Math.random() * 20) + 10;
            object.invalidate = invalidateFunction;
            objects.push(object);
            system.addObject(object);
        }

        system.invalidate();

        for (i = 0; i < numberOfObjects; ++i) {
            expect(objects[i].invalidated).equals(true);
        }
    });

    describe ('DEBUG: Tested mostly for coverage', function () {
        it ('Can be set to draw orbits', function () {
            var object;
            /* create at least 3 orbits */
            while (system.mOrbits.length < 3) {
                object = new Node();
                object.radius = Math.round(Math.random() * 20) + 10;
                system.addObject(object);
            }

            /* enable drawing */
            system.drawInnerOrbits = true;
            system.drawCenterOrbits = true;
            system.drawOuterOrbits = true;

            /* check that the orbits were created */
            expect(system.mInnerOrbits.length).equals(3);
            expect(system.mCenterOrbits.length).equals(3);
            expect(system.mOuterOrbits.length).equals(3);


            /* create another 3 orbits */
            while (system.mOrbits.length < 6) {
                object = new Node();
                object.radius = Math.round(Math.random() * 20) + 10;
                system.addObject(object);
            }

            /* check that the orbits were created */
            expect(system.mInnerOrbits.length).equals(6);
            expect(system.mCenterOrbits.length).equals(6);
            expect(system.mOuterOrbits.length).equals(6);

            /* disable drawing */
            system.drawInnerOrbits = false;
            system.drawCenterOrbits = false;
            system.drawOuterOrbits = false;

            /* check that the orbits were deleted */
            expect(system.mInnerOrbits.length).equals(0);
            expect(system.mCenterOrbits.length).equals(0);
            expect(system.mOuterOrbits.length).equals(0);

        });
    });


});
