export const userTemplate = {
    "isActive": true,
    "details": {
        "name": "",
        "username": "",
        "emailPref": "",
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
