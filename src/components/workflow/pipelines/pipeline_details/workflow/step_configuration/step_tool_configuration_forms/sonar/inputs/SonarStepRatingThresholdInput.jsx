import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faClipboardListCheck} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import axios from "axios";
import InfoText from "components/common/inputs/info_text/InfoText";
import SonarRatingThresholdInputRow from "./SonarRatingThresholdInputRow";

function SonarStepRatingThresholdInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    className,    
  }) {

  const [field] = useState(model.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [thresholdRows, setThresholdRows] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    unpackData();

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const unpackData = () => {
    let currentData = model.getData(fieldName);
    let unpackedRoles = [];

    if (Array.isArray(currentData) && currentData.length > 0) {
      unpackedRoles = currentData;
    } else {
      unpackedRoles.push({level: "", grade: ""});
    }

    setThresholdRows([...unpackedRoles]);
  };

  const validateAndSetData = (newRoleList) => {
    setThresholdRows([...newRoleList]);
    let newModel = {...model};

    if (newRoleList.length > field.maxItems) {
      setErrorMessage("You have reached the maximum allowed number of Threshold rows. Please remove one to add another.");
      return;
    }

    let newArray = [];

    if (newRoleList && newRoleList.length > 0) {
      newRoleList.map((item) => {
        const level = item?.level;
        const grade = item?.grade;

        if (level === "" || grade === "") {
          return;
        }

        newArray.push(item);
      });
    }

    newModel.setData(fieldName, [...newArray]);
    setModel({...newModel});
  };

  const isThresholdComplete = (threshold) => {
    return threshold?.level !== "" && threshold?.grade !== "";
  };

  const lastThresholdComplete = () => {
    let newThresholdList = thresholdRows;

    if (newThresholdList.length === 0) {
      return true;
    }

    let lastObject = newThresholdList[newThresholdList.length - 1];
    return isThresholdComplete(lastObject);
  };

  const addThresholdRow = () => {
    setErrorMessage("");
    let newThresholdList = thresholdRows;

    if (lastThresholdComplete()) {
      let newRow = {level: "", grade: ""};
      newThresholdList.push(newRow);
      validateAndSetData(newThresholdList);
    }
  };

  const deleteThresholdRow = (index) => {
    setErrorMessage("");
    let newThresholdList = thresholdRows;
    newThresholdList.splice(index, 1);
    validateAndSetData(newThresholdList);
  };

  const updateThresholdRow = (index, innerField, newValue) => {
    setErrorMessage("");
    let newPropertyList = thresholdRows;

    if (innerField === "level" && newPropertyList.filter(prop => prop.level === newValue).length > 0) {
      setErrorMessage("You have already added this level.");
      return;
    }

    if (newPropertyList[index][innerField] !== newValue) {
      newPropertyList[index][innerField] = newValue;
      validateAndSetData(newPropertyList);
    }
  };

  const getFieldBody = () => {
    if (!thresholdRows || thresholdRows.length === 0) {
      return (
        <div className="roles-input">
          <div className="text-center text-muted no-data-message">No Threshold rows have been added yet.</div>
        </div>
      );
    }

    return (
      <div className="flex-fill">
        {thresholdRows.map((threshold, index) => {
          return (
            <div key={index} className={index % 2 === 0 ? "odd-row" : "even-row"}>
              <SonarRatingThresholdInputRow
                disabled={disabled}
                index={index}
                deleteThresholdRow={deleteThresholdRow}
                grade={threshold?.grade}
                level={threshold?.level}
                updateThresholdGrade={(newValue) => updateThresholdRow(index, "grade", newValue)}
                updateThresholdLevel={(newValue) => updateThresholdRow(index, "level", newValue)}
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
            <Col sm={6}>
              <span className="text-muted ml-5">Level</span>
            </Col>
            <Col sm={6} className={"mx-auto"}>
              <span className="text-muted">Value</span>
            </Col>
          </Row>
        </Col>
        <Col sm={1} className={"pr-3 pl-0 delete-button"} />
      </div>
    );
  };

  const getIncompleteThresholdsMessage = () => {
    if (!lastThresholdComplete()) {
      return (`Incomplete Threshold Rows Will Be Removed Upon Saving`);
    }
  };

  const getThresholdMessage = () => {
    return (`If a Threshold level is not assigned, any hits at that level will be ignored.`);
  };

  if (field == null) {
    return <></>;
  }

  return (
    <div className={className}>
      <PropertyInputContainer
        titleIcon={faClipboardListCheck}
        field={field}
        addProperty={addThresholdRow}
        titleText={field?.label}
        errorMessage={errorMessage}
        type={"Threshold"}
        addAllowed={lastThresholdComplete() && disabled !== true}
        incompleteRowMessage={getIncompleteThresholdsMessage()}
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
      <InfoText customMessage={getThresholdMessage()} />
    </div>
  );
}

SonarStepRatingThresholdInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

SonarStepRatingThresholdInput.defaultProps = {
  fieldName: "thresholdRating",
  visible: true,
  className: "mb-3",
};

export default SonarStepRatingThresholdInput;
