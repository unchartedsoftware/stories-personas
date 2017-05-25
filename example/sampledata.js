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

function getSampleData () {
    var data = {
        "entityRefs": {
            "ANIMAL_1": {
                "id": "ANIMAL_1",
                "name": "Smokey",
                "type": "animal",
                "imageUrl": ["./images/cat1.jpg"]
            },
            "ANIMAL_2": {
                "id": "ANIMAL_2",
                "name": "Misty",
                "type": "animal",
                "imageUrl": ["./images/cat2.jpg"]
            },
            "ANIMAL_3": {
                "id": "ANIMAL_3",
                "name": "Fido",
                "type": "animal",
                "imageUrl": ["./images/dog1.jpg"]
            },
            "ANIMAL_4": {
                "id": "ANIMAL_4",
                "name": "Lola",
                "type": "animal",
                "imageUrl": ["./images/dog2.jpg"]
            },
            "ANIMAL_5": {
                "id": "ANIMAL_5",
                "name": "Rover",
                "type": "animal",
                "backgroundColor": "#441133"
            },
            "LOCATION_0": {
                "id": "LOCATION_0",
                "name": "New York",
                "type": "location",
                "imageUrl": ["./images/newyork1.jpg"]
            },
            "LOCATION_1": {
                "id": "LOCATION_1",
                "name": "U.S.",
                "type": "location",
                "backgroundColor": "#223355"
            },
            "ORGANIZATION_0": {
                "id": "ORGANIZATION_0",
                "name": "New York Veterinary Clinic",
                "type": "organization",
                "imageUrl": ["./images/vet1.jpg"]
            },
            "ORGANIZATION_1": {
                "id": "ORGANIZATION_1",
                "name": "American Veterinary Clinic",
                "type": "organization",
                "imageUrl": ["./images/vet2.jpg"]
            }
        },
        "aggregates": {
            "personas": {
                "0": {
                    "id": "0",
                    "properties": [
                        {
                            "entityRefId": "ANIMAL_1",
                            "count": 37,
                            "isprimary": true,
                            "color": null
                        },
                        {
                            "entityRefId": "ANIMAL_2",
                            "count": 20,
                            "color": null
                        },
                        {
                            "entityRefId": "ANIMAL_3",
                            "count": 15,
                            "color": null
                        }
                    ],
                    "imageUrl": null,
                    "totalCount": 111,
                    "customSize": 10
                },
                "1": {
                    "id": "1",
                    "properties": [
                        {
                            "entityRefId": "ANIMAL_2",
                            "count": 36,
                            "isprimary": true,
                            "color": null
                        }
                    ],
                    "imageUrl": null,
                    "totalCount": 111,
                    "customSize": 9
                },
                "2": {
                    "id": "2",
                    "properties": [
                        {
                            "entityRefId": "ORGANIZATION_0",
                            "count": 28,
                            "isprimary": true,
                            "color": null
                        }
                    ],
                    "imageUrl": null,
                    "totalCount": 44,
                    "customSize": 8
                },
                "3": {
                    "id": "3",
                    "properties": [
                        {
                            "entityRefId": "ANIMAL_5",
                            "count": 16,
                            "isprimary": true,
                            "color": null,
                        }
                    ],
                    "imageUrl": null,
                    "totalCount": 111,
                    "customSize": 7
                },
                "4": {
                    "id": "4",
                    "properties": [
                        {
                            "entityRefId": "ORGANIZATION_1",
                            "count": 16,
                            "isprimary": true,
                            "color": null
                        }
                    ],
                    "imageUrl": null,
                    "totalCount": 44,
                    "customSize": 6
                },
                "5": {
                    "id": "5",
                    "properties": [
                        {
                            "entityRefId": "LOCATION_0",
                            "count": 15,
                            "isprimary": true,
                            "color": null
                        }
                    ],
                    "imageUrl": null,
                    "totalCount": 28,
                    "customSize": 5
                },
                "6": {
                    "id": "6",
                    "properties": [
                        {
                            "entityRefId": "ANIMAL_4",
                            "count": 14,
                            "isprimary": true,
                            "color": null
                        }
                    ],
                    "imageUrl": null,
                    "totalCount": 111,
                    "customSize": 4
                },
                "7": {
                    "id": "7",
                    "properties": [
                        {
                            "entityRefId": "LOCATION_1",
                            "count": 13,
                            "isprimary": true,
                            "color": null
                        }
                    ],
                    "imageUrl": null,
                    "totalCount": 28,
                    "customSize": 3
                },
                "8": {
                    "id": "8",
                    "properties": [
                        {
                            "entityRefId": "ANIMAL_3",
                            "count": 8,
                            "isprimary": true,
                            "color": null
                        }
                    ],
                    "imageUrl": null,
                    "totalCount": 111,
                    "customSize": 2
                }
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
                "11": {
                    "id":"11",
                    "relatedTo": "2",
                    "properties": [{
                        "type": "phonenumber",
                        "count": 12,
                        "value": "1 800 555 1212"
                    }]
                },
            },
            "links": [
                {
                    "source": "3",
                    "target": "0",
                    "weight": 0.3
                },
                {
                    "source": "4",
                    "target": "0",
                    "weight": 0.2
                },
                {
                    "source": "5",
                    "target": "0",
                    "weight": 0.1
                },
                {
                    "source": "2",
                    "target": "0",
                    "weight": 0.9
                },
                {
                    "source": "5",
                    "target": "1",
                    "weight": 0.3
                },
                {
                    "source": "6",
                    "target": "1",
                    "weight": 0.2
                },
                {
                    "source": "7",
                    "target": "2",
                    "weight": 0.5
                },
                {
                    "source": "8",
                    "target": "2",
                    "weight": 0.5
                }
            ],
            "other": {
                "count": 9,
                "metadata:": {
                    "anything": "can be stored here"
                }
            }
        }
    };

    return data;
}

function getExtraSampleData() {
    var data = {
        "entityRefs": {
            "ANIMAL_1": {
                "id": "ANIMAL_1",
                "name": "Smokey",
                "type": "animal",
                "imageUrl": ["./images/cat5.jpg"]
            },
            "ANIMAL_2": {
                "id": "ANIMAL_2",
                "name": "Misty",
                "type": "animal",
                "imageUrl": "./images/cat6.jpg"
            },
            "ANIMAL_3": {
                "id": "ANIMAL_3",
                "name": "Fido",
                "type": "animal",
                "imageUrl": "./images/dog4.jpg"
            },
            "ANIMAL_4": {
                "id": "ANIMAL_4",
                "name": "Lola",
                "type": "animal",
                "imageUrl": "./images/dog6.jpg"
            },
            "ANIMAL_5": {
                "id": "ANIMAL_5",
                "name": "Rover",
                "type": "animal",
                "imageUrl": "./images/dog3.jpg"
            },
            "LOCATION_0": {
                "id": "LOCATION_0",
                "name": "New York",
                "type": "location",
                "imageUrl": "./images/newyork1.jpg"
            },
            "LOCATION_1": {
                "id": "LOCATION_1",
                "name": "U.S.",
                "type": "location",
                "imageUrl": "./images/usa2.jpg"
            },
            "ORGANIZATION_0": {
                "id": "ORGANIZATION_0",
                "name": "New York Veterinary Clinic",
                "type": "organization",
                "imageUrl": "./images/vet1.jpg"
            },
            "ORGANIZATION_1": {
                "id": "ORGANIZATION_1",
                "name": "American Veterinary Clinic",
                "type": "organization",
                "imageUrl": "./images/vet2.jpg"
            }
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
                "2": {
                    "id": "2",
                    "properties": [
                        {
                            "entityRefId": "ORGANIZATION_0",
                            "count": 32,
                            "isprimary": true,
                            "color": null
                        }
                    ],
                    "imageUrl": null,
                    "totalCount": 44
                },
                "3": {
                    "id": "3",
                    "properties": [
                        {
                            "entityRefId": "ANIMAL_5",
                            "count": 84,
                            "isprimary": true,
                            "color": null
                        }
                    ],
                    "imageUrl": null,
                    "totalCount": 111
                },
                "4": {
                    "id": "4",
                    "properties": [
                        {
                            "entityRefId": "ORGANIZATION_1",
                            "count": 16,
                            "isprimary": true,
                            "color": null
                        }
                    ],
                    "imageUrl": null,
                    "totalCount": 44
                },
                "9": {
                    "id": "9",
                    "properties": [
                        {
                            "entityRefId": "ANIMAL_4",
                            "count": 101,
                            "isprimary": true,
                            "color": null
                        }
                    ],
                    "imageUrl": null,
                    "totalCount": 111
                }
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
                "13": {
                    "id":"13",
                    "relatedTo": "9",
                    "properties": [{
                        "type": "phonenumber",
                        "count": 53,
                        "value": "1 888 555 9999"
                    }]
                }
            },
            "links": [
                {
                    "source": "3",
                    "target": "9",
                    "weight": 0.9
                }
            ],
            "other": {
                "count": 0
            }
        }
    };

    return data;
}

function getIconMap () {
    var iconMap = [
        {
            "type": "animal",
            "class": "fa fa-square",
            "color": "#d26502",
            "entityRefId": "ANIMAL_1",
            "name": "Smokey"
        },
        {
            "type": "animal",
            "class": "fa fa-square",
            "color": "#8F8F8F",
            "isDefault": true
        },
        {
            "type": "location",
            "class": "fa fa-globe",
            "color": "#a68900",
            "isDefault" : true
        },
        {
            "type": "organization",
            "class": "fa fa-building",
            "color": "#8F8F8F",
            "isDefault": true
        }
    ];

    return iconMap;
}

function getSubSelectData01() {
    var data = {
        '0': {
            computePercentages: true,
            bars: [
                { count:15, color:'#abba44' }
            ]
        },
        '4': {
            computePercentages: true,
            bars: [
                { count:15, color:'#44baab' }
            ]
        },
        '8': {
            computePercentages: true,
            bars: [
                { count:15, color:'#ba44ab' }
            ]
        }
    };

    return data;
}

function getSubSelectData02() {
    var data = {
        '1': {
            computePercentages: true,
            bars: [
                { count:15, color:'#44abba' }
            ]
        },
        '4': {
            computePercentages: true,
            bars: [
                { count:15, color:'#baab44' }
            ]
        },
        '6': {
            computePercentages: true,
            bars: [
                { count:15, color:'#4baab4' }
            ]
        }
    };

    return data;
}
