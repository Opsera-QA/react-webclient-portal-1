import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faClipboardListCheck} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import SfdcTagFilterInputRow from "./SfdcTagFilterInputRow";

function SfdcTagsFilterInputBase({ fieldName, model, setModel, helpComponent, disabled, className }) {
  const [field] = useState(model.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [tagFilterRows, setTagFilterRows] = useState([]);

  useEffect(() => {
    unpackData();
  }, []);

  const unpackData = () => {
    let currentData = model.getData(fieldName);
    let unpackedData = [];

    if (Array.isArray(currentData) && currentData.length > 0) {
      unpackedData = currentData;
    } else {
      unpackedData.push({field: "", filter: "", value: ""});
    }
    setTagFilterRows([...unpackedData]);
  };

  const validateAndSetData = (newRoleList) => {
    setTagFilterRows([...newRoleList]);
    let newModel = {...model};

    if (newRoleList.length > field.maxItems) {
      setErrorMessage("You have reached the maximum allowed number of Tag Filter rows. Please remove one to add another.");
      return;
    }

    let newArray = [];

    if (newRoleList && newRoleList.length > 0) {
      newRoleList.map((item) => {
        const field = item?.field;
        const filter = item?.filter;
        const value = item?.value;        

        if (field === "" || filter === "" || value === "") {
          return;
        }

        newArray.push(item);
      });
    }

    newModel.setData(fieldName, [...newArray]);
    setModel({...newModel});
  };

  const isTagFilterComplete = (tagFilter) => {
    return tagFilter?.field !== "" && tagFilter?.filter !== "" && tagFilter?.value !== "";
  };

  const lastTagFilterComplete = () => {
    let newTagFilterList = tagFilterRows;

    if (newTagFilterList.length === 0) {
      return true;
    }

    let lastObject = newTagFilterList[newTagFilterList.length - 1];
    return isTagFilterComplete(lastObject);
  };

  const addTagFilterRow = () => {
    let newTagFilterList = tagFilterRows;

    if (lastTagFilterComplete()) {
      let newRow = {field: "", filter: "", value: ""};
      newTagFilterList.push(newRow);
      validateAndSetData(newTagFilterList);
    }
  };

  const deleteTagFilterRow = (index) => {
    setErrorMessage("");
    let newTagFilterList = tagFilterRows;
    newTagFilterList.splice(index, 1);
    validateAndSetData(newTagFilterList);
  };

  const updateFilter = (index, innerField, newValue) => {
    let newPropertyList = tagFilterRows;
    if (newPropertyList[index][innerField] !== newValue.value) {
      newPropertyList[index][innerField] = newValue.value;
      validateAndSetData(newPropertyList);
    }
  };

  const updateText = (index, innerField, newValue) => {
    let newPropertyList = tagFilterRows;
    if (newPropertyList[index][innerField] !== newValue) {
      newPropertyList[index][innerField] = newValue;
      validateAndSetData(newPropertyList);
    }
  };

  const getFieldBody = () => {
    if (!tagFilterRows || tagFilterRows.length === 0) {
      return (
        <div className="roles-input">
          <div className="text-center text-muted no-data-message">
            No Tag Filter rows have been added yet.
          </div>
        </div>
      );
    }

    return (
      <div className="flex-fill">
        {tagFilterRows.map((tagFilter, index) => {
          return (
            <div
              key={index}
              className={index % 2 === 0 ? "odd-row" : "even-row"}
            >
              <SfdcTagFilterInputRow
                index={index}
                disabled={disabled}
                filter={tagFilter?.filter}
                filterField={tagFilter?.field}
                filterValue={tagFilter?.value}                
                updateFilter={(newValue) =>
                  updateFilter(index, "filter", newValue)
                }                
                updateFilterField={(newValue) =>
                  updateText(index, "field", newValue)
                }
                updateFilterValue={(newValue) =>
                  updateText(index, "value", newValue)
                }
                deleteTagFilterRow={deleteTagFilterRow}                
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
        <Col sm={11}>
          <Row>
            <Col sm={5}>
              <span className="text-muted">Field</span>
            </Col>
            <Col sm={2}>
              <span className="text-muted">Filter</span>
            </Col>
            <Col sm={5}>
              <span className="text-muted pl-2">Value</span>
            </Col>            
          </Row>
        </Col>
        <Col sm={1} className={"pr-3 pl-0 delete-button"} />
      </div>
    );
  };

  const getIncompleteTagFiltersMessage = () => {
    if (!lastTagFilterComplete()) {
      return (`Incomplete Tag Filter Rows Will Be Removed Upon Saving`);
    }
  };

  const getHelpComponent = () => {
    if (helpComponent) {
      return (helpComponent);
    }
  };

  const getTagFilterMessage = () => {
    return (`If a Tag Filter level is not assigned, any hits at that level will be ignored.`);
  };

  if (field == null) {
    return <></>;
  }

  return (
    <div className={className}>
      <PropertyInputContainer
        titleIcon={faClipboardListCheck}
        field={field}
        addProperty={addTagFilterRow}
        titleText={field?.label}
        errorMessage={errorMessage}
        type={"Tag Filter"}
        addAllowed={disabled !== true}
        helpComponent={getHelpComponent()}
        incompleteRowMessage={getIncompleteTagFiltersMessage()}
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
      <InfoText customMessage={getTagFilterMessage()} />
    </div>
  );
}

SfdcTagsFilterInputBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  helpComponent: PropTypes.object,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default SfdcTagsFilterInputBase;