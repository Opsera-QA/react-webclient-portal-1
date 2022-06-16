import {validateData, validateField, validatePotentialValue} from "core/data_model/modelValidation";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";
import { hasStringValue } from "components/common/helpers/string-helpers";

export const DataState = {
  LOADED: 0,
  CHANGED: 1,
  NEW: 2,
  DELETED: 3
};

export class Model {

  constructor(data, metaData, newModel) {
    this.metaData = dataParsingHelper.cloneDeep(metaData);
    this.data = {...this.getNewObjectFields(), ...data};
    this.newModel = newModel;
    this.dataState = newModel ? DataState.NEW : DataState.LOADED;
    this.changeMap = new Map();
  }

  getData = (fieldName) => {
    if (hasStringValue(fieldName) !== true) {
      console.error("No field name was given, so returning null");
      return null;
    }

    return dataParsingHelper.safeObjectPropertyParser(this.data, fieldName);
  };

  getObjectData = (fieldName, defaultValue = {}) => {
    if (hasStringValue(fieldName) !== true) {
      console.error("No field name was given, so returning default value.");
      return defaultValue;
    }

    try {
      const potentialObject = this.getData(fieldName);

      if (typeof potentialObject !== "object") {
        console.error("The stored field was not an object. Returning default value.");
        return defaultValue;
      }

      return potentialObject;
    }
    catch (error) {
      console.error("Could not parse object property. Returning default value.");
      return defaultValue;
    }
  };

  setData = (fieldName, newValue) => {
    this.propertyChange(fieldName, newValue, this.getData(fieldName));
    this.data = dataParsingHelper.safeObjectPropertySetter(this.data, fieldName, newValue);
  };

  setDefaultValue = (fieldName) => {
    const defaultValue = this.metaData?.newObjectFields?.[fieldName];
    this.setData(fieldName, defaultValue);
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

      this.setData(fieldName, newValue);
    }
  };

  getArrayData = (fieldName, index) => {
    let currentValue = this.getData(fieldName);

    if (currentValue == null) {
      return [];
    }

    if (!Array.isArray(currentValue)) {
      console.error(`Value was not saved as array. Returning in array.`);
      console.error(`Value: ${JSON.stringify(currentValue)}`);
      return [currentValue];
    }

    if (typeof index === "number") {
      return currentValue.length >= index + 1 ? currentValue[index] : null;
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

  getPotentialFieldValidationError = (potentialValue, fieldName) => {
    const errorMessages = validatePotentialValue(potentialValue, this, this.getFieldById(fieldName));

    if (Array.isArray(errorMessages) !== true || errorMessages.length === 0) {
      return null;
    }

    return errorMessages[0];
  };

  isPotentialFieldValid = (potentialValue, fieldName) => {
    const errorMessages = validatePotentialValue(potentialValue, this, this.getFieldById(fieldName));
    return Array.isArray(errorMessages) !== true || errorMessages.length === 0;
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

  getCurrentData = () => {
    return this.data;
  };

  trimStrings = () => {
    let data = this.data;

    // TODO: this is only at the top level, add support for trimming inner objects
    try {
      Object.keys(data).forEach(key => {
        if (typeof data[key] === 'string') {
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

  isChanged = (fieldName) => {
    if (fieldName) {
      return this.changeMap.has(fieldName);
    }

    return this.dataState !== DataState.LOADED;
  };

  resetData = () => {
    this.changeMap.forEach((value, key) => {
      this.data[key] = value;
    });
    this.clearChangeMap();
  };

  getChangeMap = () => {
    return this.changeMap;
  };

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

  getDetailViewLink = () => {
    return this.metaData?.detailView != null ? this.metaData.detailView(this) : null;
  };

  getDetailViewTitle = () => {
    return this.metaData?.detailViewTitle != null ? this.metaData.detailViewTitle(this) : null;
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

  getMaxLength = (fieldName) => {
    const field = this.getFieldById(fieldName);
    return field?.maxLength;
  };

  getMinLength = (fieldName) => {
    const field = this.getFieldById(fieldName);
    return field?.minLength;
  };

  getMinItems = (fieldName) => {
    const field = this.getFieldById(fieldName);
    return field?.minItems;
  };

  getMaxItems = (fieldName) => {
    const field = this.getFieldById(fieldName);
    return field?.maxItems;
  };

  getIdForFieldName = (fieldName) => {
    return this.getFieldById(fieldName)?.id;
  };

  getMongoDbId = () => {
    return this.getData("_id");
  };

  getFields = () => {
    return this.metaData?.fields;
  };

  getType = () => {
    return this.metaData?.type;
  };

  getActiveField = () => {
    return this.metaData?.activeField;
  };

  isInactive = () => {
    const activeField = this.metaData?.activeField;
    return activeField && this.getData(activeField) === false;
  };

  getFieldById = (id) => {
    return this.metaData?.fields.find(field => {return field.id === id; });
  };

  getDefaultValue = (fieldName) => {
    const newObjectFields = this.getNewObjectFields();
    return newObjectFields ? newObjectFields[fieldName] : undefined;
  };

  // TODO: Should we make view definitions?
  getNewObjectFields = () => {
    return this.metaData?.newObjectFields != null ? this.metaData?.newObjectFields : {};
  };

  clone = () => {
    return dataParsingHelper.cloneDeep(this);
  };

  getNewInstance = (newData = this.getNewObjectFields(), isNew = this.newModel) => {
    return new Model({...newData}, this.metaData, isNew);
  };
}

export default Model;


