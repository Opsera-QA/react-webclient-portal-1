import { hasStringValue } from "components/common/helpers/string-helpers";

export class FilterModelBase {
  constructor(metaData) {
    this.metaData = {...metaData};
    this.data = {...this.getNewObjectFields()};
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

  getTotalCount = () => {
    return this.data?.totalCount;
  };

  setTotalCount = (newValue) => {
   this.setData("totalCount", newValue);
  };

  getPageSize = () => {
    return this.getFilterValue("pageSize");
  };

  getPageCount = () => {
    return Math.ceil(this.getTotalCount() / this.getPageSize());
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
    let activeFilters = [];

    if (this.canSearch() && this.getData("search") != null && this.getData("search") !== "") {
      activeFilters.push({filterId: "search", text: `Keywords: ${this.getData("search")}`});
    }

    return activeFilters;
  };

  canSearch = () => {
    return false;
  };

  canSetPageSize = () => {
    return true;
  };

  canSort = () => {
    return false;
  };

  getSortOptions = () => {
    return null;
  };

  showPagination = () => {
    return false;
  };

  getPageSizes = () => {
    return [
      {value: 25, text: "25 results per page"},
      {value: 50, text: "50 results per page"},
      {value: 100, text: "100 results per page"},
      {value: 150, text: "150 results per page"},
      {value: 200, text: "200 results per page"},
    ];
  };

  getFilterValue = (fieldName) => {
    let filter = this.getData(fieldName);
    return filter != null && filter["value"] != null ? filter["value"] : filter;
  };

  getFilterText = (fieldName) => {
    let filter = this.getData(fieldName);
    return filter != null && filter["text"] != null ? filter["text"] : filter;
  };

  unpackQueryParameterObject = (history) => {
    throw "This is an unsupported action!";
  };

  storeFiltersInStorage = () => {
    const filterObject = {...this.getPersistData()};
    if (hasStringValue(this.filterObjectId) === true) {
      sessionStorage.setItem(this.filterObjectId, filterObject);
    }
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
  };

  getFieldById = (id) => {
    return this.metaData?.fields.find(field => {return field.id === id; });
  };

  getDefaultValue = (fieldName) => {
    const newObjectFields = this.getNewObjectFields();
    return newObjectFields ? newObjectFields[fieldName] : undefined;
  };

  getNewObjectFields = () => {
    return this.metaData?.newObjectFields != null ? this.metaData.newObjectFields : {};
  };

  getNewInstance = () => {
    return new FilterModelBase(this.metaData);
  };

  getSortOption = () => {
    let filter = this.getData("sortOption");
    return filter?.option ? filter?.option : this.getFilterValue(filter);
  };
}

export default FilterModelBase;


