import React from "react";
import PropTypes from "prop-types";
import {Button, InputGroup} from "react-bootstrap";
import {faSearch} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import useComponentStateReference from "hooks/useComponentStateReference";

function InlineClientSideSearchFilter(
  {
    filterModel,
    setFilterModel,
    supportClientSideSearching,
    disabled,
    fieldName,
    className,
    isLoading,
  }) {
  const {
    isFreeTrial,
  } = useComponentStateReference();
  
  const validateAndSetData = (value) => {
    filterModel.setData(fieldName, value);
    setFilterModel({...filterModel});
  };

  if (setFilterModel == null || filterModel == null || supportClientSideSearching !== true) {
    return null;
  }

  return (
    <div className={className}>
      <InputGroup size={"sm"} className={"flex-nowrap"}>
        <input
          disabled={disabled || isLoading}
          placeholder={"Search"}
          value={filterModel?.getData(fieldName) || ""}
          className={"text-input inline-client-side-search-input inline-filter-input w-100"}
          onChange={e => validateAndSetData(e.target.value)}
        />
        <InputGroup.Append>
          <Button
            className={"inline-filter-input"}
            disabled={isLoading || disabled}
            variant={isFreeTrial === true ? "secondary" : "outline-primary"}
          >
            <IconBase
              isLoading={isLoading}
              icon={faSearch}
            />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}

InlineClientSideSearchFilter.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  supportClientSideSearching: PropTypes.bool,
};

InlineClientSideSearchFilter.defaultProps = {
  fieldName: "search",
};

export default InlineClientSideSearchFilter;


