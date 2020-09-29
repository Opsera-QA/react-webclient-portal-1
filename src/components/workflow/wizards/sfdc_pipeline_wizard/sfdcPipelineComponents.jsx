import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepForward,
  faSpinner,
  faTimes,
  faStepBackward,
  faCheck,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import Moment from "moment";
import momentLocalizer from "react-widgets-moment";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import DropdownList from "react-widgets/lib/DropdownList";
import "../../workflows.css";
import LoadingDialog from "components/common/status_notifications/loading";
import ErrorDialog from "components/common/status_notifications/error";
import sfdcPipelineActions from "./sfdc-pipeline-actions";

const INITIAL_COMPONENT_TYPES_FORM = {
  customerId: "", //ssoUsersID assgined at the Node layer
  lastCommitTimeStamp: "", //asOfDate value as string
  pipelineId: "",
  stepId: "", //assume for now it's the first
  nameSpacePrefix: "", // prefix
  objectType: "", // type of objs managed custom or all
  componentTypes: [],
};

const INITIAL_OBJECT_TYPES = {
  managed: false,
  custom: false,
  all: true,
};

const SfdcPipelineComponents = ({
  pipelineId,
  stepId,
  setView,  
  nameSpacePrefix,
  setNameSpacePrefix,
  isProfiles,
  setSelectedComponentTypes,
  selectedComponentTypes,
  setModifiedFiles,
  handleClose,
  setSfdcComponentFilterObject,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [configurationError, setConfigurationError] = useState(false);
  const [save, setSave] = useState(false);
  const [componentTypes, setComponentTypes] = useState([]);
  // const [selectedComponentTypes, setSelectedComponentTypes] = useState([]);
  const [componentTypeForm, setComponentTypeForm] = useState(INITIAL_COMPONENT_TYPES_FORM);
  const [formData, setFormData] = useState(INITIAL_OBJECT_TYPES);

  Moment.locale("en");
  momentLocalizer();
  const [asOfDate, setAsOfDate] = useState(Moment(new Date(new Date().setHours(0, 0, 0, 0))).toISOString());

  useEffect(() => {
    setConfigurationError(false);
    setComponentTypeForm(INITIAL_COMPONENT_TYPES_FORM);
  }, []);

  useEffect(() => {
    let ignore = false;
  
    async function loadData () {
      setLoading(true);
  
      try {
        // const accessToken = await getAccessToken();
        const response = await sfdcPipelineActions.getComponentTypes({isProfiles}, getAccessToken);
        
        if (!ignore) setComponentTypes(response.data);
      } catch (error) {
        console.error("Error getting API Data: ", error);
        setError(error);
      }
      setLoading(false);
    }
  
    loadData();
    return () => { ignore = true; }
  }, [isProfiles]);

  const dateAsOf = (
    <DateTimePicker
      time={true}
      min={new Date().setMonth(new Date().getMonth() - 3)}
      max={new Date()}
      defaultValue={new Date(new Date().setHours(0, 0, 0, 0))}
      onChange={(value) => handleAsOfDateChange({ value })}
      initialValue={new Date(new Date().setHours(0, 0, 0, 0))}
    />
  );

  const handleAsOfDateChange = (value) => {
    const date = Moment(value.value).toISOString();
    setAsOfDate(date);
  };

  const handleCheckAllClickComponentTypes = () => {
    setSelectedComponentTypes(componentTypes);
  };

  const handleUnCheckAllClickComponentTypes = () => {
    setSelectedComponentTypes([]);
  };

  const handleComponentCheck = (e) => {
    const newValue = e.target.name;
    if (e.target.checked) {
      setSelectedComponentTypes((selectedComponentTypes) => [...selectedComponentTypes, newValue]);
    } else {
      setSelectedComponentTypes(selectedComponentTypes.filter((item) => item !== newValue));
    }
  };

  const handleSubmitComponentTypes = async () => {
    let keys = Object.keys(formData);
    let filtered = keys.filter(function (key) {
      return formData[key];
    });
    const postBody = componentTypeForm;
    postBody.pipelineId = pipelineId;
    postBody.stepId = stepId;
    postBody.lastCommitTimeStamp = isProfiles ? "1900-01-01T00:00:00.000Z" : asOfDate;
    postBody.componentTypes = isProfiles ? ["Profile"] : selectedComponentTypes;
    postBody.objectType = filtered[0];
    postBody.nameSpacePrefix = nameSpacePrefix;

    console.log(postBody);
    await postComponentTypes(postBody);
  };

  const postComponentTypes = async (data) => {
    setSfdcComponentFilterObject(data);

    try {
      const result = await sfdcPipelineActions.getModifiedFiles(data, getAccessToken);
      setModifiedFiles(result.data);

      if (result.data.status === 500) {
        console.error("Error getting API Data: ", result.data.message);
        setError(result.data.message);
      } else {
        setView(2); //move to next view
      }
    } catch (err) {
      console.error(err.message);
      setError(error);
    }
  };

  return (
    <div className="ml-5">
      <div className="flex-container">
        <div className="flex-container-top"></div>
        <div className="flex-container-content">
          <div className="h5">SalesForce Pipeline Run</div>
          <div className="text-muted">Select component types to include in this pipeline run.</div>

          {error && <ErrorDialog error={error} align={"top"} setError={setError} />}

          {!configurationError && (
            <>
              <div className="mt-3 mr-3">
                <div className="d-flex justify-content-between">
                  {!isProfiles && 
                  <div className="px-2">
                    <div className="text-muted pl-1 pb-1">Date Filter:</div>
                    {dateAsOf}
                  </div>
                  }
                  
                  <div className="px-2">
                    <div className="text-muted pl-1 pb-1">Prefix:</div>
                    <Form.Group controlId="nameSpacePrefix">
                      <Form.Control
                        maxLength="50"
                        type="text"
                        placeholder=""
                        value={nameSpacePrefix || ""}
                        className={"mb-1"}
                        onChange={(e) => setNameSpacePrefix(e.target.value)}
                      />
                    </Form.Group>
                  </div>

                  <div className="px-2">
                    <div className="text-muted pl-1 pb-1">Types:</div>

                    <Form.Group controlId="formBasicCheckbox" className="ml-1 d-flex">
                      <Form.Check
                        inline
                        type={"checkbox"}
                        label="Managed"
                        name="managed"
                        checked={formData.managed ? formData.managed : false}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            managed: e.target.checked,
                            custom: false,
                            all: false,
                          })
                        }
                      />

                      <Form.Check
                        inline
                        type={"checkbox"}
                        label="Custom"
                        name="custom"
                        checked={formData.custom ? formData.custom : false}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            managed: false,
                            custom: e.target.checked,
                            all: false,
                          })
                        }
                      />

                      <Form.Check
                        inline
                        type={"checkbox"}
                        label="All"
                        name="all"
                        checked={formData.all ? formData.all : false}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            managed: false,
                            custom: false,
                            all: e.target.checked,
                          })
                        }
                      />
                    </Form.Group>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="px-2"></div>

                  <div className="align-self-end">
                    {/* <Button variant="secondary" size="sm" className="mr-2" onClick={handleCheckAllClickComponentTypes}>
                      <FontAwesomeIcon icon={faCheck} fixedWidth className="mr-1" />
                      Check All
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="mr-2"
                      onClick={handleUnCheckAllClickComponentTypes}
                    >
                      <FontAwesomeIcon icon={faSquare} fixedWidth className="mr-1" />
                      Uncheck All
                    </Button> */}
                  </div>
                </div>
              </div>

              <div className="mx-2">
                <div className="text-muted">Select Components:</div>
                <div className="d-flex flex-wrap">
                  {loading ? (
                    <LoadingDialog size="sm" />
                  ) : (
                    <>
                      {typeof componentTypes === "object" &&
                        componentTypes.map((item, idx) => (
                          <div key={item} className="p-2 w-25">
                            <Form.Check
                              inline
                              type={"checkbox"}
                              label={item}
                              name={item}
                              id={item}
                              checked={selectedComponentTypes.includes(item)}
                              onChange={handleComponentCheck}
                            />
                          </div>
                        ))}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex-container-bottom pr-2 mt-4 mb-2 text-right">
          <Button variant="secondary" size="sm" className="mr-2" disabled={true}>
            <FontAwesomeIcon icon={faStepBackward} fixedWidth className="mr-1" />
            Back
          </Button>

          <Button
            variant="success"
            size="sm"
            onClick={() => {
              setSave(true);
              handleSubmitComponentTypes();
            }}
            disabled={save}
          >
            {save ? (
              <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth />
            ) : (
              <FontAwesomeIcon icon={faStepForward} fixedWidth className="mr-1" />
            )}
            Next
          </Button>

          {/*<Button variant="outline-secondary" size="sm" className="ml-2"
                  onClick={() => {
                    handleClose();
                  }}>
            <FontAwesomeIcon icon={faTimes} fixedWidth className="mr-1"/>Cancel</Button>*/}
        </div>
      </div>
    </div>
  );
};

const AccountDropDown = ({ data, setAccount, isLoading }) => {
  return <DropdownList data={data} busy={isLoading} valueField="id" textField="name" onChange={setAccount} />;
};

SfdcPipelineComponents.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  setView: PropTypes.func,
  nameSpacePrefix: PropTypes.string,
  setNameSpacePrefix: PropTypes.func,
  isProfiles: PropTypes.bool,
  setSelectedComponentTypes: PropTypes.func,
  selectedComponentTypes: PropTypes.array,
  setModifiedFiles: PropTypes.func,
  handleClose: PropTypes.func,
  setSfdcComponentFilterObject: PropTypes.func,
};

AccountDropDown.propTypes = {
  data: PropTypes.array,
  setAccount: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default SfdcPipelineComponents;
