import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBracketsCurly, faInfoCircle, faSync, faTimes, faHandshake } from "@fortawesome/pro-light-svg-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DialogToastContext } from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import InfoText from "components/common/inputs/info_text/InfoText";
import taskActions from "components/tasks/task.actions";
import gitTasksFilterMetadata from "components/tasks/git-tasks-filter-metadata";
import Model from "../../../../../../../../../core/data_model/model";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";

function MultiTaskSelectInputBase({
  dataObject,
  setDataObject,
  fieldName,
  disabledFields,
  type,
  titleIcon,
  allowIncompleteItems,
  titleText,
  nameMaxLength,
  regexValidationRequired,
  disabled,
  plan,
  stepIdParent,
  tool_prop,
}) {
  const [field] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [properties, setProperties] = useState([]);
  const [taskId, setTaskId] = useState("");
  const [taskName, setTaskName] = useState("");
  const [stepName, setStepName] = useState("");
  const [stepId, setStepId] = useState("");
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [taskList, setTaskList] = useState([]);
  const [isTaskSearching, setIsTaskSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [s3PlaceHolder, setS3PlaceHolder] = useState("Select S3 Push Step") ;
  const [lambdaPlaceholder, setLambdaPlaceholder] = useState("Select Lambda Function Template") ;
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [gitTasksFilterDto, setGitTasksFilterDto] = useState(
    new Model({ ...gitTasksFilterMetadata.newObjectFields }, gitTasksFilterMetadata, false)
  );
  const [s3List, setS3List] = useState([]);
  const [isS3Searching, setIsS3Searching] = useState(false);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (!disabled) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    let newDataObject = { ...dataObject };
    newDataObject.setData(fieldName, properties);
    setDataObject({ ...newDataObject });
  }, [properties]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let currentData = dataObject?.getData(fieldName);
      let items = Array.isArray(currentData) && currentData.length > 0 ? currentData : [];
      setProperties([...items]);
      await fetchS3StepDetails();
      await fetchLambdaTemplates(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLambdaTemplates = async (cancelSource) => {
    setIsTaskSearching(true);
    try {
      let newFilterDto = gitTasksFilterDto;
      newFilterDto.setData("type", "lambda_function_creation");
      setGitTasksFilterDto({ ...newFilterDto });
      const results = await taskActions.getTasksListV2(getAccessToken, cancelSource, gitTasksFilterDto);
      const taskListCopy = results?.data?.data;
      if (isMounted?.current === true && results?.data?.data) {
        setTaskList(taskListCopy);
        return;
      }
    } catch (error) {
      if (taskList.length === 0) {
        setLambdaPlaceholder("No Parameters Found");
      }
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsTaskSearching(false);
    }
  };

  const fetchS3StepDetails = async () => {
    setIsS3Searching(true);
    try {
      if (plan && stepIdParent) {
        let pipelineSteps = formatStepOptions(plan, stepIdParent);
        let dockerSteps = pipelineSteps.filter((step) => step.tool.tool_identifier.toLowerCase() === "s3");
        setS3List(dockerSteps);
        if (dockerSteps.length === 0) {
          setLambdaPlaceholder("No S3 Push Steps Configured");
        }
      }
    } catch (error) {
      setLambdaPlaceholder("No S3 Push Steps Configured");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsS3Searching(false);
    }
  };

  const formatStepOptions = (plan, stepId) => {
    return plan.slice(
      0,
      plan.findIndex((element) => element._id === stepId)
    );
  };

  const validateAndSetData = (newPropertyList) => {
    setProperties([...newPropertyList]);
    let newDataObject = { ...dataObject };

    if (newPropertyList.length > field.maxItems) {
      setErrorMessage(`You have reached the maximum allowed number of ${type}. Please remove one to add another.`);
      return;
    }

    let newArray = [];

    if (newPropertyList && newPropertyList.length > 0) {
      newPropertyList.map((property) => {
        if ((allowIncompleteItems !== true && property["taskId"] === "") || property["taskName"] === "") {
          return;
        }
        newArray.push(property);
      });
    }

    newDataObject.setData(fieldName, newArray);
    setDataObject({ ...newDataObject });
  };

  const addProperty = () => {
    setErrorMessage("");

    if (properties.length + 1 > field.maxItems) {
      setErrorMessage(`You have reached the maximum allowed number of ${type}. Please remove one to add another.`);
      return;
    }

    for (let item in properties) {
        if (Object.values(properties[item]).includes(taskId)) {
          setErrorMessage("Existing Lambda Tasks cannot be mapping twice");
          return;
        }
      }

    setProperties([
      ...properties,
      {
        taskId,
        taskName,
        stepId,
        stepName,
      },
    ]);
    setTaskId("");
    setTaskName("");
    setStepId("");
    setStepName("");
  };

  const deleteProperty = (index) => {
    setErrorMessage("");
    let currentData = dataObject?.getData(fieldName);
    let items = Array.isArray(currentData) && currentData.length > 0 ? currentData : [];
    let newPropertyList = items;
    newPropertyList.splice(index, 1);
    validateAndSetData(newPropertyList);
  };

  const setTaskData = (data, setData) => {
    setTaskId(data._id);
    setTaskName(data.name);
  };

  const setStepData = (data, setData) => {
    setStepId(data._id);
    setStepName(data.name);
  };

  const getInputRow = () => {
    return (
      <div className="my-2">
        <Row>
          <Col sm={5} className={"my-1 ml-2"}>
            <StandaloneSelectInput
              selectOptions={taskList ? taskList : []}
              valueField={"_id"}
              textField={"name"}
              value={taskName}
              busy={isTaskSearching}
              placeholderText={lambdaPlaceholder}
              setDataFunction={(data) => setTaskData(data)}
              disabled={isLoading || (!isLoading && (taskList == null || taskList.length === 0))}
            />
          </Col>
          <Col sm={5} className={"my-1 ml-2"}>
            <StandaloneSelectInput
              selectOptions={s3List ? s3List : []}
              valueField={"_id"}
              textField={"name"}
              value={stepName}
              busy={isS3Searching}
              placeholderText={s3PlaceHolder}
              setDataFunction={(data) => setStepData(data)}
              disabled={isLoading || (!isLoading && (s3List == null || s3List.length === 0))}
            />
          </Col>
          <Button
            size="sm"
            className="mt-1 ml-2 px-2"
            style={{ height: "99%" }}
            variant="success"
            disabled={allowIncompleteItems && (!taskId || taskId.length === 0 || !stepId || stepId.length === 0)}
            onClick={() => {
              addProperty();
            }}
          >
            Add
          </Button>
        </Row>
      </div>
    );
  };

  const getPropertyRow = (property, index) => {
    return (
      <div
        className={`d-flex align-items-center justify-content-between ${index % 2 === 0 ? "even-row" : "odd-row"}`}
        key={index}
      >
        <Col sm={11}>
          <Row>
            <Col sm={6} className={"pl-2 pr-0 force-text-wrap"}>
              {property["taskName"]}
            </Col>
            <Col sm={6} className={"pl-2 pr-0 force-text-wrap"}>
              {property["stepName"]}
            </Col>
          </Row>
        </Col>
        <Col sm={1} className={"pr-3 pl-0 delete-button"}>
          {getDeletePropertyButton(index)}
        </Col>
      </div>
    );
  };

  const getFieldBody = () => {
    return (
      <>
        <div className="flex-fill">
          {(dataObject?.getData("lambdaTasks") && Array.isArray(dataObject?.getData("lambdaTasks"))
            ? dataObject?.getData("lambdaTasks")
            : []
          ).map((property, index) => {
            return getPropertyRow(property, index);
          })}
        </div>
        <div className="flex-fill">{getInputRow()}</div>
      </>
    );
  };

  const getDeletePropertyButton = (index) => {
    return (
      <Button variant="link" onClick={() => deleteProperty(index)}>
        <span>
          <FontAwesomeIcon className="danger-red" icon={faTimes} fixedWidth />
        </span>
      </Button>
    );
  };

  const getHeaderBar = () => {
    return (
      <div className="d-flex justify-content-between page-description">
        <Col sm={11}>
          <Row>
            <Col sm={6} className={"pl-2 pr-0 py-2"}>
              <span className="text-muted">Lambda Function</span>
            </Col>
            <Col sm={6} className={"pl-2 pr-0 py-2"}>
              <span className="text-muted">S3 Push Step</span>
            </Col>
          </Row>
        </Col>
      </div>
    );
  };

  const getTitleBar = () => {
    return (
      <div className="pl-2 pt-2 d-flex justify-content-between">
        <div>
          <FontAwesomeIcon icon={titleIcon} fixedWidth className="mr-2" />
          {titleText}
        </div>
        <span></span>
      </div>
    );
  };

  if (field == null) {
    return null;
  }

  return (
    <div className="object-properties-input py-2">
      <div className="content-container">
        <div className="property-header">
          <h6>{getTitleBar()}</h6>
        </div>
        <div>{properties.length > 0 ? getHeaderBar() : null}</div>
        <div className="properties-body-alt">{getFieldBody()}</div>
      </div>
      <InfoText
        model={dataObject}
        fieldName={fieldName}
        field={field}
        errorMessage={errorMessage}
      />
    </div>
  );
}

MultiTaskSelectInputBase.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabledFields: PropTypes.array,
  fieldName: PropTypes.string,
  titleIcon: PropTypes.object,
  type: PropTypes.string,
  allowIncompleteItems: PropTypes.bool,
  titleText: PropTypes.string,
  nameMaxLength: PropTypes.number,
  regexValidationRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  plan: PropTypes.array,
  stepIdParent: PropTypes.string,
  tool_prop: PropTypes.string,
};

MultiTaskSelectInputBase.defaultProps = {
  titleIcon: faBracketsCurly,
  disabledFields: [],
  allowIncompleteItems: false,
  disabled: false,
  nameMaxLength: 50,
};

export default MultiTaskSelectInputBase;
