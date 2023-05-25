import React from "react";
import PropTypes from "prop-types";
import {Button, InputGroup} from "react-bootstrap";
import {faSearch} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import ClearSearchFilterButton from "temp-library-components/button/clear/ClearSearchFilterButton";

function InlineClientSideSearchFilter(
  {
    filterModel,
    setFilterModel,
    supportClientSideSearching,
    disabled,
    fieldName,
    className,
    isLoading,
    inputClassName,
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
        <InputGroup.Prepend>
          <ClearSearchFilterButton
            fieldName={fieldName}
            disabled={isLoading || disabled}
            paginationModel={filterModel}
            clientSide={true}
            setCurrentSearchTerm={validateAndSetData}
            buttonSize={"sm"}
            variant={isFreeTrial === true ? "secondary" : "outline-primary"}
            buttonClassName={"inline-filter-input"}
            currentSearchTerm={filterModel?.getData(fieldName)}
          />
        </InputGroup.Prepend>
        <input
          disabled={disabled || isLoading}
          placeholder={"Search"}
          value={filterModel?.getData(fieldName) || ""}
          className={inputClassName}
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
  inputClassName: PropTypes.string,
};

InlineClientSideSearchFilter.defaultProps = {
    fieldName: "search",
    inputClassName: "text-input inline-client-side-search-input inline-filter-input w-100",
};

export default InlineClientSideSearchFilter;


