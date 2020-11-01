import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import DropdownList from "react-widgets/lib/DropdownList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faCopy, faSpinner, faExclamationCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../../../api/apiService";
import { DialogToastContext } from "contexts/DialogToastContext";
import pipelineActions from "components/workflow/pipeline-actions";

//value maps to the tool_identifer string used for each tool
const SERVICE_OPTIONS = [
  { value: "", label: "Select One", isDisabled: "yes" },
  { value: "gitlab", label: "GitLab" },
  { value: "github", label: "GitHub" },
  { value: "bitbucket", label: "Bitbucket" },
];

const INITIAL_DATA = {
  name: "",
  service: "",
  accountId: "",
  username: "",
  password: "",
  repoId: "",
  gitUrl: "",
  sshUrl: "",
  repository: "",
  projectId: "",
  branch: "",
  workspace: "",
  key: "",
  trigger_active: false,
};


function SourceRepositoryConfiguration({ data, parentCallback, handleCloseClick }) {
  const contextType = useContext(AuthContext);
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [accountList, setAccountList] = useState([]);
  const [isAccountSearching, setIsAccountSearching] = useState(false);
  const [repoList, setRepoList] = useState([]);
  const [isRepoSearching, setIsRepoSearching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isRegisterAccount, setIsRegisterAccount] = useState(false);
  const [branchList, setBranchList] = useState([]);
  const [isBranchSearching, setIsBranchSearching] = useState(false);
  const [workspacesList, setWorkspacesList] = useState([]);
  const [isWorkspacesSearching, setIsWorkspacesSearching] = useState(false);

  useEffect(() => {
    if (data !== undefined) {
      let { workflow } = data;
      if (workflow.source !== undefined) {
        setFormData(workflow.source);
        setIsRepoSearching(false);
        setIsAccountSearching(false);

        if (workflow.source.accountId) {
          setIsRegisterAccount(true);
        }

      }
    } else {
      setFormData(INITIAL_DATA);
    }
  }, [data]);


  useEffect(
    () => {

      if (formData.service && formData.service.length > 0 && isRegisterAccount) {
        // Fire off our API call
        fetchApps(formData.service).catch((err) => {
          console.error(err);
        });
      }
      /*} else {
        setIsAccountSearching(true);
        setAccountList([{ value: "", name: "Select One", isDisabled: "yes" }]);
      }*/
    },
    [formData.service, isRegisterAccount],
  );

  // fetch workspaces
  useEffect(() => {
    async function fetchWorkspaces(service, accountId) {
      setIsWorkspacesSearching(true);
      // Set results state
      let results = await pipelineActions.searchWorkSpaces(service, accountId, getAccessToken);
      if (typeof(results) != "object") {
        setWorkspacesList([{ value: "", name: "Select One", isDisabled: "yes" }]);
        let errorMessage =
          "Workspace information is missing or unavailable!";
        toastContext.showErrorDialog(errorMessage);
        setIsWorkspacesSearching(false);
        return;
      }
        //console.log(results);
        setWorkspacesList(results);
        setIsWorkspacesSearching(false);
      }

    if (
      formData.service === "bitbucket" &&
      formData.accountId &&
      formData.accountId.length > 0 &&
      isRegisterAccount
    ) {
      // Fire off our API call
      fetchWorkspaces(formData.service, formData.accountId);
    } else {
      setIsWorkspacesSearching(true);
      setWorkspacesList([{ value: "", name: "Select One", isDisabled: "yes" }]);
    }
  }, [formData.service, formData.accountId, isRegisterAccount]);

  // fetch repos
  useEffect(() => {
    async function fetchRepos(service, accountId, workspaces) {
      setIsRepoSearching(true);
      // Set results state
      let results = await pipelineActions.searchRepositories(service, accountId, workspaces, getAccessToken);
      if (typeof(results) != "object") {
        setRepoList([{ value: "", name: "Select One", isDisabled: "yes" }]);
        let errorMessage =
          "Repository information is missing or unavailable!";
        toastContext.showErrorDialog(errorMessage);
        setIsRepoSearching(false);
        return;
      }
        //console.log(results);
        setRepoList(results);
        setIsRepoSearching(false);
    }

    if (
      formData.service &&
      formData.service.length > 0 &&
      formData.accountId &&
      formData.accountId.length > 0 &&
      isRegisterAccount
    ) {
      // Fire off our API call
      fetchRepos(formData.service, formData.accountId, formData.workspace);
    } else {
      setIsRepoSearching(true);
      setRepoList([{ value: "", name: "Select One", isDisabled: "yes" }]);
    }
  }, [formData.service, formData.accountId, formData.gitCredential, formData.workspace, isRegisterAccount]);


  useEffect(
    () => {
      if (
        formData.service &&
        formData.service.length > 0 && 
        formData.accountId && 
        formData.accountId.length > 0 &&
        formData.repoId &&
        formData.repoId.length > 0 &&
        isRegisterAccount
        ) {
        // Fire off our API call
        fetchBranches(formData.service, formData.accountId, formData.repoId, formData.workspace).catch((err) => {
          console.error(err);
        });
      }
    },
    [formData.service, formData.accountId, formData.repoId, formData.workspace],
  );

  const fetchApps = async (service) => {
    setIsAccountSearching(true);
    // Set results state
    let results = await searchAccounts(service);
    if (results) {
      setAccountList(formatOptions(results));
      setIsAccountSearching(false);
    }
  };

  const fetchBranches = async (service, accountId, repoId, workspaces) => {
    setIsBranchSearching(true);
    try{
      let results = await pipelineActions.searchBranches(service, accountId, repoId, workspaces, getAccessToken);
      if (typeof(results) != "object") {
        setBranchList([{ value: "", name: "Select One", isDisabled: "yes" }]);
        let errorMessage =
          "Branch information is missing or unavailable!";
        toastContext.showErrorDialog(errorMessage);
        setIsBranchSearching(false);
        return;
      }
      //console.log(results);
      setBranchList(results);
    } catch (err){
      console.log(err);
      setBranchList([{ value: "", name: "Select One", isDisabled: "yes" }]);
      let errorMessage =
      "Branch information is missing or unavailable!";
      toastContext.showErrorDialog(errorMessage);
    } finally {
      setIsBranchSearching(false);
    }
  };

  const formatOptions = (options) => {
    options.unshift({ value: "", name: "Select One", isDisabled: "yes" });
    return options;
  };

  const handleAccountChange = (selectedOption) => {
    //on change, always clear error state
    setFormData({
      ...formData,
      accountId: selectedOption.id ? selectedOption.id : "",
      username: selectedOption.configuration ? selectedOption.configuration.accountUsername : "",
      password: selectedOption.configuration ? selectedOption.configuration.accountPassword : "",
      repository: "",
    });
  };

  const handleWorkspacesChange = (selectedOption) => {
    setFormData({
      ...formData,
      workspace: selectedOption,
      repository: "",
      gitUrl: "",
      sshUrl: "",
      branch: "",
    });
  };

  const handleRepoChange = (selectedOption) => {
    setFormData({ 
      ...formData, 
      repository: selectedOption.name,
      repoId: selectedOption.id,
      projectId: selectedOption.id,
      gitUrl: selectedOption.httpUrl,
      sshUrl: selectedOption.sshUrl,
      branch: ""
    });
  };

  const handleBranchChange = (selectedOption) => {
    setFormData({
      ...formData,
      branch: selectedOption.value
    });
  };

  const handleRemoveAccount = async () => {
    setIsSaving(true);
    let { name, service, trigger_active } = formData;
    const item = {
      name: name,
      service: service,
      accountId: "",
      username: "",
      password: {},
      repository: "",
      branch: "",
      key: "",
      workspace: "",
      repoId: "",
      gitUrl: "",
      sshUrl: "",
      trigger_active: trigger_active,
    };

    await parentCallback(item);
    setIsSaving(false);
    setIsRegisterAccount(false);
    toastContext.showWarningDialog("WARNING! Your account information has been removed from this pipeline's settings.");

  };

  const callbackFunction = async () => {
    if (validateRequiredFields()) {
      setIsSaving(true);
      let { name, service, accountId, username, password, repository, branch, key, trigger_active, repoId, sshUrl, gitUrl, workspace } = formData;
      const item = {
        name: name,
        service: service,
        accountId: accountId,
        username: username,
        password: password,
        workspace: workspace,
        repository: repository,
        repoId: repoId,
        gitUrl: gitUrl,
        sshUrl: sshUrl,
        branch: branch,
        key: key,
        trigger_active: trigger_active,
      };
      console.log(item)
      await parentCallback(item);
      setIsSaving(false);
    }
  };


  //TODO: we will allow impartial settings to be saved, BUT we want to show a warning to users.
  const validateRequiredFields = () => {
    let { service, accountId, username, password, repository, branch, trigger_active } = formData;

    if (service.length === 0) {
      return false; //only truely required field
    }

    if (accountId.length === 0 && trigger_active) { //allows user to save just the webhook without a warning
      return true;
    }

    if (data.workflow.source.trigger_active && !trigger_active) { //allows user to disable trigger
      toastContext.showWarningDialog("WARNING! You are disabling the event triggering for this pipeline.  This pipeline will no longer start on Git Webhook Events.");
      return true;
    }

    if (repository.length === 0 || branch.length === 0 || accountId.length === 0 || username.length === 0 || password.length === 0) {
      toastContext.showWarningDialog("WARNING! An incomplete configuration is being saved.  This step must be fully configured in order to use this feature.");
      return true;
    }

    if (repository.length === 0 || branch.length === 0 || accountId.length === 0 || username.length === 0 || password.length === 0) {
      toastContext.showWarningDialog("WARNING! An incomplete configuration is being saved.  This step must be fully configured in order to use this feature.");
      return true;
    }

    return true; //all requests are allowed to save at this time.

  };

  const handleServiceChange = (selectedOption) => {
    setFormData({
      ...formData,
      service: selectedOption.value,
      accountId: "",
      username: "",
      password: "",
      repository: "",
    });
  };

  const searchAccounts = async (service) => {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/registry/properties/" + service;   // this is to get all the service accounts from tool registry
    try {
      const res = await axiosApiService(accessToken).get(apiUrl);
      if (res.data) {
        let respObj = [];
        let arrOfObj = res.data;
        arrOfObj.map((item) => {
          respObj.push({ "name": item.name, "id": item._id, "configuration": item.configuration });
        });
        return respObj;
      } else {
        toastContext.showErrorDialog("WARNING: No accounts were found in the Registry.  Please ensure accounts are registered or report this issue.");
      }
    } catch (error) {
      toastContext.showErrorDialog("Error:An error has occurred looking up accounts in the Registry.  Please ensure accounts are registered or report this issue.");
    }
  };

  return (
    <>
      <Form>
        <div className="text-muted h6 mb-3">Configure Source Repository settings for this pipeline.</div>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Platform*</Form.Label>
          {data.workflow.source !== undefined ?
            <DropdownList
              data={SERVICE_OPTIONS}
              valueField='id'
              textField='label'
              defaultValue={data.workflow.source.service ? SERVICE_OPTIONS[SERVICE_OPTIONS.findIndex(x => x.value === data.workflow.source.service)] : SERVICE_OPTIONS[0]}
              onChange={handleServiceChange}
            /> : null}
        </Form.Group>


        <div className="d-flex w-100">
          <div className="w-50 pt-2 pl-1">
            <Form.Check type="checkbox" label="Register Git Account"
                        disabled={!formData.service || isRegisterAccount}
                        checked={isRegisterAccount ? true : false}
                        onChange={() => setIsRegisterAccount(isRegisterAccount => !isRegisterAccount)}/>
          </div>
          {isRegisterAccount &&
          <div className="w-50 text-right">
            <Button variant="outline-danger" type="button" className="mt-2 ml-2" disabled={isSaving} size={"sm"}
                    onClick={() => {
                      handleRemoveAccount();
                    }}>
              <FontAwesomeIcon icon={faTimes} className="mr-1"/> Remove Account
            </Button></div>}
        </div>


        {isRegisterAccount && <>

          {formData.service &&
          <Form.Group controlId="account" className="mt-2">
            <Form.Label>Select Account*</Form.Label>
            {(isAccountSearching) ? (
              <div className="form-text text-muted mt-2 p-2">
                <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth/>
                Loading accounts from registry</div>
            ) : (
              <>
                {accountList && accountList.length > 1 ?
                  <DropdownList
                    data={accountList}
                    value={formData.accountId ? accountList[accountList.findIndex(x => x.id === formData.accountId)] : accountList[0]}
                    valueField='id'
                    textField='name'
                    defaultValue={formData.accountId ? accountList[accountList.findIndex(x => x.id === formData.accountId)] : accountList[0]}
                    onChange={handleAccountChange}
                  /> :
                  <>
                    <div className="form-text text-muted p-2">
                      <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth/>
                      No accounts have been registered for <span className="upper-case-first">{formData.service}</span>.
                      Please go to
                      <Link to="/inventory/tools"> Tool Registry</Link> and add an entry for this repository in order to
                      proceed.
                    </div>
                  </>}
              </>
            )}
            {/* <Form.Text className="text-muted">Tool cannot be changed after being set.  The step would need to be deleted and recreated to change the tool.</Form.Text> */}
          </Form.Group>}

          {formData.accountId &&
          <>
            <Form.Group controlId="userName">
              <Form.Label>Account</Form.Label>
              <Form.Control maxLength="75" type="text" disabled placeholder="Username" value={formData.username || ""}
                            onChange={e => setFormData({ ...formData, username: e.target.value })}/>
            </Form.Group>
          </>
          }
        
        {formData.service && formData.service === "bitbucket" && formData.accountId && (
          <Form.Group controlId="account" className="mt-2">
            <Form.Label>Workspace*</Form.Label>
            {isWorkspacesSearching ? (
              <div className="form-text text-muted mt-2 p-2">
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  className="text-muted mr-1"
                  fixedWidth
                />
                Loading workspaces from registry
              </div>
            ) : (
              <>
                {workspacesList ? (
                  <DropdownList
                    data={workspacesList}
                    value={
                      workspacesList[
                        workspacesList.findIndex(
                          (x) => x === formData.workspace,
                        )
                        ]
                    }
                    valueField="value"
                    textField="name"
                    filter="contains"
                    onChange={handleWorkspacesChange}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    className="text-muted mr-1"
                    fixedWidth
                  />
                )}
              </>
            )}
            {/* <Form.Text className="text-muted">Tool cannot be changed after being set.  The step would need to be deleted and recreated to change the tool.</Form.Text> */}
          </Form.Group>
        )}

          {formData.service && formData.accountId && (formData.service === "bitbucket"? 
          formData.workspace 
          && formData.workspace.length > 0 : true ) &&
          <Form.Group controlId="repo" className="mt-2">
            <Form.Label>Select Repository*</Form.Label>
            {(isRepoSearching) ? (
              <div className="form-text text-muted mt-2 p-2">
                <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth/>
                Loading repositories from registry</div>
            ) : (
              <>
                {repoList ?
                  <DropdownList
                  data={repoList}
                  value={
                    repoList[
                      repoList.findIndex(
                        (x) => x.name.toLowerCase() === formData.repository.toLowerCase(),
                      )
                      ]
                  }
                  valueField="value"
                  textField="name"
                  filter="contains"
                    onChange={handleRepoChange}
                  /> : <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth/>}
              </>
            )}
            {/* <Form.Text className="text-muted">Tool cannot be changed after being set.  The step would need to be deleted and recreated to change the tool.</Form.Text> */}
          </Form.Group>}

          {formData.service && formData.repository &&
          <Form.Group controlId="branch" className="mt-2">
          <Form.Label>Select Branch*</Form.Label>
          {(isBranchSearching) ? (
            <div className="form-text text-muted mt-2 p-2">
              <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth/>
              Loading branches from repository</div>
          ) : (
            <>
              {branchList ?
                <DropdownList
                data={branchList}
                value={
                  branchList[
                    branchList.findIndex((x) => x.value === formData.branch)
                    ]
                }
                valueField="value"
                textField="name"
                filter="contains"
                onChange={handleBranchChange}
                /> : <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth/>}
            </>
          )} 
          <small className="form-text text-muted mt-2 text-center">Branch within repository to
          watch: &quot;master&quot; or
          &quot;feature X&quot;</small>
        </Form.Group>}
        </>}

        {formData.service &&
        <Form.Group controlId="formBasicCheckbox" className="mt-4 ml-1">
          <Form.Check type="checkbox" label="Enable Event Based Trigger"
                      checked={formData.trigger_active ? true : false}
                      onChange={() => setFormData({ ...formData, trigger_active: !formData.trigger_active })}/>
          <Form.Text className="text-muted">To use a webhook based event hook trigger with your source repository, the
            hook URL below (and optional security key) must be setup in your source repository.</Form.Text>
        </Form.Group>}

        {formData.trigger_active === true &&
        <>
          <EventBasedTriggerDetails pipelineId={data._id} userId={data.owner}/>

          {(formData.service === "github" || formData.service === "gitlab") && <>
            <h6>Settings:</h6>
            <div className="text-muted pl-1 mb-3">

              <b>Content Type:</b> application/json<br/>
              <b>SSL verification:</b> enabled<br/>
              <b>Selected events:</b> <i>just the push event</i><br/>
            </div>

            <Form.Group controlId="securityKeyField">
              <h6>Webhook Secret: (optional)</h6>
              <Form.Control maxLength="75" type="password"
                            placeholder="Optional security key/token from service"
                            value={formData.key || ""}
                            onChange={e => setFormData({ ...formData, key: e.target.value })}/>
            </Form.Group>
          </>}
        </>}

        <Button variant="primary" type="button" className="mt-2"
                disabled={isSaving || isAccountSearching || isRepoSearching}
                onClick={() => {
                  callbackFunction();
                }}>
          {isSaving
            ? <><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Saving</>
            : <><FontAwesomeIcon icon={faSave} fixedWidth className="mr-2"/>Save</>
          }
        </Button>

        <Button variant="secondary" type="button" className="mt-2 ml-2"
                disabled={isSaving || isAccountSearching || isRepoSearching}
                onClick={() => {
                  handleCloseClick();
                }}>
          <FontAwesomeIcon icon={faTimes} className="mr-1"/> Close
        </Button>

        <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
      </Form>
    </>
  );
}


function EventBasedTriggerDetails({ pipelineId, userId }) {
  const apiUrl = process.env.REACT_APP_OPSERA_API_SERVER_URL;
  const [triggerUrl, setTriggerUrl] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    setTriggerUrl(`${apiUrl}/hooks/${userId}/${pipelineId}/source`);
    setCopySuccess(false);
  }, [pipelineId]);

  const copyToClipboard = (val) => {
    navigator.clipboard.writeText(val);
    setCopySuccess(true);
  };

  return (
    <div className="mt-1">
      <Form.Group controlId="branchField">
        {copySuccess && <div className="info-text float-right small">Copied to Clipboard!</div>}
        <h6>Webhook URL:</h6>

        <InputGroup className="mb-1">
          <Form.Control maxLength="75" type="text" value={triggerUrl || ""} disabled={true}/>
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={() => {
              copyToClipboard(triggerUrl);
            }}><FontAwesomeIcon icon={faCopy}/></Button>
          </InputGroup.Append>
        </InputGroup>

        <Form.Text className="text-muted">
          Use the URL above to configure your Webhook in the source repository. If a Secret Key/Token is required,
          ensure the settings above match your hook configuration. Ensure
          Enable SSL is selected in your repo, only PUSH events are configured and for GitHub, make sure the Content
          Type is: application/json.
        </Form.Text>
      </Form.Group>
    </div>
  );
}


SourceRepositoryConfiguration.propTypes = {
  data: PropTypes.object,
  parentCallback: PropTypes.func,
  handleCloseClick: PropTypes.func,
};

EventBasedTriggerDetails.propTypes = {
  pipelineId: PropTypes.string,
  userId: PropTypes.string,
};

export default SourceRepositoryConfiguration;