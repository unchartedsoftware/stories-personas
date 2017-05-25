
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

var Events = require('../src/personas.defaults').Persona.events;
var Personas = require('../src/personas.js');

describe('Personas', function() {
    var dummyData01 = {
        "entityRefs": {
            "ANIMAL_1": {
                "id": "ANIMAL_1",
                "name": "Smokey",
                "type": "animal",
                "imageUrl": ["https://cdn.pixabay.com/photo/2015/04/17/09/36/domestic-cat-726989_640.jpg"]
            },
            "ANIMAL_2": {
                "id": "ANIMAL_2",
                "name": "Misty",
                "type": "animal",
                "imageUrl": "https://cdn.pixabay.com/photo/2015/11/16/22/14/cat-1046544_640.jpg"
            },
        },
        "aggregates": {
            "personas": {
                "0": {
                    "id": "0",
                    "properties": [
                        {
                            "entityRefId": "ANIMAL_1",
                            "count": 50,
                            "isprimary": true,
                            "color": null
                        }
                    ],
                    "imageUrl": null,
                    "totalCount": 111
                },
                "1": {
                    "id": "1",
                    "properties": [
                        {
                            "entityRefId": "ANIMAL_2",
                            "count": 28,
                            "isprimary": true,
                            "color": null
                        }
                    ],
                    "imageUrl": null,
                    "totalCount": 111
                },
            },
            "seeds": {
                "10": {
                    "id":"10",
                    "relatedTo": "1",
                    "properties": [{
                        "entityRefId": "SOMETHING_0",
                        "count": 2
                    }]
                },
            }
        }
    };

    var dummyData02 = {
        "entityRefs": {
            "PERSON_22": {
                "id": "PERSON_22",
                "name": "John Doe",
                "type": "animal",
                "imageUrl": ["https://pixabay.com/en/photos/download/businessman-310819_1280.png?attachment&modal"]
            },
        },
        "aggregates": {
            "personas": {
                "2": {
                    "id": "2",
                    "properties": [
                        {
                            "entityRefId": "PERSON_22",
                            "count": 72,
                            "isprimary": true,
                            "color": null
                        }
                    ],
                    "imageUrl": null,
                    "totalCount": 111
                },
            },
            "seeds": {
                "15": {
                    "id":"15",
                    "relatedTo": "2",
                    "properties": [{
                        "entityRefId": "SOMETHING_0",
                        "count": 2
                    }]
                },
            }
        }
    };

    var subSelectionData01 = {
        "1": {
            computePercentages: false,
            bars: [{
                color: '#ff0000',
                percent: 0.5,
            }],
        }
    };

    var subSelectionData02 = {
        "0": {
            computePercentages: false,
            bars: [{
                color: '#ff0000',
                percent: 0.5,
            }],
        }
    };

    describe('Initialization', function () {
        it ('Creates a new SVG element if initialized with a non-svg element', function () {
            var div = $('<div id="undertest"></div>').appendTo($('body'));
            var personas = new Personas(div.get(0), null);
            expect(personas.mElement.tagName).equals('svg');
            div.remove();
        });

        it('Sets sub select configuration options to true by default', function() {
            // Given
            var div = $('<div id="undertest"></div>').appendTo($('body'));

            // When
            var personas = new Personas(div.get(0), null);

            // Then
            expect(personas.mConfig.Persona.config.subSelectEffectEnabled).to.be.true;
        });

        it('Sets sub select configuration options to values provided in options', function() {
            // Given
            var div = $('<div id="undertest"></div>').appendTo($('body'));
            var options = {
                Persona: {
                    config: {
                        subSelectEffectEnabled: false
                    }
                }
            };

            // When
            var personas = new Personas(div.get(0), options);

            // Then
            expect(personas.mConfig.Persona.config.subSelectEffectEnabled).to.be.false;
        });
    });

    describe('Data processing', function () {
        var personas = null;
        var svg = null;
        var dummyDataCopy01 = null;
        var dummyDataCopy02 = null;


        var dummyConfig = {
            autoGenerateIconMap: false,
            entityIcons: [
                {
                    "type": "animal",
                    "class": "fa fa-square",
                    "color": "#400000",
                    "entityRefId": "ANIMAL_01",
                    "name": "Rover"
                },
                {
                    "type": "organization",
                    "class": "fa fa-building",
                    "color": "#8F8F8F",
                    "isDefault": true
                },
            ],
            Persona: {
                pie: {
                    defaultColor: '#00FF00',
                },
            },
        };

        before(function () {
            svg = $('<svg id="undertest"></svg>').appendTo($('body'));
            personas = new Personas(svg.get(0), dummyConfig);
            dummyDataCopy01 = $.extend(true, {}, dummyData01);
            dummyDataCopy02 = $.extend(true, {}, dummyData02);
        });

        after(function () {
            personas.layoutSystem.invalidate();
            svg.remove();
        });

        it ('Processes the icon map properly', function () {
            var result = personas.processIconMap(dummyConfig);
            expect(result.fallbackColor).equals(dummyConfig.Persona.pie.defaultColor);
            expect(result.icons[dummyConfig.entityIcons[0].entityRefId]).equals(dummyConfig.entityIcons[0].color);
            expect(result.defaults[dummyConfig.entityIcons[1].type]).equals(dummyConfig.entityIcons[1].color);
        });

        it ('Loads data, creates seeds and personas', function () {
            personas.loadData(dummyDataCopy01, false);
            var personaCount = Object.keys(dummyDataCopy01.aggregates.personas).length;
            var seedsCount = Object.keys(dummyDataCopy01.aggregates.seeds).length;
            expect(personas.layoutSystem.objectCount).equals(personaCount + seedsCount);
        });

        it ('Updates data, creates seeds and personas', function () {
            personas.loadData(dummyDataCopy02, true);
            var personaCount01 = Object.keys(dummyDataCopy01.aggregates.personas).length;
            var seedsCount01 = Object.keys(dummyDataCopy01.aggregates.seeds).length;
            var personaCount02 = Object.keys(dummyDataCopy02.aggregates.personas).length;
            var seedsCount02 = Object.keys(dummyDataCopy02.aggregates.seeds).length;
            expect(personas.layoutSystem.objectCount).equals(personaCount01 + personaCount02 + seedsCount01 + seedsCount02);
        });

        it ('Replaces data, creates seeds and personas', function () {
            personas.loadData(dummyDataCopy02, false);
            var personaCount = Object.keys(dummyDataCopy02.aggregates.personas).length;
            var seedsCount = Object.keys(dummyDataCopy02.aggregates.seeds).length;
            expect(personas.layoutSystem.objectCount).equals(personaCount + seedsCount);
        });
    });

    describe ('Sub selection', function () {
        var personas = null;
        var svg = null;

        beforeEach(function () {
            svg = $('<svg id="undertest"></svg>').appendTo($('body'));
            personas = new Personas(svg.get(0), null);
            personas.loadData($.extend(true, {}, dummyData01), false);
        });

        afterEach(function () {
            personas.layoutSystem.invalidate();
            svg.remove();
        });

        it ('Can perform sub selections', function () {
            personas.subSelectPersonas(subSelectionData01, false);

            personas.layoutSystem.forEach(function(object) {
                if ('personaId' in object) {
                    if (subSelectionData01[object.personaId]) {
                        expect(object.gauge.hasBarWithId(object.personaId + '-subselect-0')).equals(true);
                        expect(object.inVisualFocus).equals(true);
                    } else {
                        expect(object.gauge.hasBarWithId(object.personaId + '-subselect-0')).equals(false);
                        expect(object.inVisualFocus).equals(false);
                    }
                }
            });
        });

        it ('Can merge sub selections', function () {
            personas.subSelectPersonas(subSelectionData01, false);
            personas.subSelectPersonas(subSelectionData02, true);

            personas.layoutSystem.forEach(function(object) {
                if ('personaId' in object) {
                    if (subSelectionData01[object.personaId] || subSelectionData02[object.personaId]) {
                        expect(object.gauge.hasBarWithId(object.personaId + '-subselect-0')).equals(true);
                        expect(object.inVisualFocus).equals(true);
                    } else {
                        expect(object.gauge.hasBarWithId(object.personaId + '-subselect-0')).equals(false);
                        expect(object.inVisualFocus).equals(false);
                    }
                }
            });
        });

        it ('Can override sub selections', function () {
            personas.subSelectPersonas(subSelectionData01, false);
            personas.subSelectPersonas(subSelectionData02, false);

            personas.layoutSystem.forEach(function(object) {
                if ('personaId' in object) {
                    if (subSelectionData02[object.personaId]) {
                        expect(object.gauge.hasBarWithId(object.personaId + '-subselect-0')).equals(true);
                        expect(object.inVisualFocus).equals(true);
                    } else {
                        expect(object.gauge.hasBarWithId(object.personaId + '-subselect-0')).equals(false);
                        expect(object.inVisualFocus).equals(false);
                    }
                }
            });
        });

        it ('Can clear sub selections', function () {
            personas.subSelectPersonas(subSelectionData01, false);
            personas.subSelectPersonas(null);

            personas.layoutSystem.forEach(function(object) {
                if ('personaId' in object) {
                    expect(object.gauge.hasBarWithId(object.personaId + '-subselect-0')).equals(false);
                    expect(object.inVisualFocus).equals(true);
                }
            });
        });
    });

    describe ('Events', function () {
        var svg = null;

        beforeEach (function () {
            svg = $('<svg id="undertest"></svg>').appendTo($('body'));
        });

        afterEach (function () {
            svg.remove();
        });

        it ('Forwards the `onSelect` event properly', function (done) {
            var dummyConfig = {
                hooks: {
                    onSelectPersona: function (data) {
                        if (data.personaSelectionStates) {
                            done();
                            if (personas.layoutSystem) {
                                personas.layoutSystem.invalidate();
                                personas.layoutSystem.removeAllObjects();
                            }
                        }
                    },
                },
            };

            var personas = new Personas(svg.get(0), dummyConfig);
            personas.loadData($.extend(true, {}, dummyData01), false);
            personas.mEventCenter.publish(Events.select, {});
        });

        it ('Forwards the `onSelectionCleared` event properly', function (done) {
            var dummyConfig = {
                hooks: {
                    onSelectionCleared: function () {
                        done();
                    },
                },
            };

            var personas = new Personas(svg.get(0), dummyConfig);
            personas.loadData($.extend(true, {}, dummyData01), false);
            personas.mEventCenter.publish(Events.deselectAll);
        });

        it ('Forwards the `onHover` event properly', function (done) {
            var hovered = {
                id: 'UniqueId',
            };

            var dummyConfig = {
                hooks: {
                    onHoverPersona: function (data) {
                        if (data === hovered) {
                            done();
                            if (personas.layoutSystem) {
                                personas.layoutSystem.invalidate();
                                personas.layoutSystem.removeAllObjects();
                            }
                        }
                    },
                },
            };

            var personas = new Personas(svg.get(0), dummyConfig);
            personas.loadData($.extend(true, {}, dummyData01), false);
            personas.mEventCenter.publish(Events.hover, hovered);
        });

        it ('Forwards the `onMerge` event properly', function (done) {
            var obj01 = {
                id: 'UniqueId01',
            };
            var obj02 = {
                id: 'UniqueId02',
            };

            var dummyConfig = {
                hooks: {
                    onMergePersona: function (data) {
                        if (data.merged === obj01 && data.mergedTo === obj02) {
                            done();
                            if (personas.layoutSystem) {
                                personas.layoutSystem.invalidate();
                                personas.layoutSystem.removeAllObjects();
                            }
                        }
                    },
                },
            };

            var personas = new Personas(svg.get(0), dummyConfig);
            personas.loadData($.extend(true, {}, dummyData01), false);
            personas.mEventCenter.publish(Events.merged, obj01, obj02);
        });
    });
});
