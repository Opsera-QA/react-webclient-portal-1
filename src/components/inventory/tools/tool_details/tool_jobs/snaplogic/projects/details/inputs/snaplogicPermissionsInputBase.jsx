import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { faClipboardListCheck } from "@fortawesome/pro-light-svg-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropertyInputContainer from "components/common/inputs/object/PropertyInputContainer";
import axios from "axios";
import InfoText from "components/common/inputs/info_text/InfoText";
import SnaplogicPermissionInputRow from "./SnaplogicPermissionInputRow";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";
import LoadingDialog from "../../../../../../../../common/status_notifications/loading";
import snaplogicToolActions from "../../../snaplogic-tool-actions";

function SnaplogicPermissionsInputBase({
  fieldName,
  model,
  setModel,
  helpComponent,
  disabled,
  className,
}) {
  const [field] = useState(model.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [thresholdRows, setThresholdRows] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    unpackData();

    loadData(source).catch((error) => {
      throw error;
    });

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
      unpackedRoles.push({ perms: [], subject_type: "", subject: "" });
    }
    setThresholdRows([...unpackedRoles]);
  };

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadUserGroups(cancelSource);
    } catch (error) {
      setErrorMessage("There was an error pulling rules");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserGroups = async (cancelSource = cancelTokenSource) => {
    const response = await snaplogicToolActions.getSnaplogicUserGroups(
      getAccessToken,
      cancelTokenSource,
      model.getData("toolId"),
    );
    const userGrps = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(userGrps)) {
      setUserGroups(userGrps);
    }
  };

  const validateAndSetData = (newRoleList) => {
    setThresholdRows([...newRoleList]);
    let newModel = { ...model };

    if (newRoleList.length > field.maxItems) {
      setErrorMessage(
        "You have reached the maximum allowed number of permission rows. Please remove one to add another.",
      );
      return;
    }

    let newArray = [];

    if (newRoleList && newRoleList.length > 0) {
      newRoleList.map((item) => {
        const perms = item?.perms;
        const subject_type = item?.subject_type;
        const subject = item?.subject;

        if (
          (perms && perms.length < 1) ||
          subject_type === "" ||
          subject === ""
        ) {
          return;
        }

        newArray.push(item);
      });
    }

    newModel.setData(fieldName, [...newArray]);
    setModel({ ...newModel });
  };

  const isThresholdComplete = (threshold) => {
    return (
      threshold?.perms !== [] &&
      threshold?.subject_type !== "" &&
      threshold?.subject !== ""
    );
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
      let newRow = { perms: [], subject_type: "", subject: "" };
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

  const updatePermissionsRow = (index, innerField, newValue) => {
    let result = newValue.map(({ value }) => value);
    let newPropertyList = thresholdRows;
    newPropertyList[index]["perms"] = result;
    validateAndSetData(newPropertyList);
  };

  const updateSubjectTypeRow = (index, innerField, newValue) => {
    let newPropertyList = thresholdRows;
    console.log(newPropertyList[index][innerField]);
    if (newPropertyList[index][innerField] !== newValue?.value) {
      newPropertyList[index][innerField] = newValue?.value;
      validateAndSetData(newPropertyList);
    }
  };
  const updateSubjectRow = (index, innerField, newValue) => {
    let newPropertyList = thresholdRows;
    console.log(newPropertyList[index][innerField]);
    if (newPropertyList[index][innerField] !== newValue) {
      newPropertyList[index][innerField] = newValue;
      validateAndSetData(newPropertyList);
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
              <SnaplogicPermissionInputRow
                disabled={disabled}
                index={index}
                deleteThresholdRow={deleteThresholdRow}
                loading={isLoading}
                perms={threshold?.perms}
                subject_type={threshold?.subject_type}
                subject={threshold?.subject}
                userGroups={userGroups}
                updatePermissionsRow={(newValue) =>
                  updatePermissionsRow(index, "perms", newValue)
                }
                updateSubjectTypeRow={(newValue) =>
                  updateSubjectTypeRow(index, "subject_type", newValue)
                }
                updateSubjectRow={(newValue) =>
                  updateSubjectRow(index, "subject", newValue)
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
            <Col sm={4}>
              <span className="text-muted ml-5">Permission</span>
            </Col>
            <Col
              sm={4}
              className={"mx-auto"}
            >
              <span className="text-muted">Subject Type</span>
            </Col>
            <Col
              sm={4}
              className={"mx-auto"}
            >
              <span className="text-muted">Subject</span>
            </Col>
          </Row>
        </Col>
        <Col
          sm={1}
          className={"pr-3 pl-0 delete-button"}
        />
      </div>
    );
  };

  const getIncompleteThresholdsMessage = () => {
    if (!lastThresholdComplete()) {
      return `Incomplete Permission Rows Will Be Removed Upon Saving`;
    }
  };

  const getHelpComponent = () => {
    if (helpComponent) {
      return helpComponent;
    }
  };

  const getThresholdMessage = () => {
    return ``;
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
        type={"Permission"}
        addAllowed={lastThresholdComplete() && disabled !== true}
        helpComponent={getHelpComponent()}
        incompleteRowMessage={getIncompleteThresholdsMessage()}
      >
        <div>
          <div className={"filter-bg-white"}>{getHeaderBar()}</div>
          <div className="rules-input">{getFieldBody()}</div>
        </div>
      </PropertyInputContainer>
      <InfoText customMessage={getThresholdMessage()} />
    </div>
  );
}

SnaplogicPermissionsInputBase.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  helpComponent: PropTypes.object,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default SnaplogicPermissionsInputBase;
