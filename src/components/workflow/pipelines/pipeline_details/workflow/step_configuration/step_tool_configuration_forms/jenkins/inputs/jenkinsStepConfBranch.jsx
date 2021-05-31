import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import DetailPanelLoadingDialog from "components/common/loading/DetailPanelLoadingDialog";
import pipelineActions from "components/workflow/pipeline-actions";
import { DialogToastContext } from "../../../../../../../../../contexts/DialogToastContext";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import TextInputBase from "components/common/inputs/text/TextInputBase";


// TODO : Use GitBranchInput for all git based repo selections with set clear functions.

function JenkinsStepConfBranch({ fieldName, dataObject, setDataObject, disabled, jenkinsList }) {

  const [isBranchSearching, setIsBranchSearching] = useState(false);
  const [branchList, setBranchList] = useState([]);
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const service = dataObject.getData('service');
  const gitToolId = dataObject.getData('gitToolId');
  const repoId = dataObject.getData('repoId');
  const jobType = dataObject.getData('jobType');
  const excludeArrs = ["SFDC VALIDATE PACKAGE XML", "SFDC UNIT TESTING", "SFDC DEPLOY", "SFDC BACK UP", "SFDC PUSH ARTIFACTS"];
  const isOrgToOrg = dataObject.getData('isOrgToOrg');
  const jenkinsUrl = dataObject.getData('jenkinsUrl');
  const workspace = dataObject.getData('workspace');
  const workspaceDeleteFlag = dataObject.getData('workspaceDeleteFlag');

  const renderTooltip = (message, props) => (
    <Tooltip id="button-tooltip" style={{ "zIndex": 1500 }} {...props}>
      {message.length > 0 ? message : "No message found."}
    </Tooltip>
  );

  useEffect(() => {
    //setShowToast(false);

    async function fetchBranches(service, gitToolId, repoId, workspaces) {
      setIsBranchSearching(true);
      // Set results state
      let results = await pipelineActions.searchBranches(service, gitToolId, repoId, workspaces, getAccessToken);
      if (typeof (results) != "object") {
        setBranchList([{ value: "", name: "Select One", isDisabled: "yes" }]);
        let errorMessage = "Branch information is missing or unavailable!";
        toastContext.showErrorDialog(errorMessage);
        setIsBranchSearching(false);
        return;
      }
      setBranchList(results);
      setIsBranchSearching(false);
    }

    if (service && service.length > 0 && gitToolId && gitToolId.length > 0 && repoId && repoId.length > 0) {
      // Fire off our API call
      fetchBranches(service, gitToolId, repoId, workspace);
    } else {
      // setIsRepoSearching(true);
      setIsBranchSearching(true);
      setBranchList([{ value: "", name: "Select One", isDisabled: "yes" }]);
    }
  }, [repoId]);


  const handleDTOChange = (fieldName, selectedOption) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("branch", selectedOption.value);
    newDataObject.setData("defaultBranch", selectedOption.value);
    newDataObject.setData("gitBranch", selectedOption.value);
    setDataObject({ ...newDataObject });
  };

  const handleWorkspaceDeleteFlagChange = (value) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("workspaceDeleteFlag", value);
    setDataObject({ ...newDataObject });
  };
  const handleManualRollbackChange = (value) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData('isManualRollBackBranch', value);
    setDataObject({ ...newDataObject });
  };
  const handleCreateNewBranchFlag = (e) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("isNewBranch", e.target.checked);
    setDataObject({ ...newDataObject });
  };
  const handleHasUpstreamBranch = (value) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("hasUpstreamBranch", value);
    setDataObject({ ...newDataObject });
  };
  const handleUpstreamBranchChange = (selectedData) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("upstreamBranch", selectedData.value);
    setDataObject({ ...newDataObject });
  };


  const loader = () => {
    if (isBranchSearching) {
      return <DetailPanelLoadingDialog type="branches from selected repository" />;
    }
    return null;
  };
  const loadBranchSelect = () => {
    if (branchList && branchList.length > 0) {
      return (
        <>
          <SelectInputBase
            fieldName={fieldName}
            dataObject={dataObject}
            setDataFunction={handleDTOChange}
            setDataObject={setDataObject}
            placeholderText={"Select"}
            selectOptions={branchList}
            valueField="value"
            textField="name"
            disabled={disabled}
          />
          {loadWorkspaceDeleteFlag()}
        </>);
    }
    return <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />;
  };
  const loadWorkspaceDeleteFlag = () => {
    return (
      <Form.Group controlId="workspaceDeleteFlag">
        <Form.Check inline
          type="checkbox"
          label={"Delete workspace before building"}
          id={`workspaceDeleteFlag`}
          checked={workspaceDeleteFlag}
          onChange={(e) => handleWorkspaceDeleteFlagChange(e.target.checked)}
        />
        <Form.Text className="text-muted">Deletes the Jenkins workspace before building.</Form.Text>
      </Form.Group>
    );
  };
  const renderRollbackBranch = () => {
    if (dataObject.data.isManualRollBackBranch) {
      //Rollback Branch Name
      return (<TextInputBase disabled={false} fieldName={'rollbackBranchName'} dataObject={dataObject} setDataObject={setDataObject} />);
    }
  };
  const loadIsManualRollBackBranch = () => {
    if (jobType === "SFDC BACK UP") {
      return (
        <>
          <OverlayTrigger
            placement="left"
            overlay={renderTooltip("Check this option if back up should be pushed to a branch name of your choice.")}
          >
            <Form.Group controlId="formBasicCheckboxIsManualRollBackBranch" className="mt-4 ml-1">
              <Form.Check
                type="checkbox"
                label="Configure Branch Name"
                checked={dataObject.data.isManualRollBackBranch ? dataObject.data.isManualRollBackBranch : false}
                onChange={(e) => handleManualRollbackChange(e.target.checked)}
              />
            </Form.Group>
          </OverlayTrigger>
          {renderRollbackBranch()}
        </>
      );
    }
  };
  const renderUpstreamBranch = () => {
    if (dataObject.data.hasUpstreamBranch) {
      if (isBranchSearching) {
        return (<><Form.Label>Branch Name*</Form.Label>
          <div className="form-text text-muted mt-2 p-2">
            <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
          Loading branches from selected repository
          </div></>
        );
      } else if (branchList && branchList.length > 0) {
        return (
          <SelectInputBase
            fieldName={'upstreamBranch'}
            dataObject={dataObject}
            setDataFunction={handleUpstreamBranchChange}
            setDataObject={setDataObject}
            placeholderText={"Select"}
            selectOptions={branchList}
            valueField="value"
            textField="name"
            disabled={disabled}
          />
        );
      } else {
        return (<FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />);

      }
    }
  };

  const renderBranch = () => {
    if (isBranchSearching) {

      return (<>
        <Form.Label>Branch*</Form.Label>
        <div className="form-text text-muted mt-2 p-2">
          <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
                        Loading branches from selected repository
                      </div>
      </>);
    } else if (branchList && branchList.length > 0) {
      return (
        <SelectInputBase
          fieldName={'branch'}
          dataObject={dataObject}
          setDataFunction={handleDTOChange}
          setDataObject={setDataObject}
          placeholderText={"Select"}
          selectOptions={branchList}
          valueField="value"
          textField="name"
          disabled={disabled}
        />
      );
    } else {
      return (<FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />);
    }
  };


  const renderNewBranchInput = () => {
    if (dataObject.data.isNewBranch) {
      return (<>
        <TextInputBase disabled={false} fieldName={'gitBranch'} dataObject={dataObject} setDataObject={setDataObject} />
        <Form.Group controlId="isNewBranch">
          <Form.Check inline
            type="checkbox"
            label={"Use an upstream branch?"}
            id={`hasUpstreamBranch`}
            checked={dataObject.data.hasUpstreamBranch}
            onChange={(e) => handleHasUpstreamBranch(e.target.checked)}
          />
          <Form.Text className="text-muted">Configure an upstream/source branch. The Files will be overwritten when pushing the artifacts.
          If no upstream branch is configured, then the new Artifact branch is created as an Orphan branch, having only the artifact files and no commit history.
          </Form.Text>
        </Form.Group>
        {renderUpstreamBranch()}
      </>);
    } else {
      return renderBranch();
    }
  };

  const loadIsNewBranch = () => {
    if (dataObject.data.jobType === 'SFDC PUSH ARTIFACTS') {
      return (
        <>
          <Form.Group controlId="isNewBranch">
            <Form.Check inline
              type="checkbox"
              label={"Create a new backup branch?"}
              id={`newBranch`}
              checked={dataObject.data.isNewBranch}
              onChange={handleCreateNewBranchFlag}
            />
            <Form.Text className="text-muted">Creates a new branch and push the artifacts.</Form.Text>
          </Form.Group>
          {renderNewBranchInput()}
        </>
      );
    }
  };

  if (jenkinsUrl && jenkinsList.length > 0 && jobType && jobType.length > 0) {
    if (service && gitToolId && repoId && !excludeArrs.includes(jobType) && !isOrgToOrg) {
      return (
        <>
          {loader()}
          {loadBranchSelect()}
          {loadIsManualRollBackBranch()}
          {loadIsNewBranch()}
        </>
      );
    }
  }
  return null;
}

JenkinsStepConfBranch.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  jenkinsList: PropTypes.any,
};

JenkinsStepConfBranch.defaultProps = {
  fieldName: "branch",
};

export default JenkinsStepConfBranch;
