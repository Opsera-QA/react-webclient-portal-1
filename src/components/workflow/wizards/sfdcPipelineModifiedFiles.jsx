import React, { useContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faSpinner,
  faTimes,
  faStepBackward,
  faPlus,
  faMinus,
  faPen,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import "../workflows.css";
import ErrorDialog from "components/common/status_notifications/error";
import LoadingDialog from "components/common/status_notifications/loading";
import { propTypes } from "react-widgets/lib/SelectList";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";

const SfdcPipelineModifiedFiles = ({
  pipelineId,
  stepId,
  handleClose,
  setView,
  isOrgToOrg,
  stepToolConfig,
  modifiedFiles,
  fromSFDC,
  fromGit,
  fromDestinationSFDC,
  setFromSFDC,
  setFromGit,
  setXML,
  setFromDestinationSFDC,
  selectedComponentTypes,
  createJenkinsJob,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [save, setSave] = useState(false);
  const [gitModified, setGitModified] = useState([]);
  const [sfdcModified, setSfdcModified] = useState([]);
  const [destSfdcModified, setDestSfdcModified] = useState([]);

  useEffect(() => {
    console.log(modifiedFiles);
    setGitModified(modifiedFiles.gitModified);
    setSfdcModified(modifiedFiles.sfdcModified);
    setDestSfdcModified(modifiedFiles.destSfdcModified);
  }, [modifiedFiles]);

  useEffect(() => {
    if (fromSFDC) {
      setFromDestinationSFDC(false);
      setFromGit(false);
    }
  }, [fromSFDC]);

  useEffect(() => {
    if (fromDestinationSFDC) {
      setFromSFDC(false);
      setFromGit(false);
    }
  }, [fromDestinationSFDC]);

  useEffect(() => {
    if (fromGit) {
      setFromDestinationSFDC(false);
      setFromSFDC(false);
    }
  }, [fromGit]);

  const handleSFDCComponentCheck = (e) => {
    const newValue = e.target.name;
    let newObj = [...sfdcModified];
    let index = -1;
    for (let i = 0; i < newObj.length; i++) {
      if (newObj[i].committedFile === newValue) {
        index = i;
        newObj[index].checked = e.target.checked;
        break;
      }
    }
    setSfdcModified(newObj);
  };

  const handleDestSFDCComponentCheck = (e) => {
    const newValue = e.target.name;
    let newObj = [...destSfdcModified];
    let index = -1;
    for (let i = 0; i < newObj.length; i++) {
      if (newObj[i].committedFile === newValue) {
        index = i;
        newObj[index].checked = e.target.checked;
        break;
      }
    }
    setDestSfdcModified(newObj);
  };

  const handleGitComponentCheck = (e) => {
    const newValue = e.target.name;
    let newObj = [...gitModified];
    let index = -1;
    for (let i = 0; i < newObj.length; i++) {
      if (newObj[i].committedFile === newValue) {
        index = i;
        newObj[index].checked = e.target.checked;
        break;
      }
    }
    setGitModified(newObj);
  };

  const checkDisabled = () => {
    if (fromGit || fromSFDC || fromDestinationSFDC) return false;
    return true;
  };

  const handleApproveChanges = async () => {
    // console.log(fromSFDC,fromDestinationSFDC,fromGit);
    let list = [];
    if (fromSFDC) {
      list = [...sfdcModified];
    }
    if (fromDestinationSFDC) {
      list = [...destSfdcModified];
    }
    if (fromGit) {
      list = [...gitModified];
    }
    const postBody = {
      pipelineId: pipelineId,
      stepId: stepId,
      componentTypes: selectedComponentTypes,
      commitList: list,
      isSfdc: fromSFDC || fromDestinationSFDC ? true : false,
    };

    await generateXML(postBody);
  };

  const generateXML = async (data) => {
    const accessToken = await getAccessToken();
    const apiUrl = "/pipelines/sfdc/generatexml";

    try {
      const result = await axiosApiService(accessToken).post(apiUrl, data);

      if (result.data.status != 200) {
        console.error("Error getting API Data: ", result.data.message);
        setSave(false);
        setError(result.data.message);
      } else {
        setXML(result.data.message);
        setView(3); //move to next view
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
          <div className="h5">SalesForce Pipeline Run: File Comparison</div>
          <div className="text-muted mb-4">
            Listed below are the files with changes impacted in this pipeline run. Please confirm that you want to
            proceed with this operation.
          </div>
          {error && (
            <div className="mt-3">
              <ErrorDialog error={error} />
            </div>
          )}
          {save && <LoadingDialog />}

          {modifiedFiles && (
            <>
              <div className="d-flex w-100 pr-2">
                <div className="col-5 list-item-container mr-1">
                  <div className="h6 opsera-blue">SFDC Files</div>
                  {/* sfdcModified.map */}
                  {sfdcModified && sfdcModified.length === 0 && <div className="info-text mt-3">NO FILES</div>}
                  <div className="px-2">
                    <Form.Group controlId="nameSpacePrefix">
                      <Form.Check
                        type="checkbox"
                        label="Push from SFDC"
                        name="fromSFDC"
                        // disabled={!sfdcComponentFilterObject.nameSpacePrefix || sfdcComponentFilterObject.nameSpacePrefix.length === 0}
                        checked={fromSFDC ? fromSFDC : false}
                        onChange={(e) => setFromSFDC(e.target.checked)}
                      />
                    </Form.Group>
                  </div>
                  {typeof sfdcModified === "object" &&
                    sfdcModified.map((item, idx) => (
                      <div key={idx} className="d-flex justify-content-center">
                        <div className="thick-list-item-container-green  w-100 force-text-wrap p-1">
                          {item.commitAction && item.commitAction === "active" ? (
                            <FontAwesomeIcon icon={faPlus} fixedWidth className="mr-1 green" />
                          ) : (
                            <FontAwesomeIcon icon={faCode} fixedWidth className="mr-1 dark-grey" />
                          )}
                          {item.componentType}: {item.committedFile}
                        </div>
                        <div className="p-1">
                          {fromSFDC && (
                            <Form.Check
                              inline
                              type={"checkbox"}
                              name={item.committedFile}
                              id={idx}
                              checked={item.checked}
                              onChange={handleSFDCComponentCheck}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="col-7 list-item-container">
                  {isOrgToOrg ? (
                    <>
                      <div className="h6 opsera-blue">Destination SFDC Files</div>
                      {/* sfdcModified.map */}
                      {destSfdcModified && destSfdcModified.length === 0 && (
                        <div className="info-text mt-3">NO FILES</div>
                      )}
                      <div className="px-2">
                        <Form.Group controlId="nameSpacePre">
                          <Form.Check
                            type="checkbox"
                            label="Push From Destination SFDC"
                            name="fromDestinationSFDC"
                            // disabled={!sfdcComponentFilterObject.nameSpacePrefix || sfdcComponentFilterObject.nameSpacePrefix.length === 0}
                            checked={fromDestinationSFDC ? fromDestinationSFDC : false}
                            onChange={(e) => setFromDestinationSFDC(e.target.checked)}
                          />
                        </Form.Group>
                      </div>
                      {typeof destSfdcModified === "object" &&
                        destSfdcModified.map((item, idx) => (
                          <div key={idx} className="d-flex justify-content-center">
                            <div className="thick-list-item-container-green  w-100 force-text-wrap p-1">
                              {item.commitAction && item.commitAction === "active" ? (
                                <FontAwesomeIcon icon={faPlus} fixedWidth className="mr-1 green" />
                              ) : (
                                <FontAwesomeIcon icon={faCode} fixedWidth className="mr-1 dark-grey" />
                              )}
                              {item.componentType}: {item.committedFile}
                            </div>
                            <div className="p-1">
                              {fromDestinationSFDC && (
                                <Form.Check
                                  inline
                                  type={"checkbox"}
                                  name={item.committedFile}
                                  id={idx}
                                  checked={item.checked}
                                  onChange={handleDestSFDCComponentCheck}
                                />
                              )}
                            </div>
                          </div>
                        ))}
                    </>
                  ) : (
                    <>
                      <div className="h6 opsera-blue">Git Files</div>
                      {gitModified && gitModified.length === 0 && <div className="info-text mt-3">NO FILES</div>}
                      <div className="px-2">
                        <Form.Group controlId="nameSpacePrefix">
                          <Form.Check
                            type="checkbox"
                            label="Push From Git"
                            name="fromGit"
                            // disabled={!sfdcComponentFilterObject.nameSpacePrefix || sfdcComponentFilterObject.nameSpacePrefix.length === 0}
                            checked={fromGit ? fromGit : false}
                            onChange={(e) => setFromGit(e.target.checked)}
                          />
                        </Form.Group>
                      </div>
                      {typeof gitModified === "object" &&
                        gitModified.map((item, idx) => (
                          <div key={idx} className="d-flex justify-content-center">
                            <div className="thick-list-item-container-green  w-100 force-text-wrap p-1">
                              {item.commitAction && item.commitAction === "added" && (
                                <FontAwesomeIcon icon={faPlus} fixedWidth className="mr-1 green" />
                              )}
                              {item.commitAction && item.commitAction === "modified" && (
                                <FontAwesomeIcon icon={faPen} fixedWidth className="mr-1 yellow" />
                              )}
                              {item.commitAction && item.commitAction === "deleted" && (
                                <FontAwesomeIcon icon={faMinus} fixedWidth className="mr-1 dark-grey" />
                              )}
                              {item.componentType}: {item.committedFile}
                            </div>
                            <div className="p-1">
                              {fromGit && (
                                <Form.Check
                                  inline
                                  type={"checkbox"}
                                  name={item.committedFile}
                                  id={idx}
                                  checked={item.checked}
                                  onChange={handleGitComponentCheck}
                                />
                              )}
                            </div>
                          </div>
                        ))}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex-container-bottom pr-2 mt-3 mb-2 text-right">
          <Button
            variant="secondary"
            size="sm"
            className="mr-2"
            onClick={() => {
              setView(1);
            }}
          >
            <FontAwesomeIcon icon={faStepBackward} fixedWidth className="mr-1" />
            Back
          </Button>

          <Button
            variant="success"
            size="sm"
            onClick={() => {
              setSave(true);
              handleApproveChanges();
            }}
            disabled={checkDisabled()}
          >
            {save ? (
              <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth />
            ) : (
              <FontAwesomeIcon icon={faCheck} fixedWidth className="mr-1" />
            )}
            Next
          </Button>

          <Button
            variant="outline-secondary"
            size="sm"
            className="ml-2"
            onClick={() => {
              handleClose();
            }}
          >
            <FontAwesomeIcon icon={faTimes} fixedWidth className="mr-1" />
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

SfdcPipelineModifiedFiles.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  setView: PropTypes.func,
  isOrgToOrg: PropTypes.bool,
  stepToolConfig: PropTypes.object,
  modifiedFiles: PropTypes.object,
  setFromSFDC: PropTypes.func,
  fromSFDC: PropTypes.bool,
  selectedComponentTypes: PropTypes.array,
  setFromDestinationSFDC: PropTypes.func,
  fromDestinationSFDC: PropTypes.bool,
  setFromGit: PropTypes.func,
  setXML: PropTypes.func,
  fromGit: PropTypes.bool,
  handleClose: PropTypes.func,
  createJenkinsJob: PropTypes.func,
};

export default SfdcPipelineModifiedFiles;
