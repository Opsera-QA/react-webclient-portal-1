import {fieldValidation} from "../../utils/formValidation";

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
      console.log("This.metadata: " + JSON.stringify(Object.keys(this.metaData.fields)));
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
        if (this.data[id] !== newValue) {
          this.propertyChange(id, newValue, this.data[id]);
          this.data[id] = newValue;
        }
      }
    })
  }

  validateData = () => {
    let errors = {};
    let errorCount = 0;

    // TODO: Get for loop working without this when metadata is properly implemented
    for (const field of this.metaData.fields) {
      errorCount = this.validateField(field, errors, errorCount);
    }
    if (errorCount < 1) {
      return true;
    }
    return errors;
  }

  validateField = (field, errors, errorCount) => {
    const validationErrors = fieldValidation(this.data[field.id], field);
    if (validationErrors.errorMessages != null) {
      errors[field.name] = validationErrors.errorMessages;
      errorCount += 1;
    }

    return errorCount;
  }

  propertyChange = (id, newValue, oldValue) => {
    if (!this.changeMap.has(id)) {
      console.log("Field added to change map: " + id);
      console.log("oldValue: " + oldValue);
      console.log("newValue: " + newValue);
      this.changeMap.set(id, newValue);

      if (this.dataState !== DataState.NEW) {
        this.dataState = DataState.CHANGED;
      }
    }
    else if (this.changeMap.get(id) === newValue
         || (this.changeMap.get(id) === null && newValue === null)) {
      console.log("Fieldname removed from change map: " + id);
      this.changeMap.delete(id);

      if (this.changeMap.size === 0 && this.dataState === DataState.CHANGED) {
        this.dataState  = DataState.LOADED;
      }
    }
  };

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


