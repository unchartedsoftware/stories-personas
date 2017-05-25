
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

var Persona = require('../src/personas.persona.js');
var Point2D = require('../src/personas.core.point2d.js');
var Defaults = require('../src/personas.defaults');
var EventCenter = require('../src/personas.core.eventCenter.js');

describe('Persona: UI Class, tests are here only for coverage', function () {

    var dummyData = {
        "id": "2",
        "properties": [
            {
                "entityRefId": "ANIMAL_1",
                "count": 72,
                "isprimary": true,
                "color": null
            }
        ],
        "imageUrl": null,
        "totalCount": 111,
        "relevantCount": 72,
        "relevantName": "New York Veterinary Clinic"
    };

    var dummyIconMap = {
        icons: {},
        defaults: {},
        fallbackColor: '#000000'
    };

    var dummyRefs = {
        "ANIMAL_1": {
            "id": "ANIMAL_1",
            "name": "Fido",
            "type": "animal",
            "imageUrl": ["http://example.com/image1.jpg", "http://example.com/image2.jpg"]
        }
    };

    var options = {};
    for (var key in Defaults) {
        if (Defaults.hasOwnProperty(key)) {
            options[key] = Defaults[key];
        }
    }
    options.eventCenter = new EventCenter();

    it ('Functions', function () {
        var svg = $('<svg id="undertest"></svg>').appendTo($('body'));
        var paper = Snap(svg.get(0));
        var persona = new Persona(100, dummyData, dummyIconMap, options, dummyRefs);
        paper.append(persona);
        persona.radius = 150;
        persona.size = 200;
        persona.isSelected = true;
        persona.isSelected = false;

        dummyData.relevantCount *= 2;
        dummyData.relevantName += " Appleseed";
        dummyData.totalCount *= 2;

        persona.updateData(250, dummyData, dummyIconMap, dummyRefs);
        persona.animatePosition(persona.position, new Point2D(100, 100), 10, mina.easein);
        persona.bringToFront();
        persona.popIn();
        persona.onEnter();
        persona.unregisterEvents();
        persona.handleClick();
        persona.handleEnableBlur(true);
        persona.handleEnableBlur(false);
        persona.handleEnableBlur(true);
        persona.handleRepel([], new Point2D(10, 10), 500);
        persona.handleDragStarted();
        persona.handleDragMoved(10, 10);
        persona.handleDragEnded();
        persona.highlightForMerge();
        persona.unhiglightForMerge();
        persona.appendGauge([{color: '#ff0000', percent: 0.5}, {color: '#ff00ff', percent: 0.25}]);
        persona.removeAllAppendedGauges();
        persona.setRadius(250, true);

        var toMerge = new Persona(100, dummyData, dummyIconMap, options, dummyRefs);
        paper.append(toMerge);
        persona.merge(toMerge);
    });
});
