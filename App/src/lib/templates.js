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
        "data": {
            "label": "",
            "value": [],
        },
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
