import {validateData, validateField} from "core/data_model/modelValidation";

export class FilterModelBase {
  constructor(data, metaData) {
    this.metaData = {...metaData};
    this.data = {...this.getNewObjectFields(), ...data};
  }

  getData = (fieldName) => {
    if (fieldName == null) {
      console.error("No field name was given, so returning null");
      return null;
    }

    return this.data[fieldName];
  };

  setData = (fieldName, newValue) => {
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

  getPersistData = () => {
    return this.trimStrings();
  };

  trimStrings = () => {
    let data = this.data;

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

  getLabel = (fieldName) => {
    let fields = this.metaData.fields;
    // TODO: Replace with metadata helper call once finished
    let field = fields.find(field => { return field.id === fieldName;});
    return field ? field.label : "No label found in metadata";
  };

  getMetaData = () => {
    return this.metaData;
  };

  getActiveFilters = () => {
    return this.metaData.getActiveFilters(this);
  };

  getFilterValue = (fieldName) => {
    let filter = this.getData(fieldName);
    return filter != null && filter["value"] != null ? filter["value"] : filter;
  };

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

  getFieldById = (id) => {
    return this.metaData?.fields.find(field => {return field.id === id; });
  };

  getDefaultValue = (fieldName) => {
    const newObjectFields = this.getNewObjectFields();
    return newObjectFields ? newObjectFields[fieldName] : undefined;
  };

  getNewObjectFields = () => {
    return this.metaData.newObjectFields != null ? this.metaData.newObjectFields : {};
  };

  clone = () => {
    return new FilterModelBase(JSON.parse(JSON.stringify(this.data)), this.metaData);
  };
}

export default FilterModelBase;


