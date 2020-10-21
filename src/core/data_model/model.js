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

    if (this.metaData != null && this.data && this.data instanceof Object) {
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
      },
      // configurable: true
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
    return validateData(this.data, this.metaData.fields);
  }

  // TODO Replace top method with getErrors and rename this
  isModelValid2 = () => {
    let isValid = validateData(this.data, this.metaData.fields);
    return isValid === true;
  }

  isFieldValid = (fieldName) => {
    return validateField(this.data, this.getFieldById(fieldName), {});
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
    let data = this.data;

    // Trim strings before sending to node
    return Object.keys(data).map(item => data[item] = typeof data[item] == 'string' ? data[item].trim() : data[item]);
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

  getDetailViewLink = () => {
    return this.metaData.detailView(this);
  };

  getLabel = (fieldName) => {
    let fields = this.metaData.fields;
    // TODO: Replace with metadata helper call once finished
    let field = fields.find(field => { return field.id === fieldName});
    return field.label;
  };

  getMetaData = () => {
    return this.metaData;
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

  getType = () => {
    return this.metaData["type"];
  }

  getFieldById = (id) => {
    return this.metaData.fields.find(field => {
      return field.id === id });
  };

  // TODO: Should we make view definitions?
  getNewObjectFields = () => {
    return this.metaData.newObjectFields != null ? this.metaData.newObjectFields : {};
  };

  clone = () => {
    return new Model(JSON.parse(JSON.stringify(this.data)), this.metaData, this.newModel);
  }
}

export default Model;


