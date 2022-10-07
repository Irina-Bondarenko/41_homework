"use strict";

function model() {
    return {
        dbName: null,
        currentID: null,
        infoPhoneCard: null,

        setDBName (key) {
            if (!key.trim()) throw new Error("Incorrect key");

            this.dbName = key;
        },

        getData() {
          return JSON.parse(localStorage.getItem(this.dbName));
        },

        setData(data) {
            let response = null;
            const inputsFromModalData = structuredClone(data);
            const savedData = this.getData();
            const dataToSave = savedData ? savedData : [];

            inputsFromModalData.id = this.currentID;

            dataToSave.push(inputsFromModalData);

            try {
                localStorage.setItem(this.dbName, JSON.stringify(dataToSave));
                response = { success: true, savedData: inputsFromModalData };
                this.currentID += 1;

            } catch (error) {
                response = { success: false, savedData: error };
            }
            return response;
        },

        setUpdatedData (data, phoneCardID) {
            let response = null;
            const inputsFromModalData = structuredClone(data);
            const savedData = this.getData();
            let dataToSave = savedData ? savedData : [];

            inputsFromModalData.id = phoneCardID;

           let dataToSaveWithoutCurrentCard = dataToSave.filter(function (item) {
              return  !(item.id === inputsFromModalData.id)
           })

            dataToSaveWithoutCurrentCard.push(inputsFromModalData);
            localStorage.setItem(this.dbName, JSON.stringify(dataToSaveWithoutCurrentCard));
            return inputsFromModalData;

        },

        removePhoneCard (id) {
            const data = this.getData();

            const updatedData = data.filter(phoneCard => phoneCard.id !== id);
            if (updatedData.length) {
                localStorage.setItem(this.dbName, JSON.stringify(updatedData));
            } else {
                localStorage.removeItem(this.dbName);
            }
        },

        searchPhoneCard (id) {
            const data = this.getData();

            const foundedPhoneCard = data.filter(phoneCard => phoneCard.id === id);
            this.infoPhoneCard = foundedPhoneCard;

            return foundedPhoneCard;
        },

        returningFoundedPhoneCard () {
            return this.infoPhoneCard;
        },

        inputsBlocking () {

            const exampleModalInfo = document.querySelector("#exampleModalInfo");
            exampleModalInfo.querySelector("[name=inputName]").disabled = true;
            exampleModalInfo.querySelector("[name=inputPhone]").disabled = true;
            exampleModalInfo.querySelector("[name=inputJob]").disabled = true;

        },

        inputsUnBlocking () {

            const exampleModalInfo = document.querySelector("#exampleModalInfo");
            exampleModalInfo.querySelector("[name=inputName]").disabled = false;
            exampleModalInfo.querySelector("[name=inputPhone]").disabled = false;
            exampleModalInfo.querySelector("[name=inputJob]").disabled = false;

        },


        init(dbKey) { //textareaSelector '#formControl'
            this.setDBName(dbKey);

            const savedData = this.getData();
            this.currentID = savedData ? savedData[savedData.length - 1].id + 1 : 1;

        }
    }
}
