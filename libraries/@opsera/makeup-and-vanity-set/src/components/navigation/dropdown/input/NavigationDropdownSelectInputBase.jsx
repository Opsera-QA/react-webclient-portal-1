import React from "react";
import PropTypes from "prop-types";
import { NavDropdown } from "react-bootstrap";
import NavigationDropdownSelectOption
  from "../option/NavigationDropdownSelectOption.jsx";

function NavigationDropdownSelectInputBase(
  {
    title,
    id,
    className,
    titleClassName,
    selectOptions,
    selectedOption,
    setDataFunction,
    disabled,
    textField,
    valueField,
  }) {
  const getTitleClassName = () => {
    // const parsedTitleClassName = DataParsingHelper.parseString(titleClassName);
    const parsedTitleClassName = typeof titleClassName === "string" && titleClassName.length > 0 ? titleClassName : undefined;

    if (parsedTitleClassName) {
      return (`${parsedTitleClassName} mr-3`);
    }

    return `mr-3`;
  };

  const getNavigationDropdownSelectOption = (selectOption) => {
    // const parsedSelectOptionString = DataParsingHelper.parseString(selectOption);
    const parsedSelectOptionString = typeof selectOption === "string" && selectOption.length > 0 ? selectOption : undefined;

    if (parsedSelectOptionString) {
      return (
        <NavigationDropdownSelectOption
          setDataFunction={setDataFunction}
          selectedOption={selectedOption}
          text={parsedSelectOptionString}
          value={parsedSelectOptionString}
          disabled={disabled}
        />
      );
    }

    // const parsedSelectOptionObject = DataParsingHelper.parseObject(selectOption);

    if (typeof selectOption === "object" && Object.keys(selectOption).length > 0) {
      return (
        <NavigationDropdownSelectOption
          setDataFunction={setDataFunction}
          selectedOption={selectedOption}
          text={selectOption?.[textField]}
          value={selectOption?.[valueField]}
          disabled={disabled}
        />
      );
    }
  };

  const getSelectOptions = () => {
    if (!Array.isArray(selectOptions) || selectOptions.length === 0) {
      return null;
    }

    return selectOptions.map((selectOption) => {
      return getNavigationDropdownSelectOption(selectOption);
    });
  };

  if (selectOptions == null) {
    return null;
  }

  return (
    <NavDropdown
      title={<span className={getTitleClassName()}>{title}</span>}
      id={id}
      className={className}
    >
      {getSelectOptions()}
    </NavDropdown>
  );
}

NavigationDropdownSelectInputBase.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  titleClassName: PropTypes.string,
  selectedOption: PropTypes.string,
  selectOptions: PropTypes.array,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
};

NavigationDropdownSelectInputBase.defaultProps = {
  textField: "text",
  valueField: "value",
};

export default NavigationDropdownSelectInputBase;
