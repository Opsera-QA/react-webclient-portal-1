import { modelValidation, validateData, validateField, validatePotentialValue } from "core/data_model/modelValidation";
import { hasStringValue } from "components/common/helpers/string-helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import ObjectHelper from "@opsera/persephone/helpers/object/object.helper";
import DataValidationService from "@opsera/definitions/services/validation/dataValidation.service";

export const DataState = {
  LOADED: 0,
  CHANGED: 1,
  NEW: 2,
  DELETED: 3
};

export class Model {

  constructor(data, metaData, newModel) {
    this.metaData = DataParsingHelper.cloneDeep(metaData);
    this.data = {...this.getNewObjectFields(), ...data};
    this.originalData = DataParsingHelper.cloneDeep(this.data);
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
        if (field.id === "data") {
          continue;
        }

        let id = field.id;
        this.defineProperty(id);
      }
    }
  };

  defineProperty = (id) => {
    Object.defineProperty(this, id, {
      get: () => {
        return this.getData(id);
      },
      set: (newValue) => {
        if (this.getData(id) !== newValue) {
          this.propertyChange(id, newValue, this.getData(id));
          this.data[id] = newValue;
        }
      },
    });
  };

  getValidatedData = () => {
    return DataValidationService.validateAndEncodeFields(
      this.data,
      this.metaData,
    );
  };
  getData = (fieldName) => {
    if (hasStringValue(fieldName) !== true) {
      console.error("No field name was given, so returning null");
      return null;
    }

    return DataParsingHelper.safeObjectPropertyParser(this.data, fieldName);
  };

  getStringData = (fieldName) => {
    if (hasStringValue(fieldName) !== true) {
      console.error("No field name was given, so returning null");
      return null;
    }

    return DataParsingHelper.parseNestedString(this.data, fieldName, "");
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
    this.data = DataParsingHelper.safeObjectPropertySetter(this.data, fieldName, newValue);
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
      console.error(`Value for field name [${fieldName}] was not saved as array. Returning in array.`);
      console.error(`Value: ${JSON.stringify(currentValue)}`);
      return [currentValue];
    }

    if (typeof index === "number") {
      return currentValue.length >= index + 1 ? currentValue[index] : null;
    }

    return currentValue;
  };

  removeArrayItem = (fieldName, index) => {
    const array = DataParsingHelper.parseArray(this.getData(fieldName));

    if (!array || array.length <= index) {
      return;
    }

    array.splice(index, 1);
    this.setData(fieldName, array);
  };

  getStringValue = (fieldName, defaultValue = "") => {
    const currentValue = this.getData(fieldName);

    if (hasStringValue(currentValue) !== true) {
      return defaultValue;
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

  checkCurrentValidity = () => {
    return validateData(this) === true;
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

  // TODO: Replace the method above with this
  isFieldValidV2 = (fieldName) => {
    const errors = validateField(this, this.getFieldById(fieldName));
    return !Array.isArray(errors) || errors.length === 0;
  };

  // Returns first error if exists
  getFieldError = (fieldName) => {
    let errors = validateField(this, this.getFieldById(fieldName));
    return errors != null ? errors[0] : "";
  };

  getFieldWarning = (fieldName) => {
    return modelValidation.getFieldWarning(fieldName, this);
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
  getPersistData = (updateData) => {
    return this.trimStrings(updateData);
  };

  getOriginalData = () => {
    return this.originalData;
  };

  replaceOriginalData = (newOriginalData) => {
    const parsedNewOriginalData = DataParsingHelper.parseObject(newOriginalData);

    if (parsedNewOriginalData && ObjectHelper.areObjectsEqualLodash(this.originalData, parsedNewOriginalData) !== true) {
      this.originalData = parsedNewOriginalData;
    }
  };

  getCurrentData = () => {
    return this.data;
  };

  trimStrings = (updateData = true) => {
    let data = this.data;

    // TODO: this is only at the top level, add support for trimming inner objects
    try {
      Object.keys(data).forEach(key => {
        if (typeof data[key] === 'string') {
          data[key] = data[key].trim();
        }
      });

      if (updateData !== false) {
        // save trimmed strings in data
        this.data = data;
      }
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

  isLenient = () => {
    return false;
  };

  isUppercase = (fieldName) => {
    const field = this.getFieldById(fieldName);
    return field?.uppercase === true;
  };

  isUrlField = (fieldName) => {
    const field = this.getFieldById(fieldName);
    return field != null ? field.isUrl === true : false;
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

  getLabel = (fieldName, defaultLabel = "No label found in metadata") => {
    const fields = DataParsingHelper.parseNestedArray(this.getMetaData(), "fields", []);
    // TODO: Replace with metadata helper call once finished
    const field = fields.find(field => field.id === fieldName);
    return field ? field.label : defaultLabel;
  };

  getMetaData = () => {
    return this.metaData;
  };

  // TODO: Use filterModel and move filter related options there once all references are updated
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
    const newObjectFields = DataParsingHelper.parseObject(this.metaData?.newObjectFields, {});
    return {...DataParsingHelper.cloneDeep(newObjectFields)};
  };

  clone = () => {
    return DataParsingHelper.cloneDeep(this);
  };

  getNewInstance = (newData = this.getNewObjectFields(), isNew = this.newModel) => {
    return new Model({...newData}, this.metaData, isNew);
  };
}

export default Model;


