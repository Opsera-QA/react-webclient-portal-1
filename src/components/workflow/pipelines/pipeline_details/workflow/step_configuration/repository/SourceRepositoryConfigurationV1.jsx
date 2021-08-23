import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import DropdownList from "react-widgets/lib/DropdownList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faCopy,
  faSpinner,
  faExclamationCircle,
  faTimes,
  faCodeCommit,
} from "@fortawesome/pro-light-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
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
  branch: "",
  workspace: "",
  workspaceName: "",
  key: "",
  trigger_active: false,
};


function SourceRepositoryConfiguration({ data, parentCallback, handleCloseClick }) {
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
  const [isRegisteringHook, setIsRegisteringHook] = useState(false);

  useEffect(() => {
    if (data !== undefined) {
      let { workflow } = data;
      if (workflow.source !== undefined) {
        setFormData(workflow.source);
        setIsAccountSearching(false);
        setIsWorkspacesSearching(false);
        setIsRepoSearching(false);
        setIsBranchSearching(false);

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
    if (
      formData.service === "bitbucket" &&
      formData.accountId &&
      formData.accountId.length > 0 &&
      isRegisterAccount
    ) {
      // Fire off our API call
      fetchWorkspaces(formData.service, formData.accountId);
    }
  }, [formData.service, formData.accountId, isRegisterAccount]);

  // fetch repos
  useEffect(() => {
    if (
      formData.service &&
      formData.service.length > 0 &&
      formData.accountId &&
      formData.accountId.length > 0 &&
      isRegisterAccount
    ) {
      // Fire off our API call
      fetchRepos(formData.service, formData.accountId, formData.workspace);
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

  const fetchWorkspaces = async (service, accountId) => {
    setIsWorkspacesSearching(true);
    try {
      let results = await pipelineActions.searchWorkSpaces(service, accountId, getAccessToken);
      if (typeof (results) != "object") {
        setWorkspacesList([{ value: "", name: "Select One", isDisabled: "yes" }]);
        let errorMessage =
          "Workspace information is missing or unavailable!";
        toastContext.showErrorDialog(errorMessage);
        setIsWorkspacesSearching(false);
        return;
      }
      //console.log(results);
      setWorkspacesList(results);
    } catch (err) {
      console.log(err);
      setWorkspacesList([{ value: "", name: "Select One", isDisabled: "yes" }]);
      let errorMessage =
        "Workspace information is missing or unavailable!";
      toastContext.showErrorDialog(errorMessage);
    } finally {
      setIsWorkspacesSearching(false);
    }
  };

  const fetchRepos = async (service, accountId, workspaces) => {
    setIsRepoSearching(true);
    if(service === "bitbucket" && workspaces.length < 1 ) {
      setRepoList([]);
      return;
    }
    try {
      let results = await pipelineActions.searchRepositories(service, accountId, workspaces, getAccessToken);
      if (typeof (results) != "object") {
        setRepoList([{ value: "", name: "Select One", isDisabled: "yes" }]);
        let errorMessage =
          "Repository information is missing or unavailable!";
        toastContext.showErrorDialog(errorMessage);
        setIsRepoSearching(false);
        return;
      }
      //console.log(results);
      setRepoList(results);
    } catch (err) {
      console.log(err);
      setRepoList([{ value: "", name: "Select One", isDisabled: "yes" }]);
      let errorMessage =
        "Repository information is missing or unavailable!";
      toastContext.showErrorDialog(errorMessage);
    } finally {
      setIsRepoSearching(false);
    }
  };

  const fetchBranches = async (service, accountId, repoId, workspaces) => {
    setIsBranchSearching(true);
    try {
      let results = await pipelineActions.searchBranches(service, accountId, repoId, workspaces, getAccessToken);
      if (typeof (results) != "object") {
        setBranchList([{ value: "", name: "Select One", isDisabled: "yes" }]);
        let errorMessage =
          "Branch information is missing or unavailable!";
        toastContext.showErrorDialog(errorMessage);
        setIsBranchSearching(false);
        return;
      }
      //console.log(results);
      setBranchList(results);
    } catch (err) {
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

    console.log(selectedOption);

    setFormData({
      ...formData,
      accountId: selectedOption.id ? selectedOption.id : "",
      username: selectedOption.configuration ? selectedOption.configuration.accountUsername : "",
      password: selectedOption.configuration ? selectedOption.configuration.accountPassword : "",
      workspace: "",
      workspaceName: "",
      repository: "",
      branch: "",
    });
  };

  const handleWorkspacesChange = (selectedOption) => {
    setFormData({
      ...formData,
      workspace: selectedOption.key,
      workspaceName: selectedOption.name,
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
      gitUrl: selectedOption.httpUrl || "",
      sshUrl: selectedOption.sshUrl || "",
      branch: "",
    });
  };

  const handleBranchChange = (selectedOption) => {
    setFormData({
      ...formData,
      branch: selectedOption.value,
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
      workspaceName: "",
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
      let { name, service, accountId, username, password, repository, branch, key, trigger_active, repoId, sshUrl, gitUrl, workspace, workspaceName } = formData;
      const item = {
        name: name,
        service: service,
        accountId: accountId,
        username: username,
        password: password,
        workspace: workspace,
        workspaceName: workspaceName,
        repository: repository,
        repoId: repoId,
        gitUrl: gitUrl,
        sshUrl: sshUrl,
        branch: branch,
        key: key,
        trigger_active: trigger_active,
      };
      console.log(item);
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

    if (repository.length === 0 || branch.length === 0 || accountId.length === 0 || username.length === 0 ) {
      toastContext.showWarningDialog("WARNING! An incomplete configuration is being saved.  This step must be fully configured in order to use this feature.");
      return true;
    }

    if (repository.length === 0 || branch.length === 0 || accountId.length === 0 || username.length === 0 ) {
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
      workspace: "",
      workspaceName: "",
      repoId: "",
      gitUrl: "",
      sshUrl: "",
      branch: "",
    });
  };

  const searchAccounts = async (service) => {
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


  const registerHook = async (formData) => {
    setIsRegisteringHook(true);
    const accessToken = await getAccessToken();

    if (!formData.service || !formData.accountId || !formData.repository) {
      toastContext.showWarningDialog("WARNING: Data is missing from the repository account configuration.  Unable to register webhook.");
      return;
    }

    const nodeUrl = process.env.REACT_APP_OPSERA_API_SERVER_URL;
    const hookUrl = encodeURIComponent(`${nodeUrl}/hooks/${data.owner}/${data._id}/source`);

    const queryParams = {
      params: {
        repo: formData.repoId,
        hook: hookUrl,
        branch: formData.branch,
        workspace: formData.workspace,
        repository: formData.repository
      },
    };
    const apiUrl = `/connectors/${formData.service}/${formData.accountId}/hook/create`;

    try {
      await callbackFunction(); //first save the settings, then trigger registration
      await axiosApiService(accessToken).get(apiUrl, queryParams);
    } catch (error) {
      console.error(error);
      toastContext.showErrorDialog("Error:An error has occurred registering the webhook.  Please ensure your registry account information is current or report this issue.");
    } finally {
      setIsRegisteringHook(false);
    }
  };

  return (
    <>
      <Form>
        <div className="text-muted h6 mb-3">Configure Source Repository settings for this pipeline.</div>

        <Form.Group controlId="formBasicEmail">
          <h6>Platform*</h6>
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
                        disabled={!formData.service || data.workflow.source.accountId || formData.accountId}
                        checked={isRegisterAccount ? true : false}
                        onChange={() => setIsRegisterAccount(isRegisterAccount => !isRegisterAccount)}/>
          </div>
          {isRegisterAccount && formData.accountId &&
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
            <Form.Label>Select Account (from Registry)*</Form.Label>
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
                      <Link to="/inventory/tools"> Tool Registry</Link> and add an entry for this repository.
                    </div>
                  </>}

                {formData.accountId &&
                <div className="text-muted pl-2 mb-3 mt-1">
                  <b>User:</b> {formData.username}
                </div>
                }
              </>
            )}
          </Form.Group>}



          {formData.service && formData.service === "bitbucket" && formData.accountId && (
            <Form.Group controlId="account" className="mt-2">
              <Form.Label>Workspace/Project*</Form.Label>
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
                            (x) => x.key === formData.workspace,
                          )
                          ]
                      }
                      valueField="key"
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
            </Form.Group>
          )}

          {formData.service && formData.accountId && (formData.service === "bitbucket" ?
            formData.workspace
            && formData.workspace.length > 0 : true) &&
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
        <Form.Group controlId="formBasicCheckbox" className="mt-5 ml-1">
          <Form.Check type="checkbox" label="Enable Event Based Trigger"
                      checked={formData.trigger_active ? true : false}
                      onChange={() => setFormData({ ...formData, trigger_active: !formData.trigger_active })}/>
          <Form.Text className="text-muted">To enable webhook event based pipeline runs from your repository, either configure
            the account above to register it automatically or use the URL below (and optional security key) to configure
            your repository manually.  If a specific repository and branch are selected above through account registration,
            then ONLY events from that branch can trigger this pipeline, if no repository and branch are specified then
            any commit events will trigger the pipeline.</Form.Text>
        </Form.Group>}

        {formData.trigger_active === true &&
        <>

          {formData.branch &&
          <div className="w-100 text-right">
            <Button variant="outline-success" type="button" className="mt-2 ml-2" disabled={isSaving} size={"sm"}
                    onClick={() => {
                      registerHook(formData);
                    }}>
              {isRegisteringHook ?
                <><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Working</> :
                <><FontAwesomeIcon icon={faCodeCommit} className="mr-1" fixedWidth /> Register Webhook</>
              }

            </Button>
          </div>}

          <EventBasedTriggerDetails pipelineId={data._id} userId={data.owner}/>

          {(formData.service === "github" || formData.service === "gitlab") && <>
            <h6>Settings:</h6>
            <div className="text-muted pl-1 mb-3">
              <b>Content Type:</b> application/json<br/>
              <b>SSL verification:</b> enabled<br/>
              <b>Selected events:</b> <i>just the push event</i><br/>
            </div>

            <Form.Group controlId="securityKeyField">
              <h6>Secret:</h6>
              <Form.Control maxLength="75" type="password"
                            placeholder="Optional security key/token from service"
                            value={formData.key || ""}
                            onChange={e => setFormData({ ...formData, key: e.target.value })}/>
              <Form.Text className="text-muted">(Optional secret for manual registration in Git Repository if supported)</Form.Text>
            </Form.Group>
          </>}
        </>}

        <Button variant="primary" type="button" className="mt-2"
                disabled={isSaving}
                onClick={() => {
                  callbackFunction();
                }}>
          {isSaving
            ? <><FontAwesomeIcon icon={faSpinner} spin className="mr-2" fixedWidth/>Saving</>
            : <><FontAwesomeIcon icon={faSave} fixedWidth className="mr-2"/>Save</>
          }
        </Button>

        <Button variant="secondary" type="button" className="mt-2 ml-2"
                disabled={isSaving}
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

        {/*<Form.Text className="text-muted">
          Use the URL above to manually configure your Webhook in a source repository. If a Secret Key/Token is required,
          ensure the settings above match your hook configuration. Ensure the settings noted are configured properly.
        </Form.Text>*/}
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