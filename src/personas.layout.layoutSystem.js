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

/* enable strict mode */
'use strict';

/* import modules */
var Node = require('./personas.core.node.js');

/**
 *
 * @class LayoutSystem
 * @constructor
 */
function LayoutSystem() {
    /* inheritance */
    Node.call(this);

    /* member variables */

    /* initialization */
}

/**
 * @inheritance
 * @type {Node}
 */
LayoutSystem.prototype = Object.create(Node.prototype);
LayoutSystem.prototype.constructor = LayoutSystem;

/* eslint-disable */

/**
 * Returns the total count of objects in this system.
 *
 * @property objectCount
 * @type {Number}
 * @readonly
 */
Object.defineProperty(LayoutSystem.prototype, 'objectCount', {
    get: function () {
        throw new Error('not implemented');
    },
});

/**
 * Adds an object to this system. If the object wouldn't fit in the outmost orbit a new orbit is created and added to the system.
 *
 * @method addObject
 * @param {Object} object - The object to be added to the system
 * @param {Boolean=} skipPositionCalculation - If set to true the added objects do not re-calculate their positions.
 */
LayoutSystem.prototype.addObject = function (object, skipPositionCalculation) {
    throw new Error('not implemented');
};

/**
 * If the object exists in this orbit system, it is removed. Return true if the object was removed successfully, false otherwise.
 *
 * @method removeObject
 * @param {Persona|Orbit|OrbitSystem} object - The object to remove.
 * @returns {boolean}
 */
LayoutSystem.prototype.removeObject = function (object) {
    throw new Error('not implemented');
};

/**
 * Removes all objects from the orbit system.
 *
 * @method removeAllObjects
 */
LayoutSystem.prototype.removeAllObjects = function () {
    throw new Error('not implemented');
};

/**
 * Checks if this system contains the specified `object`.
 *
 * @method containsObject
 * @param {Persona|Orbit|OrbitSystem} object - The object to look for.
 * @returns {boolean}
 */
LayoutSystem.prototype.containsObject = function (object) {
    throw new Error('not implemented');
};

/**
 * Iterates through all the objects in this orbit system recursively and calls the callback with each object as
 * its sole argument.
 *
 * @method forEach
 * @param {Function} callback - The function to call for every object.
 */
LayoutSystem.prototype.forEach = function (callback) {
    throw new Error('not implemented');
};

/**
 * Goes through all the objects in this system and moves them to their most updated position.
 *
 * @method positionObjects
 * @param {Boolean=} animated - Should the objects be animated to their new position.
 */
LayoutSystem.prototype.positionObjects = function(animated) {
    throw new Error('not implemented');
};

/**
 * Invalidates this object, once invalidated the object will no longer respond to interactions.
 *
 * @method invalidate
 */
LayoutSystem.prototype.invalidate = function () {
    throw new Error('not implemented');
};

/* eslint-enable */

/**
 * @export
 * @type {LayoutSystem}
 */
module.exports = LayoutSystem;
