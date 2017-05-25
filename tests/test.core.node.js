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

var Node = require('../src/personas.core.node.js');

describe('Node', function() {
    describe ('Creates wrapped DOM elements of the specified type', function () {
        it ('Creates default type "g"', function () {
            var node = new Node();
            expect(node.node.tagName).equals('g');
        });

        describe ('Creates custom types', function () {
            it ('Creates "text" elements', function () {
                var node = new Node('text');
                expect(node.node.tagName).equals('text');
            });

            it ('Creates "circle" elements', function () {
                var node = new Node('circle');
                expect(node.node.tagName).equals('circle');
            });

            it ('Creates "rect" elements', function () {
                var node = new Node('rect');
                expect(node.node.tagName).equals('rect');
            });

            it ('Creates "image" elements', function () {
                var node = new Node('image');
                expect(node.node.tagName).equals('image');
            });
        });
    });

    describe ('Applies transformations properly', function () {
        var node = null;
        beforeEach(function () {
            node = new Node();
        });

        describe ('Position changes', function () {
            it ('Moves through "position" property', function () {
                /* test 10 times */
                for (var i = 0; i < 10; ++i) {
                    var x = Math.round(Math.random() * 500);
                    var y = Math.round(Math.random() * 500);
                    node.position.set(x, y);
                    var matrix = node.transform().localMatrix;
                    expect(matrix.e).equals(x);
                    expect(matrix.f).equals(y);
                }
            });

            it ('Moves through "position" sub-properties', function () {
                /* test 10 times */
                for (var i = 0; i < 10; ++i) {
                    var x = Math.round(Math.random() * 500);
                    var y = Math.round(Math.random() * 500);
                    node.position.x = x;
                    node.position.y = y;
                    var matrix = node.transform().localMatrix;
                    expect(matrix.e).equals(x);
                    expect(matrix.f).equals(y);
                }
            });

            it ('Moves through private function', function () {
                /* test 10 times */
                for (var i = 0; i < 10; ++i) {
                    var x = Math.round(Math.random() * 500);
                    var y = Math.round(Math.random() * 500);
                    node._setPosition(x, y);
                    var matrix = node.transform().localMatrix;
                    expect(matrix.e).equals(x);
                    expect(matrix.f).equals(y);
                    expect(node.position.x).equals(x);
                    expect(node.position.y).equals(y);
                }
            });
        });

        describe ('Scale changes', function () {
            it ('Scales through "scale" property', function () {
                /* test 10 times */
                for (var i = 0; i < 10; ++i) {
                    var scale = (Math.random() * 3).toFixed(4);
                    node.scale = scale;
                    var transform = node.transform().localMatrix.split();
                    expect(parseFloat(transform.scalex).toFixed(4)).equals(scale);
                    expect(parseFloat(transform.scaley).toFixed(4)).equals(scale);
                }
            });

            it ('Scales through private function', function () {
                /* test 10 times */
                for (var i = 0; i < 10; ++i) {
                    var scale = (Math.random() * 3).toFixed(4);
                    node._setScale(scale);
                    var transform = node.transform().localMatrix.split();
                    expect(parseFloat(transform.scalex).toFixed(4)).equals(scale);
                    expect(parseFloat(transform.scaley).toFixed(4)).equals(scale);
                }
            });
        });
    });

    describe ('Calls "onEnter" properly', function () {
        var paper = null;
        before(function () {
            var svgElement = $('<svg id="undertest"></svg>').appendTo($('body'));
            paper = Snap(svgElement.element);
        });

        it ('Calls "onEnter" when added to the DOM for the first time', function(done) {
            var node = new Node();
            node.onEnter = function () {
                done();
            };
            paper.append(node);
            node.remove();
        });

        it ('Does not call "onEnter" when added to the DOM after the first time', function() {
            var node = new Node();
            paper.append(node);
            node.remove();

            node.onEnter = function () {
                throw ('onEnter should not be called after the first time the node is added to the DOM');
            };

            paper.append(node);
            node.remove();

        });
    });
});
