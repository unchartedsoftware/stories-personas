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

var Defaults = {
    hooks: {
        onSelectPersona: null,
        onHoverPersona: null,
        onMergePersona: null,
        onSelectionCleared: null,
        onZoomUpdateFromUser: null,
        onClickEmptySpace: null,
    },
};

module.exports = Defaults;

module.exports.Persona = {
    classes: {
        container: 'prsnas_container',
        persona: 'prsnas_persona',
        content: 'prsnas_main',
        name: 'prsnas_name',
        namecontainer: 'prsnas_namecontainer',
        count: 'prsnas_count',
        totalcount: 'prsnas_totalcount',
        counttext: 'prsnas_counttext',
        seedcount: 'seed_count',
        seedname: 'seed_value',
        unselectable: 'unselectable',
        zoomcontrols: 'prsnas_zoom_controls',
        zoomcontrolslabel: 'control_label',
    },
    layout: {
        systemtype: 'cola',
        textpadding: 2,
        progressHeight: 9,
        minSize: 130,
        maxSize: 250,
        selectedBorder: 8,
    },
    pie: {
        baseColor: '#F6F1EE',
        defaultColor: '#9EC731',
        minimumDisplayRatio: 0.025,
    },
    events: {
        select: '[Persona::PersonaSelect]',
        deselectAll: '[Persona::PersonaDeselectAll]',
        hover: '[Persona::PersonaHover]',
        enableBlur: '[Persona::PersonaEnableBlur]',
        repel: '[Persona::PersonaRepel]',
        dragStarted: '[Persona::PersonaDragStarted]',
        dragMoved: '[Persona::PersonaDragged]',
        dragEnded: '[Persona::PersonaDragEnded]',
        merged: '[Persona::PersonaMerged]',
        expandSeed: '[Persona::expandSeed]',
        closeSeed: '[Persona::closeSeed]',
        zoomUpdateFromUser: '[Persona::zoomUpdateFromUser]',
    },
    config: {
        animationsDurationBase: 100,
        transitionsDuration: 500,
        moveEnabled: false,
        mergeEnabled: true,
        mergeOverlapRatio: 0.3,
        mergeScaleRatio: 1.05,
        drawOrbits: true,
        seedAnimationDurationBase: 400,
        autoGenerateFallbackColors: true,
        autoColorClampMin: 40,
        autoColorClampMax: 220,
        forceGreyscaleBackgroundColor: true,
        fallbackBackgroundColor: '#444444',
        subSelectEffectEnabled: true,
        subSelectEffectCompatibilityMode: true,
        registerWindowResize: true,
        displayTotalCountLabel: true,
        displayLabelsAtOneCount: true,
        renderSubSelectionBackground: true,
        renderGaugeSeparators: false,
        gaugeSeparatorWidth: 0.003,
    },
};
