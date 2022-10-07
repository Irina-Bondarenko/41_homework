"use strict";

function controller (view, model, payload) {

    const hideSwitcher = "hide";
    const unHideSwitcher = "un-hide";

    const textareaSelector = payload.textareaSelector;
    const phoneContainerSelector = payload.phoneContainerSelector;
    const addToPhoneBookButtonSelector = payload.addToPhoneBookButton;
    const modalSaveSelector = payload.modalSaveSelector;
    const modalInfoSelector = payload.modalInfoSelector;


    const textarea = document.querySelector(textareaSelector);
    const phoneContainer = document.querySelector(phoneContainerSelector);
    const addToPhoneBookButton = document.querySelector(addToPhoneBookButtonSelector);
    const modalSaveWindow = document.querySelector(modalSaveSelector);
    const modalInfo = document.querySelector(modalInfoSelector);



    const selectorValidation = (textareaSelector, phoneContainerSelector) => {
        if (
            typeof textareaSelector !== "string" ||
            typeof phoneContainerSelector !== "string"
        )
            throw new Error("Invalid textarea or phoneBook selector");
        if (textareaSelector.trim() === 0 ||
            phoneContainerSelector.trim() === 0)
            throw new Error("Selector is empty");
    };
    const formValidation = (textareaSelector) => {
        if (!(textareaSelector instanceof HTMLTextAreaElement))
            throw new Error("Textarea was not found");
    };

    selectorValidation(textareaSelector, phoneContainerSelector);
    // formValidation(textarea);

    model.init(textareaSelector);
    view.init(textarea, phoneContainer, modalSaveWindow, modalInfo);


    const searchHandler = event => {
        event.preventDefault()
        event.stopPropagation();

        const value = event.target.value.trim();
        const phoneCards = document.querySelectorAll(".phoneCard-wrapper");
        const searchValue = new RegExp(value, 'gi');
        view.searchItem(value, phoneCards, searchValue);

    };
    const saveToPhoneBookModalHandler = event => {
        view.renderModalWindow(modalSaveWindow)
    };

    const fetchFormData = inputs => {
        let data = inputs;
        if (inputs instanceof NodeList) {
            data = Array.from(inputs);
        }
        return data.reduce((acc, item) => {
            acc[item.name] = item.value;
            return acc;
        }, {});
    };

    const modalSaveHandler = event => {
        event.stopPropagation();

        if (event.target instanceof HTMLButtonElement) {
            if(event.target.getAttribute('id') === "closeModalButton" || "closeModalButtonImg") {
                view.unRenderModalWindow(modalSaveWindow)
            }
            if(event.target.getAttribute('id') === "submitModalButton") {

                const inputs = modalSaveWindow.querySelectorAll("input");
                const data = model.setData(fetchFormData(inputs));

                if (!data.success) throw new Error("Something wrong with saving data");

                view.renderPhoneCard(data.savedData);
                view.clearForm()
            }
        }





    };

    const buttonsPhoneCardHandler = event => {
        event.preventDefault();

        let phoneCardID = event.target
            .closest("[data-phonecard-id]")
            .getAttribute("data-phonecard-id");
        phoneCardID = Number(phoneCardID);

        if(event.target.classList.contains("remove-phoneCard")) {

            model.removePhoneCard(phoneCardID);
            view.removePhoneCard(phoneCardID);
        } else if (event.target.classList.contains("info-phoneCard")) {
            view.inputsBlocking(true);

            view.switcherSubmitButtonFromInfoModal(hideSwitcher);

            // const data = model.searchPhoneCard(phoneCardID)
            view.renderModalWindow(modalInfo);

            const currentPhoneCard = model.returningFoundedPhoneCard();
            view.renderingInfoAboutPhoneCard(currentPhoneCard)
        }
        else if (event.target.classList.contains("edit-phoneCard")) {
            view.inputsBlocking(false);

            view.switcherSubmitButtonFromInfoModal(unHideSwitcher);
            const data = model.searchPhoneCard(phoneCardID)
            view.renderModalWindow (modalInfo);

            const currentPhoneCard = model.returningFoundedPhoneCard();
            view.renderingInfoAboutPhoneCard(currentPhoneCard)


        }

    }

    const modalInfoHandler = event => {
        event.stopPropagation();

        if (!(event.target instanceof HTMLButtonElement)) return;

        if (event.target instanceof HTMLButtonElement) {

            if (event.target.getAttribute('id') === "closeModalButtonInfo" || "closeModalButtonImgInfo") {
                view.unRenderModalWindow(modalInfo)
            }

           if (event.target.getAttribute('id') === "submitModalButtonInfo") {
               const inputs = modalInfo.querySelectorAll("input");
               const phoneCardID = view.returningIDToModel()
               const data = model.setUpdatedData(fetchFormData(inputs), phoneCardID);
               view.updatedPhoneCard(data);

           }

        }

    };

    const loadHandler = () => {
        const phoneCards = model.getData();
        if (!phoneCards) return;

        phoneCards.forEach(item => view.renderPhoneCard(item));

    };







    textarea.addEventListener('keyup', searchHandler);
    addToPhoneBookButton.addEventListener('click', saveToPhoneBookModalHandler);
    modalSaveWindow.addEventListener('click', modalSaveHandler);
    window.addEventListener("DOMContentLoaded", loadHandler);
    phoneContainer.addEventListener("click", buttonsPhoneCardHandler);
    modalInfo.addEventListener("click", modalInfoHandler);



    return {};
}

