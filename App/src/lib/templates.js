export const userTemplate = {
    "isActive": true,
    "details": {
        'avatar': '',
        "name": "",
        "username": "",
        "email": "",
        "organization": "",
        "title": "",
        "phone": "",
        "namePrefix": ""
    },
    "groups": [],
    "connections": [],
    "settings": {
        "lightMode": true,
        "emailNotifs": true,
        "phoneNotifs": true,
        "deadlineReminders": true,
    },
    "privacy": {
        "visibility": "friends-only", // Will use public, private, or friends-only at string
    },
    "Events": {
        "ownedEvents": [],
        "allowedEvents": []
    },
    "customLists": []
};

export const listTemplate = {
    "checkbox": {
        "ListName": "Name Me",
        "ListType": "checkbox",
        "data": [
            {
                "name": "Name Me",
                "value": false,
                "myUID" : 0,
            }
        ], 
        
    },
    "calendar": {
        "NOT IMPLEMENTED": "",
        "ListName": "My Calendar",
        "ListType": "calendar",
        "data": {
            "label": "",
            "value": false,
        },
    },
    "text": {
        "ListName": "textbox",
        "ListType": "text",
        "data": "start here",
    },
    "contacts": {
        "ListName": "My Contacts",
        "ListType": "contacts",
        "data": [{
            "label": "",
            "nameFirst": "FirstName",
            "nameLast": "Last Name",
            "nameMiddle": "MiddleName",
            "namePrefix": "Mrs., Mr., Dr., etc..",
            "nameSuffix": "Sr, Jr, III",
            "email": [{
                "label": "work, personal, school",
                "emailAdress": "me@email.com",
            }],
            "phoneNumbers": [{
                "label": "home, work, cell",
                "number": "1234567890",
                "extention": "12345",
            }],
            "physicalAddress": [{
                "label": "buisness, home, mailing, etc...",
                "streetOne": "123 Anywhere St",
                "streetTwo": "suite, apt, care of",
                "city": "City, Town",
                "state": "state/province",
                "country": "USA",
                "zipCode": "12345",
            }],
        }],
    },
    "custom": {
        "ListName": "Something Custom",
        "ListType": "custom",
        "data": {
            "label": "",
            "value": {},
        },
    }
}

export const newContact = {
    "label": "Some label",
    "nameFirst": "FirstName",
    "nameLast": "Last Name",
    "nameMiddle": "MiddleName",
    "namePrefix": "Mrs., Mr., Dr., etc..",
    "nameSuffix": "Sr, Jr, III",
    "email": [{
        "label": "work, personal, school",
        "emailAddress": "me@email.com",
    }],
    "phoneNumbers": [{
        "label": "home, work, cell",
        "number": "1234567890",
        "extention": "12345",
    }],
    "physicalAddress": [{
        "label": "buisness, home, mailing, etc...",
        "streetOne": "123 Anywhere St",
        "streetTwo": "suite, apt, care of",
        "city": "City, Town",
        "state": "state/province",
        "country": "USA",
        "zipCode": "12345",
    }],
}

export const newAddress = {
    "label": "buisness, home, mailing, etc...",
    "streetOne": "123 Anywhere St",
    "streetTwo": "suite, apt, care of",
    "city": "City, Town",
    "state": "state/province",
    "country": "USA",
    "zipCode": "12345",
}
