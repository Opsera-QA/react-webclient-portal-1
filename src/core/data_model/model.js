import {validateData, validateField} from "core/data_model/modelValidation";

export const DataState = {
  LOADED: 0,
  CHANGED: 1,
  NEW: 2,
  DELETED: 3
}

export class Model {

  constructor(data, metaData, newModel) {
    this.metaData = {...metaData};
    this.data = {...this.getNewObjectFields(), ...data};
    this.newModel = newModel;
    this.dataState = newModel ? DataState.NEW : DataState.LOADED;
    this.changeMap = new Map();
    this.loadData();
  }

  loadData = () => {
    if (this.metaData != null && this.data && this.data instanceof Object) {
      // console.log("This.metadata: " + JSON.stringify(Object.keys(this.metaData.fields)));
      // this.id = this.metaData.idProperty;
      for (const field of this.metaData.fields) {
        let id = field.id;
        this.defineProperty(id);
      }
    }
  };

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
  };

  /**
   * Retrieve nested item from object/array
   * @param {String} fieldName dot separated
   * @returns {*}
   */
  getNestedData = (fieldName) => {
    let index;
    const fieldNameArray = fieldName.split('.');
    const length = fieldNameArray.length;
    let nestedObject = {...this.data};

    for (index = 0; index < length; index++) {
      if(nestedObject == null) {
        return null;
      }

    let nextFieldName = fieldNameArray[index];
      nestedObject = nestedObject[nextFieldName];
    }

    return nestedObject !== undefined ? nestedObject : null;
  };


  getData = (fieldName) => {
    if (fieldName == null) {
      console.error("No field name was given, so returning null");
      return null;
    }

    return fieldName && fieldName.includes('.') ? this.getNestedData(fieldName) : this.data[fieldName];
  };

  setData = (fieldName, newValue) => {
      this.propertyChange(fieldName, newValue, this.getData(fieldName));
      this.data[fieldName] = newValue;
  };

  setMetaData = (metaData) => {
    this.metaData = metaData;
  };

  setMetaDataFields = (newMetaDataFields) => {
    this.metaData.fields = newMetaDataFields;
  };

  setTextData = (fieldName, newValue) => {
    const field = this.getFieldById(fieldName);
    if (field) {
      if (field.lowercase === true) {
        newValue = newValue.toLowerCase();
      }
      else if (field.uppercase === true) {
        newValue = newValue.toUpperCase();
      }

      // The input mask will limit text entry,
      // but complex validation can be done by using
      // "regexValidator" in metadata to not prevent text entry
      if (field.inputMaskRegex != null) {
        let format = field.inputMaskRegex;
        let meetsRegex = format.test(newValue);

        if (newValue !== '' && !meetsRegex) {
          return;
        }
      }

      this.propertyChange(fieldName, newValue, this.getData(fieldName));
      this.data[fieldName] = newValue;
    }
  };

  getArrayData = (fieldName) => {
    let currentValue = this.getData(fieldName);

    if (currentValue == null) {
      return [];
    }

    if (!Array.isArray(currentValue)) {
      console.error(`Value was not saved as array. Returning in array.`);
      console.error(`Value: ${JSON.stringify(currentValue)}`);
      return [currentValue];
    }

    return currentValue;
  };

  isModelValid = () => {
    return validateData(this);
  };

  // TODO Replace top method with getErrors and rename this
  isModelValid2 = () => {
    // Trim strings before testing validity
    this.trimStrings();
    let isValid = validateData(this);
    return isValid === true;
  };

  // This is a validity check without trimming
  checkCurrentValidity = () => {
    let isValid = validateData(this);
    return isValid === true;
  };

  isFieldValid = (fieldName) => {
    return validateField(this, this.getFieldById(fieldName));
  };

  // Returns first error if exists
  getFieldError = (fieldName) => {
    let errors = validateField(this, this.getFieldById(fieldName));
    return errors != null ? errors[0] : "";
  };

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

  clearChangeMap = () => {
    this.dataState = DataState.LOADED;
    this.changeMap = new Map();
  };

  // TODO: Only send changemap for updates after getting everything else working
  getPersistData = () => {
    return this.trimStrings();
  };

  trimStrings = () => {
    let data = this.data;

    // TODO: this is only at the top level, add support for trimming inner objects
    try {
      Object.keys(data).forEach(key => {
        if (typeof data[key] == 'string') {
          data[key] = data[key].trim();
        }
      });

      // save trimmed strings in data
      this.data = data;
    }
    catch (error) {
      console.error("Could not parse object's strings. Sending unparsed data.");
      return this.data;
    }

    return data;
  };

  isNew = () => {
    return this.newModel;
  };

  isChanged = (field) => {
    if (field) {
      return this.changeMap.has(field);
    }

    return this.dataState !== DataState.LOADED;
  };

  resetData = () => {
    this.changeMap.forEach((value, key) => {
      let originalValue = this.changeMap.get(key);
      this.setData(key, originalValue);
    });
  };

  getOriginalValue = (fieldName) => {
    return this.changeMap.get(fieldName);
  };

  isDeleted = () => {
    return this.dataState === DataState.DELETED;
  };

  isRequired = (fieldName) => {
    const field = this.getFieldById(fieldName);
    return field != null ? field.isRequired === true : false;
  };

  isLowercase = (fieldName) => {
    const field = this.getFieldById(fieldName);
    return field?.lowercase === true;
  };

  isUppercase = (fieldName) => {
    const field = this.getFieldById(fieldName);
    return field?.uppercase === true;
  };

  isWebsite = (fieldName) => {
    const field = this.getFieldById(fieldName);
    return field != null ? field.isWebsite === true : false;
  };

  getInputMaskRegex = (fieldName) => {
    const field = this.getFieldById(fieldName);
    return field != null ? field.inputMaskRegex : undefined;
  };

  getDetailViewLink = () => {
    return this.metaData?.detailView != null ? this.metaData.detailView(this) : null;
  };

  getDetailViewTitle = () => {
    return this.metaData?.detailViewTitle != null ? this.metaData.detailViewTitle(this) : null;
  };

  getLabel = (fieldName) => {
    let fields = this.metaData.fields;
    // TODO: Replace with metadata helper call once finished
    let field = fields.find(field => { return field.id === fieldName});
    return field ? field.label : "No label found in metadata";
  };

  getMetaData = () => {
    return this.metaData;
  };

  // TODO: Make filterModel and move filter related options there
  getActiveFilters = () => {
    return this.metaData.getActiveFilters(this);
  };

  getFilterValue = (fieldName) => {
    let filter = this.getData(fieldName);
    return filter != null && filter["value"] != null ? filter["value"] : filter;
  };

  // TODO: Add option to prepend text
  getFilterText = (fieldName) => {
    let filter = this.getData(fieldName);
    return filter != null && filter["text"] != null ? filter["text"] : filter;
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
    return this.metaData?.type;
  }

  getActiveField = () => {
    return this.metaData?.activeField;
  }

  getFieldById = (id) => {
    return this.metaData?.fields.find(field => {return field.id === id });
  };

  getDefaultValue = (fieldName) => {
    const newObjectFields = this.getNewObjectFields();
    return newObjectFields ? newObjectFields[fieldName] : undefined;
  };

  // TODO: Should we make view definitions?
  getNewObjectFields = () => {
    return this.metaData.newObjectFields != null ? this.metaData.newObjectFields : {};
  };

  clone = () => {
    return new Model(JSON.parse(JSON.stringify(this.data)), this.metaData, this.newModel);
  };
}

export default Model;


