"use strict";

void function () {
    const payload = {
        textareaSelector: '#formControl',
        phoneContainerSelector: '#phoneBook',
        addToPhoneBookButton: '#addToPhoneBookButton',
        modalSaveSelector: "#exampleModal",
        modalInfoSelector: "#exampleModalInfo",

    };

    const app = controller(view(), model(), payload);


}();
