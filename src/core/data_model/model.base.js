import {validateData, validateField} from "core/data_model/modelValidation";
import _ from "lodash";

export const DataState = {
  LOADED: 0,
  CHANGED: 1,
  NEW: 2,
  DELETED: 3
};

// TODO: After converting table to use Models instead of raw objects, the removal of these can probably happen
export const temporaryObjectProperties = [
  "$height",
  "id",
  "__v"
];

export class ModelBase {
  constructor(data, metaData, newModel, setStateFunction) {
    this.metaData = _.cloneDeep({...metaData});
    this.data = {...this.getNewObjectFields(), ...data};
    this.newModel = newModel;
    this.id = data?._id;
    this.dataState = newModel ? DataState.NEW : DataState.LOADED;
    this.setStateFunction = setStateFunction;
    this.changeMap = new Map();
    this.initializeObjectProperties({...metaData});
    this.isLoading = false;
    this.updateAllowed = false;
    this.deleteAllowed = false;
  }

  initializeObjectProperties = (metaData) => {
    const fields = metaData?.fields;
    if (Array.isArray(fields)) {
      for (const field of fields) {
        let id = field.id;

        Object.defineProperty(this, id, {
          get: () => {
            return this.getData(id);
          },
          set: (newValue) => {
            if (this.getData(id) !== newValue) {
              this.setData(id, newValue);
            }
          },
        });
      }
    }
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

  setData = (fieldName, newValue, addToChangeMap = true, refreshState = false) => {
    const oldValue = this.getData(fieldName);

    if (addToChangeMap !== false) {
      this.propertyChange(fieldName, newValue, oldValue);
    }

    this.data[fieldName] = newValue;
    this.updateState();
  };

  createModel = async () => {
    console.error("No createModel function was wired up");
  };

  saveModel = async () => {
    console.error("No saveModel function was wired up");
  };

  deleteModel = async () => {
    console.error("No deleteModel function was wired up");
  };

  getDetailViewLink = () => {
    // console.error("No getDetailViewLink function was wired up");
    return null;
  };

  getDetailViewTitle = () => {
    console.error("No getDetailViewTitle function was wired up");
  };

  getManagementScreenLink = () => {
    console.error("No getManagementScreenLink function was wired up");
  };


  isLenient = () => {
    return false;
  };

  showAddAnotherCheckbox = () => {
    return false;
  };

  showRequiredFieldsMessage = () => {
    return true;
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

  getErrors = () => {
    return validateData(this);
  };

  isModelValid = () => {
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
    let newChangeMap = new Map(this.changeMap);
    if (!newChangeMap.has(id)) {
      // console.log("Field added to change map: " + id);
      // console.log("oldValue: " + JSON.stringify(oldValue));
      // console.log("newValue: " + JSON.stringify(newValue));
      newChangeMap.set(id, oldValue);

      if (this.dataState !== DataState.NEW) {
        this.dataState = DataState.CHANGED;
      }
    }
    else if (newChangeMap.get(id) === newValue
         || (newChangeMap.get(id) === null && newValue === null)) {
      newChangeMap.delete(id);

      if (newChangeMap.size === 0 && this.dataState === DataState.CHANGED) {
        this.dataState  = DataState.LOADED;
      }
    }

    this.changeMap = newChangeMap;
  };

  clearChangeMap = () => {
    this.dataState = DataState.LOADED;
    this.changeMap = new Map();
  };

  // TODO: Only send changemap for updates after getting everything else working
  getPersistData = () => {
    this.removeTemporaryObjectProperties();
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

  removeTemporaryObjectProperties = () => {
    let data = this.data;

    try {
      temporaryObjectProperties.forEach((key) => {
        // console.log(`deleting temp object property ${key}: [${data[key]}]`);
        delete data[key];
      });

      this.data = data;
    }
    catch (error) {
      console.error("Could not remove temporary object properties.");
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
      this.data[key] = value;
    });
    this.clearChangeMap();
  };

  updateState = () => {
    if (this.setStateFunction) {
      this.setStateFunction({...this});
    }
  };

  unselectModel = () => {
    if (this.setStateFunction) {
      this.setStateFunction(undefined);
    }
  };

  setSetStateFunction = (setStateFunction) => {
    if (setStateFunction) {
      this.setStateFunction = setStateFunction;
    }
  };

  getSetStateFunction = () => {
    return this.setStateFunction;
  };

  getChangeMap = () => {
    return this.changeMap;
  }

  // TODO: This is the new getPersistData. It needs to replace the other one.
  getChangedProperties = () => {
    this.trimStrings();
    const changedProperties = {};

    this.changeMap.forEach((value, key) => {
      changedProperties[key] = this.data[key];
    });

    return changedProperties;
  }

  getOriginalValue = (fieldName) => {
    const originalValue = this.changeMap.get(fieldName);
    return originalValue ? originalValue : this.data[fieldName];
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

  getLabel = (fieldName) => {
    let fields = this.metaData.fields;
    // TODO: Replace with metadata helper call once finished
    let field = fields.find(field => { return field.id === fieldName;});
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

  getIsLoading = () => {
    return this.isLoading === true;
  };

  setIsLoading = (isLoading = true) => {
    this.isLoading = isLoading;
  };

  getFieldById = (id) => {
    return this.metaData?.fields?.find(field => {return field.id === id; });
  };

  getDefaultValue = (fieldName) => {
    const newObjectFields = this.getNewObjectFields();
    return newObjectFields ? newObjectFields[fieldName] : undefined;
  };

  // TODO: Should we make view definitions?
  getNewObjectFields = () => {
    return this?.metaData?.newObjectFields != null ? this.metaData.newObjectFields : {};
  };

  clone = () => {
    return _.cloneDeep(this);
  };

  getNewInstance = (newData = this.getNewObjectFields()) => {
    return new ModelBase({...newData}, this.metaData, this.newModel);
  };

  canUpdate = () => {
    return this.updateAllowed === true;
  };

  canDelete = () => {
    return this.deleteAllowed === true;
  };
}

export default ModelBase;


