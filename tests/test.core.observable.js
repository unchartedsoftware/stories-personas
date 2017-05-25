
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
