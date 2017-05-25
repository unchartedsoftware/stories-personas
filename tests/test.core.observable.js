
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

var Observable = require('../src/personas.core.observable.js');

describe('Observable', function() {
    var observable = null;

    beforeEach(function () {
        observable = new Observable(null);
    });

    it ('Value can be set', function () {
        /* initial value should be null */
        expect(observable.getValue()).equals(null);
        expect(observable.value).equals(null);

        var newValue = (Math.random() * 1000);
        observable.value = newValue;

        expect(observable.getValue()).equals(newValue);
        expect(observable.value).equals(newValue);

        newValue = (Math.random() * 1000);
        observable.setValue(newValue);
        expect(observable.getValue()).equals(newValue);
        expect(observable.value).equals(newValue);
    });

    it ('Can be observed for changes', function (done) {
        var newValue = (Math.random() * 1000);
        observable.observe(function (sender, value) {
            expect(sender).equals(observable);
            expect(value).equals(newValue);
            done();
        });
        observable.value = newValue;
    });

    it ('Can be unobserved', function () {
        var id = observable.observe(function () {
            throw ('The observer should not trigger this callback.');
        });

        observable.unobserve(id);

        observable.value = (Math.random() * 1000);
    });

    it ('Can ignore changes', function() {
        var id = observable.observe(function () {
            throw ('The observer should not trigger this callback.');
        });

        observable.ignoreChanges(1);
        observable.value = (Math.random() * 1000);

        expect(observable.value).equals(null);

        observable.unobserve(id);
        var newValue = (Math.random() * 1000);
        observable.value = newValue;

        expect(observable.value).equals(newValue);
    });

    it ('Handles `Observable` daisy chains', function (done) {
        var parent = new Observable(null);
        observable.value = parent;

        var newValue = (Math.random() * 1000);
        observable.observe(function(sender, value) {
            expect(sender).equals(observable);
            expect(value).equals(newValue);
            done();
        });

        /* set the new value to the parent, this should trigger the daisy chain */
        parent.value = newValue;
    });
});
