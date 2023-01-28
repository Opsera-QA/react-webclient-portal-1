import { modelValidation, validateData, validateField, validatePotentialValue } from "core/data_model/modelValidation";
import { hasStringValue } from "components/common/helpers/string-helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import ObjectHelper from "@opsera/persephone/helpers/object/object.helper";

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

// TODO: Investigate making this a hook
export default class ModelBase {
  constructor(
    data,
    metaData,
    newModel,
    setStateFunction,
    loadDataFunction,
  ) {
    this.metaData = DataParsingHelper.cloneDeep({...metaData});
    this.data = {...this.getNewObjectFields(), ...data};
    this.originalData = DataParsingHelper.cloneDeep(this.data);
    this.newModel = newModel;
    this.id = data?._id;
    this.dataState = newModel ? DataState.NEW : DataState.LOADED;
    this.setStateFunction = setStateFunction;
    this.loadDataFunction = loadDataFunction;
    this.changeMap = new Map();
    this.initializeObjectProperties({...metaData});
    this.isLoading = false;
    this.updateAllowed = false;
    this.deleteAllowed = false;
    this.editAccessRolesAllowed = false;
    this.roleDefinitions = {};
    this.userData = undefined;
  }

  // TODO: This causes numerous problems and should be removed asap
  initializeObjectProperties = (metaData) => {
    const fields = metaData?.fields;
    if (Array.isArray(fields)) {
      for (const field of fields) {
        if (field.id === "data") {
          continue;
        }

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

  getData = (fieldName) => {
    if (hasStringValue(fieldName) !== true) {
      console.error("No field name was given, so returning null");
      return null;
    }

    return DataParsingHelper.safeObjectPropertyParser(this.data, fieldName);
  };

  removeArrayItem = (fieldName, index) => {
    const array = DataParsingHelper.parseArray(this.getData(fieldName));

    if (!array || array.length <= index) {
      return;
    }

    array.splice(index, 1);
    this.setData(fieldName, array);
  };

  setData = (fieldName, newValue, addToChangeMap = true, refreshState = false) => {
    const oldValue = this.getData(fieldName);

    if (addToChangeMap !== false) {
      this.propertyChange(fieldName, newValue, oldValue);
    }

    this.data = DataParsingHelper.safeObjectPropertySetter(this.data, fieldName, newValue);
    this.updateState();
  };

  setDefaultValue = (fieldName) => {
    const defaultValue = this.metaData?.newObjectFields?.[fieldName];
    this.propertyChange(fieldName, defaultValue, this.getData(fieldName));
    this.setData(fieldName, defaultValue);
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

  reloadData = async () => {
    if (this.loadDataFunction) {
      this.loadDataFunction();
    }
  };

  getDetailViewLink = () => {
    // console.error("No getDetailViewLink function was wired up");
    return null;
  };

  getDetailViewTitle = () => {
    return null;
  };

  getManagementScreenLink = () => {
    console.error("No getManagementScreenLink function was wired up");
  };

  getRoleDefinitions = () => {
    return this.roleDefinitions;
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

  getStringData = (fieldName) => {
    if (hasStringValue(fieldName) !== true) {
      console.error("No field name was given, so returning null");
      return null;
    }

    return DataParsingHelper.parseNestedString(this.data, fieldName, "");
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

  getFieldWarning = (fieldName) => {
    return modelValidation.getFieldWarning(fieldName, this);
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
    this.data = DataParsingHelper.cloneDeep(this.originalData);
    this.clearChangeMap();
  };

  replaceData = (newData) => {
    this.data = DataParsingHelper.parseObject(newData, {});
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
  };

  // TODO: This is the new getPersistData. It needs to replace the other one.
  getChangedProperties = () => {
    this.trimStrings();
    const changedProperties = {};

    this.changeMap.forEach((value, key) => {
      changedProperties[key] = this.data[key];
    });

    return changedProperties;
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

  getOwnerId = () => {
    return this.getData("owner");
  };

  isUrlField = (fieldName) => {
    const field = this.getFieldById(fieldName);
    return field != null ? field.isUrl === true : false;
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

  getIsLoading = () => {
    return this.isLoading === true;
  };

  setIsLoading = (isLoading = true) => {
    this.isLoading = isLoading;
  };

  getFieldById = (id) => {
    const fields = this.getFields();
    return fields?.find(field => {return field.id === id; });
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

  getNewInstance = (newData = this.getNewObjectFields()) => {
    const parsedData = DataParsingHelper.parseObject(newData, this.getNewObjectFields());
    this.replaceOriginalData(parsedData);
    this.replaceData(parsedData);
    return this;
  };

  canUpdate = () => {
    return this.updateAllowed === true;
  };

  canDelete = () => {
    return this.deleteAllowed === true;
  };

  canEditAccessRoles = () => {
    return this.canUpdate() === true;
  };

  canTransferOwnership = () => {
    return false;
  };

  handleLiveMessage = (liveMessage) => {
    throw "This action is not supported yet";
  };
}


