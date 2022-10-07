"use strict";

function view() {

   const createPhoneCard = (data) => {
        const wrapperElement = document.createElement("div");
        wrapperElement.classList.add("phoneCard");
       wrapperElement.setAttribute("data-phoneCard-id", data.id);
        wrapperElement.innerHTML = `
<div class="phoneCard-wrapper row">
<div class="col-9">
         <div class="nameCard searchName">${data.inputName}</div>
         <div class="phoneBook searchPhone">${data.inputPhone}</div>
         <div class="jobCard">${data.inputJob}</div>
</div>
<div class="buttons-wrapper col-3">
<button type="button" class="edit-phoneCard">Edit</button>
<button type="button" class="remove-phoneCard">Remove</button>
<button type="button" class="info-phoneCard">Info</button>
</div>
</div>`


        return wrapperElement;
    };

    return {
        textarea: null,
        phoneContainer: null,
        modalSaveWindow: null,
        currentPhoneCardID: null,


        renderModalForPhoneSaving () {
            const modalSelector = document.body.querySelector('#exampleModal');
            modalSelector.classList.add('show');
            modalSelector.setAttribute("style", "display: block");
            modalSelector.removeAttribute("aria-hidden");
            modalSelector.setAttribute("aria-modal", "true");
            modalSelector.setAttribute("role", "dialog");
        },

        unRenderModalForPhoneSaving () {
            const modalSelector = document.body.querySelector('#exampleModal');
            modalSelector.classList.add('hide');
            modalSelector.setAttribute("style", "display: none");
            modalSelector.setAttribute("aria-hidden", "true");
            modalSelector.removeAttribute("aria-modal");
            modalSelector.removeAttribute("role");
        },

        renderPhoneCard (data) {
            const itemTemplate = createPhoneCard(data);
            this.phoneContainer.append(itemTemplate);

        },

        updatedPhoneCard (data) {


            document.querySelector(`[data-phonecard-id="${data.id}"]`).remove();
            const itemTemplate = createPhoneCard(data);
            this.phoneContainer.append(itemTemplate);
        },

        clearForm() {

            this.modalSaveWindow.querySelector("[name=inputName]").value="";
            this.modalSaveWindow.querySelector("[name=inputPhone]").value="";
            this.modalSaveWindow.querySelector("[name=inputJob]").value="";

        },

        removePhoneCard (id) {
            document.querySelector(`[data-phonecard-id="${id}"]`).remove();

        },

        editPhoneCard (data) {
            const modalSelector = document.body.querySelector('#exampleModalInfo');
            modalSelector.classList.add('show');
            modalSelector.setAttribute("style", "display: block");
            modalSelector.removeAttribute("aria-hidden");
            modalSelector.setAttribute("aria-modal", "true");
            modalSelector.setAttribute("role", "dialog");

        },

        unRenderInfoModalPhoneCard () {
            const modalSelector = document.body.querySelector('#exampleModalInfo');
            modalSelector.classList.add('hide');
            modalSelector.setAttribute("style", "display: none");
            modalSelector.setAttribute("aria-hidden", "true");
            modalSelector.removeAttribute("aria-modal");
            modalSelector.removeAttribute("role");
        },

        renderingInfoAboutPhoneCard (currentPhoneCard) {

            const data = currentPhoneCard.reduce((acc, item) => {
                acc = item;
                return acc;
            }, {})

            this.currentPhoneCardID = data.id;


            const infoModal = document.querySelector('#exampleModalInfo');
            infoModal.querySelector("[name=inputName]").value = data.inputName;
            infoModal.querySelector("[name=inputPhone]").value = data.inputPhone;
            infoModal.querySelector("[name=inputJob]").value = data.inputJob;

        },

        deleteSubmitButtonFromInfoModal () {
            const infoModal = document.querySelector('#exampleModalInfo');
            infoModal.querySelector("#submitModalButtonInfo").style = "display:none";

        },

        replaceSubmitButtonFromInfoModal () {
            const infoModal = document.querySelector('#exampleModalInfo');
            infoModal.querySelector("#submitModalButtonInfo").style = "display:block";

        },

        returningIDToModel () {
            return this.currentPhoneCardID;

        },

        searchItem (value, phoneCards, searchValue) {

            if (value === "") {
                phoneCards.forEach((item) => {
                    item.classList.remove('hide');
                    console.log(item)
                })
                return
            }


            if (typeof value === "string") {

                phoneCards.forEach((item) => {
                    const innerContactPhone = item.querySelector('.searchPhone');
                    const itemNumber = innerContactPhone.textContent;
                    const isContainValuePhone = searchValue.test(itemNumber);

                    const innerContactName = item.querySelector('.searchName');
                    const itemText = innerContactName.textContent;
                    const isContainValueName = searchValue.test(itemText)


                    if (!isContainValuePhone && !isContainValueName) {
                        item.classList.add("hide");
                    } else {
                        item.classList.remove("hide");
                    }
                })

            }




        },




        init(textareaElement, phoneContainer, modalSaveWindow) { // textarea and phoneBook elements
            this.textarea = textareaElement;
            this.modalSaveWindow = modalSaveWindow;
            this.phoneContainer = phoneContainer;
        }
    }
}
