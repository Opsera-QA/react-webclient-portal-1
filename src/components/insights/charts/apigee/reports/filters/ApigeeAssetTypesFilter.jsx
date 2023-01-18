import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import { APIGEE_ASSET_TYPE_FILTER_VALUES } from "components/common/list_of_values_input/tools/apigee/apigee.constants";

function ApigeeAssetTypesFilter({ fieldName, filterDto, setFilterDto, className }) {
  
  if (filterDto == null) {
    return null;
  }

  return (
    <FilterSelectInputBase
      className={className}
      inline={true}
      fieldName={fieldName}
      placeholderText={"Filter By Asset Type"}
      setDataObject={setFilterDto}
      dataObject={filterDto}
      selectOptions={APIGEE_ASSET_TYPE_FILTER_VALUES}
    />
  );
}

ApigeeAssetTypesFilter.propTypes = {
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  fieldName: PropTypes.string,
  className: PropTypes.string,
};

ApigeeAssetTypesFilter.defaultProps = {
  fieldName: "assetType"
};

export default ApigeeAssetTypesFilter;
