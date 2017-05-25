
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
