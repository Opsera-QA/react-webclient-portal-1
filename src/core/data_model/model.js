import {fieldValidation, validateData, validateField} from "./modelValidation";

export const DataState = {
  LOADED: 0,
  CHANGED: 1,
  NEW: 2,
  DELETED: 3
}

export class Model {

  constructor(data, metaData, newModel) {
    this.data = data;
    this.metaData = metaData;
    this.newModel = newModel;
    this.dataState = DataState.LOADED;
    this.changeMap = new Map();
    this.loadData();
  }

  loadData = () => {
    if (this.newModel) {
      this.dataState = DataState.NEW;
    }

    if (this.metaData != null) {
      // console.log("This.metadata: " + JSON.stringify(Object.keys(this.metaData.fields)));
      // this.id = this.metaData.idProperty;
      for (const field of this.metaData.fields) {
        let id = field.id;
        this.defineProperty(id);
      }
    }
  }

  defineProperty = (id) => {
    Object.defineProperty(this, id, {
      get: () => {
        return this.data[id];
      },
      set: (newValue) => {
        if (this.getData(id) !== newValue) {
          this.propertyChange(id, newValue, this.getData(id));
          this.data[id] = newValue;
        }
      }
    })
  }

  getData = (fieldName) => {
    return this.data[fieldName];
  }

  setData = (fieldName, newValue) => {
      this.propertyChange(fieldName, newValue, this.getData(fieldName));
      this.data[fieldName] = newValue;
  }

  isModelValid = () => {
    let isValid = validateData(this.data, this.metaData.fields);

    //console.log("isValid: " + JSON.stringify(isValid));

    return isValid === true ? isValid : isValid;
  }

  isFieldValid = (fieldName) => {
    let isValid = validateField(this.data, this.getFieldById(fieldName), {});

    //console.log("isValid: " + JSON.stringify(isValid));

    return isValid === true ? isValid : isValid;
  }

  propertyChange = (id, newValue, oldValue) => {
    if (!this.changeMap.has(id)) {
      // console.log("Field added to change map: " + id);
      // console.log("oldValue: " + JSON.stringify(oldValue));
      // console.log("newValue: " + JSON.stringify(newValue));
      this.changeMap.set(id, oldValue);

      if (this.dataState !== DataState.NEW) {
        this.dataState = DataState.CHANGED;
      }
    }
    else if (this.changeMap.get(id) === newValue
         || (this.changeMap.get(id) === null && newValue === null)) {
      // console.log("Fieldname removed from change map: " + id);
      this.changeMap.delete(id);

      if (this.changeMap.size === 0 && this.dataState === DataState.CHANGED) {
        this.dataState  = DataState.LOADED;
      }
    }
  };

  // TODO: Only send changemap for updates after getting everything else working
  getPersistData = () => {
    return this.data;
  }

  isNew = () => {
    return this.newModel;
  }

  isChanged = (field) => {
    if (field) {
      return this.changeMap.has(field);
    }

    return this.dataState !== DataState.LOADED;
  };

  isDeleted = () => {
    return this.dataState === DataState.DELETED;
  };

  getLabel = (field) => {
    return this.metaData[field].label;
  };

  getMaxLength = (field) => {
    return this.metaData[field].maxLength;
  };

  getMinLength = (field) => {
    return this.metaData[field].minLength;
  };

  getId = (field) => {
    return this.metaData[field].id;
  };

  getFields = () => {
    return this.metaData.fields;
  };

  getFieldById = (id) => {
    return this.metaData.fields.find(field => {
      return field.id === id });
  };
}

export default Model;


