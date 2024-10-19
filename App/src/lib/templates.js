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
        "data": {
            "task": false,
        },
        
    },
    "calendar": {
        "NOT IMPLEMENTED": "",
        "ListName": "",
        "ListType": "calendar",
        "data": {
            "label": "",
            "value": false,
        },
    },
    "text": {
        "ListName": "",
        "ListType": "text",
        "data": {
            "label": "",
            "value": "",
        },
    },
    "contacts": {
        "ListName": "",
        "ListType": "contacts",
        "data": {
            "label": "",
            "value": [],
        },
    },
    "custom": {
        "ListName": "",
        "ListType": "custom",
        "data": {
            "label": "",
            "value": {},
        },
    }
}
