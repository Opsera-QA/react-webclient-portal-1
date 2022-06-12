import { hasStringValue } from "components/common/helpers/string-helpers";
import sessionHelper from "utils/session.helper";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";
import { numberHelpers } from "components/common/helpers/number/number.helpers";

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
        this.updateBrowserStorage();
      }
  };

  updateBrowserStorage = () => {
    if (hasStringValue(this.sessionDataKey) !== true) {
      throw "Must set a session data key in order to save to browser storage.";
    }

    const currentData = this.getPersistData();
    sessionHelper.setStoredSessionValue(this.sessionDataKey, currentData);
  };

  unpackCommonUrlParameters = () => {
    let hasUrlParams = false;

    if (this.canSort() === true) {
      const sortOption = sessionHelper.getStoredUrlParameter("sortOption");

      if (hasStringValue(sortOption) === true) {
        hasUrlParams = true;
        this.setData("sortOption", sortOption);
      }
    }

    if (this.showPagination() === true) {
      const pageSize =  sessionHelper.getStoredUrlParameter("pageSize");

      if (numberHelpers.isNumberGreaterThan(0, pageSize)) {
        this.setData("pageSize", pageSize);
      }

      const currentPage = sessionHelper.getStoredUrlParameter("currentPage");

      if (numberHelpers.isNumberGreaterThan(0, currentPage)) {
        hasUrlParams = true;
        this.setData("currentPage", currentPage);
      }
    }

    if (this.canSearch() === true) {
      const search = sessionHelper.getStoredUrlParameter("search");

      if (hasStringValue(search) === true) {
        hasUrlParams = true;
        this.setData("search", search);
      }
    }

    if (this.canToggleView() === true) {
      const viewType = sessionHelper.getStoredUrlParameter("viewType");

      if (hasStringValue(viewType) === true) {
        hasUrlParams = true;
        this.setData("viewType", viewType);
      }
    }

    const owner = sessionHelper.getStoredUrlParameter("owner");
    const ownerName = sessionHelper.getStoredUrlParameter("ownerName");

    if (hasStringValue(owner) === true && hasStringValue(ownerName) === true) {
      this.setData("owner", owner);
      this.setData("ownerName", ownerName);
    }

    const active = sessionHelper.getStoredUrlParameter("active");

    if (hasStringValue(active) === true) {
      hasUrlParams = true;
      this.setData("active", active);
    }

    const tag = sessionHelper.getStoredUrlParameter("tag");

    if (hasStringValue(tag) === true) {
      hasUrlParams = true;
      this.setData("tag", tag);
    }


    return hasUrlParams;
  };

  unpackCommonBrowserStorageFields = () => {
    const browserStorage = sessionHelper.getStoredSessionValueByKey(this.sessionDataKey);
    const parsedBrowserStorage = dataParsingHelper.parseJson(browserStorage);

    if (parsedBrowserStorage) {

      if (this.canSort() === true) {
        const sortOption = parsedBrowserStorage?.sortOption;

        if (hasStringValue(sortOption) === true) {
          this.setData("sortOption", sortOption);
        }
      }

      if (this.canSearch() === true) {
        const search = parsedBrowserStorage?.search;

        if (hasStringValue(search) === true) {
          this.setData("search", search);
        }
      }

      if (this.canToggleView() === true) {
        const viewType = parsedBrowserStorage?.viewType;

        if (hasStringValue(viewType) === true) {
          this.setData("viewType", viewType);
        }
      }

      if (this.showPagination() === true) {
        const pageSize = parsedBrowserStorage?.pageSize;

        if (numberHelpers.isNumberGreaterThan(0, pageSize)) {
          this.setData("pageSize", pageSize);
        }

        const currentPage = parsedBrowserStorage?.currentPage;

        if (numberHelpers.isNumberGreaterThan(0, currentPage)) {
          this.setData("currentPage", currentPage);
        }
      }

      const owner = parsedBrowserStorage?.owner;
      const ownerName = parsedBrowserStorage?.ownerName;

      if (hasStringValue(owner) === true && hasStringValue(ownerName) === true) {
        this.setData("owner", owner);
        this.setData("ownerName", ownerName);
      }

      const active = parsedBrowserStorage?.active;

      if (hasStringValue(active) === true) {
        this.setData("active", active);
      }

      const tag = parsedBrowserStorage?.tag;

      if (hasStringValue(tag) === true) {
        this.setData("tag", tag);
      }
    }
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

    if (numberHelpers.isNumberGreaterThanOrEqualTo(0, parsedTotalCount)) {
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

  canToggleView = () => {
    return false;
  };

  getPageSizes = () => {
    return [
      {value: 25, text: "25 Results Per Page"},
      {value: 50, text: "50 Results Per Page"},
      {value: 100, text: "100 Results Per Page"},
      {value: 150, text: "150 Results Per Page"},
      {value: 200, text: "200 Results Per Page"},
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


