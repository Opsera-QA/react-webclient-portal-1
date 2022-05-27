import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {faClipboardListCheck} from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import axios from "axios";
import InfoText from "components/common/inputs/info_text/InfoText";
import SfdxScanRuleThresholdInputRow from "./SfdxScanRuleThresholdInputRow";
import toolsActions from "../../../../../../../../inventory/tools/tools-actions";
import {AuthContext} from "../../../../../../../../../contexts/AuthContext";
import LoadingDialog from "../../../../../../../../common/status_notifications/loading";

function SfdxScanThresholdInputBase({ fieldName, model, setModel, helpComponent, disabled, className }) {
  const [field] = useState(model.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [thresholdRows, setThresholdRows] = useState([]);
  const [thresholdRules, setThresholdRules] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  const { getAccessToken } = useContext(AuthContext);
  const [placeholder, setPlaceholderText] = useState(
      "Select rule",
  );

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    unpackData();

    if(model.getData("category") && model.getData("category").length > 0) {
      loadData(source).catch((error) => {
        throw error;
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [model.getData("category")]);

  const unpackData = () => {
    let currentData = model.getData(fieldName);
    let unpackedRoles = [];

    if (Array.isArray(currentData) && currentData.length > 0) {
      unpackedRoles = currentData;
    } else {
      unpackedRoles.push({level: "", count: "", engine: "", description: ""});
    }
    setThresholdRows([...unpackedRoles]);
  };

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadPmdRules(cancelSource);
    } catch (error) {
      setPlaceholderText("No Rules Available!");
      setErrorMessage("There was an error pulling rules");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPmdRules = async (cancelSource = cancelTokenSource) => {
    const response = await toolsActions.getSfdxScanRules(
        getAccessToken,
        cancelTokenSource,
    );
    const rules = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(rules)) {
      setPlaceholderText("Select Rule");

      let filteredRules = rules.filter((rule) => {
        return rule.category === model.getData("category");
      });
      // let lookup = {};
      // let items = filteredRules;
      // let filteredPriorities = [];
      //
      // for (let i = 0; items[i]; i++) {
      //   let priority = items[i].priority;
      //
      //   if (!(priority in lookup)) {
      //     lookup[priority] = 1;
      //     filteredPriorities.push(priority);
      //   }
      // }
      setThresholdRules(filteredRules);
    }
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
        const count = item?.count;
        const engine = item?.engine;
        const description = item?.description;

        if (level === "" || count === "") {
          return;
        }

        newArray.push(item);
      });
    }

    newModel.setData(fieldName, [...newArray]);
    setModel({...newModel});
  };

  const isThresholdComplete = (threshold) => {
    return threshold?.level !== "" && threshold?.count !== "";
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
    let newThresholdList = thresholdRows;

    if (lastThresholdComplete()) {
      let newRow = {level: "", count: "", engine: "", description: ""};
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
    let newPropertyList = thresholdRows;
    if (newPropertyList[index][innerField] !== newValue?.name) {
      newPropertyList[index][innerField] = newValue.name;
      newPropertyList[index]["description"] = newValue.description;
      newPropertyList[index]["engine"] = newValue.engine;
      validateAndSetData(newPropertyList);
    }
  };

  const updateThresholdCountRow = (index, innerField, newValue) => {
    let newPropertyList = thresholdRows;
    console.log(newPropertyList[index][innerField] );
    if (newPropertyList[index][innerField] !== newValue) {
      newPropertyList[index][innerField] = newValue;
      validateAndSetData(newPropertyList);
    }
  };

  const hasDuplicates = (thresholdRows) => {
    let permittedValues = thresholdRows.map(value => value.level);
    const noDups = new Set(permittedValues);
    // console.log(permittedValues.length !== noDups.size);
    return permittedValues.length !== noDups.size;
  };

  const getDisabledThresholdLevels = () => {
    if (thresholdRows.length > 0) {
      const disabledThresholdLevels = [];
      thresholdRows.map((property) => {
          disabledThresholdLevels.push(property?.level);
      });
      return disabledThresholdLevels;
    }
  };

  const getFieldBody = () => {
    if (!thresholdRows || thresholdRows.length === 0) {
      return (
        <div className="roles-input">
          <div className="text-center text-muted no-data-message">
            No Threshold rows have been added yet.
          </div>
        </div>
      );
    }

    if (isLoading) {
      return (
        <LoadingDialog
          size="sm"
          message={"Loading Data"}
        />
      );
    }

    return (
      <div className="flex-fill">
        {thresholdRows.map((threshold, index) => {
          return (
            <div
              key={index}
              className={index % 2 === 0 ? "odd-row" : "even-row"}
            >
              <SfdxScanRuleThresholdInputRow
                disabled={disabled}
                duplicates={hasDuplicates(thresholdRows)}
                index={index}
                deleteThresholdRow={deleteThresholdRow}
                disabledThresholdLevels={getDisabledThresholdLevels()}
                loading={isLoading}
                count={threshold?.count}
                level={threshold?.level}
                engine={threshold?.engine}
                description={threshold?.description}
                thresholdKeys={thresholdRules}
                updateThresholdCount={(newValue) =>
                  updateThresholdCountRow(index, "count", newValue)
                }
                updateThresholdLevel={(newValue) =>
                  updateThresholdRow(index, "level", newValue)
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
        <Col sm={11}>
          <Row>
            <Col sm={6}>
              <span className="text-muted ml-5">Rule</span>
            </Col>
            <Col sm={2} className={"mx-auto"}>
              <span className="text-muted">Threshold/Count</span>
            </Col>
            <Col sm={2} className={"mx-auto"}>
              <span className="text-muted">Engine</span>
            </Col>
            <Col sm={2} className={"mx-auto"}>
              <span className="text-muted">Description</span>
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

  const getHelpComponent = () => {
    if (helpComponent) {
      return (helpComponent);
    }
  };

  const getThresholdMessage = () => {
    return (`If a threshold level is not assigned, any hits at that level will be ignored.`);
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
        helpComponent={getHelpComponent()}
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

SfdxScanThresholdInputBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  helpComponent: PropTypes.object,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default SfdxScanThresholdInputBase;