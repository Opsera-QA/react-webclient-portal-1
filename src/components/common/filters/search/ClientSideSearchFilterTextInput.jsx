import React from "react";
import PropTypes from "prop-types";
import {Button, InputGroup} from "react-bootstrap";
import {faSearch} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

// TODO: Flesh this out and make a base as well
function ClientSideSearchFilterTextInput(
  {
    filterModel,
    setFilterModel,
    disabled,
    fieldName,
    className,
    isLoading,
  }) {
  const validateAndSetData = (value) => {
    let newFilterDto = {...filterModel};
    newFilterDto.setData(fieldName, value);
    setFilterModel({...newFilterDto});
  };

  if (setFilterModel == null || filterModel == null || filterModel?.canClientSideSearch() !== true) {
    return null;
  }

  return (
    <div className={className}>
      <InputGroup size={"sm"} className={"flex-nowrap"}>
        <input
          disabled={disabled || isLoading}
          placeholder={"Search"}
          value={filterModel?.getData(fieldName) || ""}
          onChange={e => validateAndSetData(e.target.value)}
          className={"text-input inline-filter-input"}
        />
        <InputGroup.Append>
          <Button
            className={"inline-filter-input filter-bg-white"}
            disabled={isLoading || disabled}
            variant={"outline-primary"}
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

ClientSideSearchFilterTextInput.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};

ClientSideSearchFilterTextInput.defaultProps = {
  fieldName: "search",
};

export default ClientSideSearchFilterTextInput;


