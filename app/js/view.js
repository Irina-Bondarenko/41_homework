"use strict";

function view() {
  const createPhoneCard = (data) => {
    const wrapperElement = document.createElement("div");
    wrapperElement.classList.add("phoneCard");
    wrapperElement.setAttribute("data-phoneCard-id", data.id);
    wrapperElement.innerHTML = `
<div class="phoneCard-wrapper row">
<div class="col-9 phone-card">
         <div class="nameCard searchName">${data.inputName}</div>
         <div class="phoneBook searchPhone">${data.inputPhone}</div>
         <div class="jobCard">${data.inputJob}</div>
</div>
<div class="buttons-wrapper col-3">
<button type="button" class="edit-phoneCard">Edit</button>
<button type="button" class="remove-phoneCard">Remove</button>
<button type="button" class="info-phoneCard">Info</button>
</div>
</div>`;

    return wrapperElement;
  };

  return {
    phoneContainer: null,
    modalSaveWindow: null,
    modalInfoWindow: null,
    currentPhoneCardID: null,

    renderPhoneCard(data) {
      const itemTemplate = createPhoneCard(data);
      this.phoneContainer.append(itemTemplate);
    },

    updatedPhoneCard(data) {
      document.querySelector(`[data-phonecard-id="${data.id}"]`).remove();
      const itemTemplate = createPhoneCard(data);
      this.phoneContainer.append(itemTemplate);
    },

    clearForm() {
      const modalSaveWindowInputs =
        this.modalSaveWindow.querySelectorAll("input");
      modalSaveWindowInputs.forEach((item) => (item.value = ""));
    },

    removePhoneCard(id) {
      document.querySelector(`[data-phonecard-id="${id}"]`).remove();
    },

    inputsBlocking(switcherBoolean) {
      const modalInfoWindowInputs =
        this.modalInfoWindow.querySelectorAll("input");
      modalInfoWindowInputs.forEach(
        (item) => (item.disabled = switcherBoolean)
      );
    },

    renderModalWindow(modalInfo) {
      modalInfo.classList.add("show");
      modalInfo.setAttribute("style", "display: block");
      modalInfo.removeAttribute("aria-hidden");
      modalInfo.setAttribute("aria-modal", "true");
      modalInfo.setAttribute("role", "dialog");
    },

    unRenderModalWindow(modalInfo) {
      modalInfo.classList.add("hide");
      modalInfo.setAttribute("style", "display: none");
      modalInfo.setAttribute("aria-hidden", "true");
      modalInfo.removeAttribute("aria-modal");
      modalInfo.removeAttribute("role");
    },

    renderingInfoAboutPhoneCard(currentPhoneCard) {
      const data = currentPhoneCard.reduce((acc, item) => {
        acc = item;
        return acc;
      }, {});

      this.currentPhoneCardID = data.id;

      this.modalInfoWindow.querySelector("[name=inputName]").value =
        data.inputName;
      this.modalInfoWindow.querySelector("[name=inputPhone]").value =
        data.inputPhone;
      this.modalInfoWindow.querySelector("[name=inputJob]").value =
        data.inputJob;
    },

    switcherSubmitButtonFromInfoModal(switcher) {
      if (switcher === "hide") {
        this.modalInfoWindow
          .querySelector("#submitModalButtonInfo")
          .classList.add(switcher);
      } else {
        this.modalInfoWindow
          .querySelector("#submitModalButtonInfo")
          .classList.remove("hide");
      }
    },

    searchItem(value, phoneCards, searchValue) {
      if (value === "") {
        phoneCards.forEach((item) => {
          item.classList.remove("hide");
        });
        return;
      }

      if (typeof value === "string") {
        phoneCards.forEach((item) => {
          const innerContactPhone = item.querySelector(".searchPhone");
          const itemNumber = innerContactPhone.textContent;
          const isContainValuePhone = searchValue.test(itemNumber);

          const innerContactName = item.querySelector(".searchName");
          const itemText = innerContactName.textContent;
          const isContainValueName = searchValue.test(itemText);

          if (!isContainValuePhone && !isContainValueName) {
            item.classList.add("hide");
          } else {
            item.classList.remove("hide");
          }
        });
      }
    },

    init(phoneContainer, modalSaveWindow, modalInfo) {
      this.modalSaveWindow = modalSaveWindow;
      this.modalInfoWindow = modalInfo;
      this.phoneContainer = phoneContainer;
    },
  };
}
