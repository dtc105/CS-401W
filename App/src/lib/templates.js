export const userTemplate = {
    "fName": "",
    "lName": "",
    "username": "",
    "email": "",
    "organization": "",
    "title": "",
    "phone": "",
    "namePrefix": "",
    "settings": {
        "key": "value" // !
    },
    "privacy": {
        "key": "value" // !
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

export const newContactTest = { //prefilled fields for testing
    "label": "Slambert",
    "nameFirst": "Scott",
    "nameLast": "Lambert",
    "nameMiddle": "",
    "namePrefix": "Dr",
    "nameSuffix": "",
    "email": [
        {
            "label": "School",
            "emailAddress": "me@email.com",
        },
        {
            "label": "Work",
            "emailAddress": "me@work.email.com",
        },
],
    "phoneNumbers": [{
        "label": "Work",
        "number": "1234567890",
        "extention": "",
    }],
    "physicalAddress": [{
        "label": "Mailing",
        "streetOne": "123 Anywhere St",
        "streetTwo": "care of School of Buisness",
        "city": "Providence",
        "state": "RI",
        "country": "USA",
        "zipCode": "12345",
    }],
}

export const newAddressTest = { //For testing Purposes
    "label": "buisness, home, mailing, etc...",
    "streetOne": "123 Anywhere St",
    "streetTwo": "suite, apt, care of",
    "city": "City, Town",
    "state": "state/province",
    "country": "USA",
    "zipCode": "12345",
}
