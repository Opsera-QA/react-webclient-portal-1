import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {faClipboardListCheck} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import SfdcComponentNameFilterInputRow from "./SfdcComponentNameFilterInputRow";
import {matchesRegex} from "utils/helpers";

function SfdcComponentNameFilterInputBase({ fieldName, model, setModel, helpComponent, disabled, className }) {
  const [field] = useState(model.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [filterRows, setFilterRows] = useState([]);

  useEffect(() => {
    unpackData();
  }, []);

  const unpackData = () => {
    let currentData = model.getData(fieldName);
    let unpackedData = [];

    if (Array.isArray(currentData) && currentData.length > 0) {
      unpackedData = currentData;
    } else {
      unpackedData.push({filter: "", value: ""});
    }
    setFilterRows([...unpackedData]);
  };

  const validateAndSetData = (newRoleList) => {
    setFilterRows([...newRoleList]);
    let newModel = {...model};

    if (newRoleList.length > field.maxItems) {
      setErrorMessage("You have reached the maximum allowed number of Component Name Filter rows. Please remove one to add another.");
      return;
    }

    let newArray = [];

    if (newRoleList && newRoleList.length > 0) {
      newRoleList.map((item) => {        
        const filter = item?.filter;
        const value = item?.value;        

        if (filter === "" || value === "") {
          return;
        }

        newArray.push(item);
      });
    }

    newModel.setData(fieldName, [...newArray]);
    setModel({...newModel});
  };

  const isFilterComplete = (filter) => {
    return filter?.filter !== "" && filter?.value !== "";
  };

  const lastFilterComplete = () => {
    let newFilterList = filterRows;

    if (newFilterList.length === 0) {
      return true;
    }

    let lastObject = newFilterList[newFilterList.length - 1];
    return isFilterComplete(lastObject);
  };

  const updateFilter = (index, innerField, newValue) => {
    let newPropertyList = filterRows;
    if (newPropertyList[index][innerField] !== newValue.value) {
      newPropertyList[index][innerField] = newValue.value;
      validateAndSetData(newPropertyList);
    }
  };

  const updateText = (index, innerField, newValue) => {
    let newPropertyList = filterRows;
    
    let regex = newPropertyList[index]["filter"] === "equals" ? /^\*$|^[A-Za-z][A-Za-z0-9-_.]*$/ : /^[A-Za-z][A-Za-z0-9-_.]*$/ ;

    console.log(matchesRegex(regex, newValue));

    if ((newValue.length === 0 || matchesRegex(regex, newValue)) && newPropertyList[index][innerField] !== newValue) {
      newPropertyList[index][innerField] = newValue;
      validateAndSetData(newPropertyList);
    }
  };

  const getFieldBody = () => {
    if (!filterRows || filterRows.length === 0) {
      return (
        <div className="roles-input">
          <div className="text-center text-muted no-data-message">
            No Component Name Filter rows have been added yet.
          </div>
        </div>
      );
    }

    return (
      <div className="flex-fill">
        {filterRows.map((filter, index) => {
          return (
            <div
              key={index}
              className={index % 2 === 0 ? "odd-row" : "even-row"}
            >
              <SfdcComponentNameFilterInputRow
                index={index}
                disabled={disabled}
                filter={filter?.filter}                
                filterValue={filter?.value}                
                updateFilter={(newValue) =>
                  updateFilter(index, "filter", newValue)
                }
                updateFilterValue={(newValue) =>
                  updateText(index, "value", newValue)
                }                
              />
            </div>
          );
        })}
      </div>
    );
  };

  const getHeaderBar = () => {
    return (
      <div className="d-flex py-1">
        <Col sm={12}>
          <Row>            
            <Col sm={4}>
              <span className="text-muted">Filter</span>
            </Col>
            <Col sm={8}>
              <span className="text-muted pl-2">Value</span>
            </Col>            
          </Row>
        </Col>        
      </div>
    );
  };

  const getIncompleteFiltersMessage = () => {
    if (!lastFilterComplete()) {
      return (`Incomplete Component Name Filter Row Will Be Removed Upon Saving`);
    }
  };

  const getHelpComponent = () => {
    if (helpComponent) {
      return (helpComponent);
    }
  };

  const getFilterMessage = () => {
    return (`Letters, numbers, dashes, underscores and periods are allowed. Please select 'Equals' filter and enter * in the value field to select all components.`);
  };

  if (field == null) {
    return <></>;
  }

  return (
    <div className={className}>
      <PropertyInputContainer
        titleIcon={faClipboardListCheck}
        field={field}
        titleText={field?.label}
        errorMessage={errorMessage}
        type={"Component Name Filter"}
        helpComponent={getHelpComponent()}
        incompleteRowMessage={getIncompleteFiltersMessage()}
      >
        <div>
          <div className={"filter-bg-white"}>
            {getHeaderBar()}
          </div>
          <div className="rules-input">
            {getFieldBody()}
          </div>
        </div>
      </PropertyInputContainer>
      <InfoText customMessage={getFilterMessage()} />
    </div>
  );
}

SfdcComponentNameFilterInputBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  helpComponent: PropTypes.object,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default SfdcComponentNameFilterInputBase;
