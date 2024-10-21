export const userTemplate = {
    "fName": "",
    "lName": "",
    "username": "",
    "email": "",
    "organization": "",
    "title": "",
    "phone": "",
    "namePrefix": "",
    "isActive": true,
    "settings": {
        "lightMode": true,
        "emailNotifs": true,
        "phoneNotifs": true,
        "deadlineReminders": true,
    },
    "privacy": {
        "visibility": "friends-only", // Will use public, private, or friends-only at string
    },
    "customLists": []
};

export const listTemplate = {
    "checkbox": {
        "label": "",
        "value": false
    },
    "calendar": {
        "NOT IMPLEMENTED": "" //! ===================================
    },
    "text": {
        "label": "",
        "value": ""
    },
    "contacts": {
        "label": "",
        "value": []
    },
    "custom": {
        "label": "",
        "value": {}
    }
}
