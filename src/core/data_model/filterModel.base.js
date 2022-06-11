import { hasStringValue } from "components/common/helpers/string-helpers";
import sessionHelper from "utils/session.helper";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";

export class FilterModelBase {
  constructor(metaData) {
    this.sessionDataKey = "";
    this.updateUrlWithQueryParameters = false;
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

  setData = (fieldName, newValue, updateQueryParameters = true) => {
      this.data[fieldName] = newValue;

      if (updateQueryParameters === true && this.getUpdateUrlWithQueryParameters() === true) {
        sessionHelper.replaceStoredUrlParameter(fieldName, newValue);
      }
  };

  updateBrowserStorage = () => {
    if (hasStringValue(this.sessionDataKey) !== true) {
      throw "Must set a session data key in order to save to browser storage.";
    }

    const currentData = this.getPersistData();
    sessionHelper.setStoredSessionValue(this.sessionDataKey, currentData);
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

  enableUrlUpdatesWithQueryParameters = () => {
    this.updateUrlWithQueryParameters = true;
  };

  getUpdateUrlWithQueryParameters = () => {
    return this.updateUrlWithQueryParameters === true;
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

    const searchKeyword = this.getData("search");

    if (this.canSearch() && hasStringValue(searchKeyword) === true) {
      activeFilters.push({filterId: "search", text: `Keywords: ${searchKeyword}`});
    }

    return activeFilters;
  };

  updateActiveFilters = () => {
    const activeFilters = dataParsingHelper.parseArray(this.getActiveFilters(), []);

    if (Array.isArray(activeFilters)) {
      this.data.activeFilters = activeFilters;
    }
  };

  updateTotalCount = (newTotalCount) => {
    const parsedTotalCount = dataParsingHelper.parseInteger(newTotalCount, 0);

    if (parsedTotalCount) {
      this.data.totalCount = parsedTotalCount;
    }
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
    const filter = this.getData(fieldName);

    if (typeof filter === "object" && filter?.value != null) {
      return filter?.value;
    }

    return filter;
  };

  getFilterText = (fieldName) => {
    const filter = this.getData(fieldName);

    if (typeof filter === "object" && filter?.text != null) {
      return filter?.text;
    }

    return filter;
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
    return this.getData("sortOption");
  };
}

export default FilterModelBase;


