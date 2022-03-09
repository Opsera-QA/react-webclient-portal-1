//PP-97 Deploy Step form for AWS Elastic Beanstalk
//https://opsera.atlassian.net/wiki/spaces/OPSERA/pages/283935120/Code-Deployer

import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import {
  faSave,
  faSpinner,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../../../../../api/apiService";
import { Link } from "react-router-dom";
import {getErrorDialog, getMissingRequiredFieldsErrorDialog} from "../../../../../../../common/toasts/toasts";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import LoadingIcon from "components/common/icons/LoadingIcon";
import IconBase from "components/common/icons/IconBase";


const INITIAL_DATA = {
  // accessKey: "", 
  // secretKey: "",
  sshKey: {}, //file stream to value
  userName: "",
  serverIp: "",
  serverPath: "",
  commands: "",
  sshAction: "SSH Execution", // default it's ssh execution not empty anymore 
  // jenkins details if SSHaction is upload
  toolConfigId: "",
  jenkinsUrl: "",
  jenkinsPort: "",
  jUserId: "",
  jAuthToken: "",
  jobName: ""
};

const INITIAL_SSH_KEYFILE = {
  fileName: "",
  vaultKey: "" //pipelineId-stepId-sshKey
};

// TODO: This needs a heavy refactor
function SshUploadDeployStepConfiguration({ data, pipelineId, stepId, parentCallback, callbackSaveToVault, setToast, setShowToast }) {

  const contextType = useContext(AuthContext);

  const [formData, setFormData] = useState(INITIAL_DATA);
  const [sshFileMessage, setSshFileMessage] = useState("");
  const [sshKeyFile, setSshKeyFile] = useState(INITIAL_SSH_KEYFILE);
  const [loading, setLoading] = useState(false);

  const [jenkinsList, setjenkinsList] = useState([]);
  const [isJenkinsSearching, setisJenkinsSearching] = useState(false);

  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await loadFormData(data);                
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled via controller.abort");
          return;
        }        
      }
    };
    runEffect();
    return () => {     
      controller.abort();      
    };
  }, [data]);

  useEffect(() => {
    setShowToast(false);
    async function fetchJenkinsDetails(service) {
      setisJenkinsSearching(true);
      // Set results state
      let results = await searchToolList(service);
      if (results) {
        console.log(results);
        setjenkinsList(formatOptions(results));
        setisJenkinsSearching(false);
      }
    }
    // Fire off our API call
    fetchJenkinsDetails("jenkins");
  }, []);

  
  const searchToolList = async (service) => {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/registry/properties/" + service; // this is to get all the service accounts from tool registry
    try {
      const res = await axiosApiService(accessToken).get(apiUrl);
      console.log(res);
      if (res.data) {
        let respObj = [];
        let arrOfObj = res.data;
        arrOfObj.map((item) => {
          respObj.push({
            name: item.name,
            id: item._id,
            configuration: item.configuration,
          });
        });
        console.log(respObj);
        return respObj;
      } else {
        let errorMessage = "information is missing or unavailable!  Please ensure the required creds are registered and up to date in Tool Registry.";
        let toast = getErrorDialog(errorMessage, setShowToast, "detailPanelTop");
        setToast(toast);
        setShowToast(true);
      }
    } catch (error) {
      let toast = getErrorDialog(error, setShowToast, "detailPanelTop");
      setToast(toast);
      setShowToast(true);
    }
  };
  
  const formatOptions = (options) => {
    options.unshift({ value: "", name: "Select One", isDisabled: "yes" });
    return options;
  };

  const loadFormData = async (step) => {    
    let { configuration } = step;
    if (typeof(configuration) !== "undefined") {
      
      if (Array.isArray(configuration.commands)) {
        configuration.commands = configuration.commands.join("\n");
      }
      
      setFormData(configuration);
      setSshKeyFile(configuration.sshKey);
    } else {
      setFormData(INITIAL_DATA);
    }
  };
  
  const handleJenkinsChange = (selectedOption) => {
    setFormData({
      ...formData,
      toolConfigId: selectedOption.id ? selectedOption.id : "",
      jenkinsUrl: selectedOption.configuration
        ? selectedOption.configuration.jenkinsUrl
        : "",
      jUserId: selectedOption.configuration
        ? selectedOption.configuration.jUserId
        : "",
      jenkinsPort: selectedOption.configuration
        ? selectedOption.configuration.jenkinsPort
        : "",
      jAuthToken: selectedOption.configuration
        ? selectedOption.configuration.jAuthToken
        : "",
    });
  };

  const callbackFunction = async () => {
    if (validateRequiredFields()) {
      setLoading(true);
      let newConfiguration = formData;
      
      if (typeof(newConfiguration.secretKey) === "string") {
        newConfiguration.secretKey = await saveToVault(pipelineId, stepId, "secretKey", "Vault Secured Key", newConfiguration.secretKey);
      }

      if (newConfiguration.commands.length > 0) {
        const splitCommands = newConfiguration.commands.split(/\r?\n/g);        
        newConfiguration.commands = splitCommands;        
      }
      
      const item = {
        configuration: newConfiguration
      };
      console.log("item: ", item);
      setLoading(false);
      parentCallback(item);
    }
  };

  const saveToVault = async (pipelineId, stepId, key, name, value) => {
    const keyName = `${pipelineId}-${stepId}-${key}`;
    const body = {
      "key": keyName,
      "value": value
    };
    const response = await callbackSaveToVault(body);    
    if (response.status === 200 ) {
      return { name: name, vaultKey: keyName };
    } else {
      setFormData(formData => {
        return { ...formData, secretKey: {} };
      });
      setLoading(false);
      let errorMessage = "ERROR: Something has gone wrong saving secure data to your vault.  Please try again or report the issue to OpsERA.";
      let toast = getErrorDialog(errorMessage, setShowToast, "detailPanelTop");
      setToast(toast);
      setShowToast(true);
      return "";
    }
  };

  const validateRequiredFields = () => {
    let { accessKey, secretKey, sshKey } = formData;
    if (
      // accessKey.length === 0 || 
      // secretKey.length === 0 || 
      Object.keys(sshKey).length === 0) {
        console.log(Object.keys(sshKey).length);
      let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "stepConfigurationTop");
      setToast(toast);
      setShowToast(true);
      return false;
    } else {
      return true;
    }
  };

  const handleFileUploadToggle = (value) => {
    if (value === "SSH File Upload") {
      // resetting the jenkins form not sure if this is to be done!
      setFormData({ ...formData,  jenkinsUrl: "",
        jenkinsPort: "",
        jUserId: "",
        jAuthToken: "",
        jobName: "", sshAction: "SSH Execution" });
    } else {
      setFormData({ ...formData, sshAction: "SSH File Upload" });
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setSshFileMessage("");
    const reader = new FileReader();
    const fileSize = e.target.files[0].size;
    const fileName = e.target.files[0].name;

    reader.onload = async (e) => { 
      const text = (e.target.result);       
      if (fileSize < 3000) {
        const vaultResponse = await saveToVault(pipelineId, stepId, "sshKey", "", text);
        if (vaultResponse) {
          const keyName = `${pipelineId}-${stepId}-sshKey`;
          setSshKeyFile({ fileName: fileName, vaultKey: keyName });
          setFormData(formData => {
            return { ...formData, sshKey: { fileName: fileName, vaultKey: keyName } };
          });
        } else {
          setSshFileMessage("ERROR: Something has gone wrong saving secure data to your vault.  Please try again or report the issue to OpsERA.");
        }        
      } else {
        setSshKeyFile(INITIAL_SSH_KEYFILE);
        setFormData(formData => {
          return { ...formData, sshKey: {} };
        });
        setSshFileMessage("Warning, file contents too large for this system.  Please ensure the proper file has been selected or contact OpsERA to report this issue.");
      }
    };
    reader.readAsText(e.target.files[0]);
  };



  return (
    <Form>
      {/* AccessKey and SecretKey are not required anymore */}
      {/* <Form.Group controlId="accessKey">
        <Form.Label>AWS Access Key ID*</Form.Label>
        <Form.Control maxLength="256" type="text" placeholder="" value={formData.accessKey || ""} onChange={e => setFormData({ ...formData, accessKey: e.target.value })} />
      </Form.Group>
     
      <Form.Group controlId="accessKey">
        <Form.Label>AWS Secret Access Key*</Form.Label>
        <Form.Control maxLength="256" type="password" placeholder="" value={formData.secretKey || ""} onChange={e => setFormData({ ...formData, secretKey: e.target.value })} />            
        <Form.Text className="text-muted">AWS access keys consist of two parts: an access key ID and a secret access key. Both are required for automated deployments.</Form.Text> 
      </Form.Group> */}

      <Form.Group controlId="accessKey" className="mt-2">
        <Form.Label>Security Key*</Form.Label>
        <Form.File 
          id="sshKey-file" isValid={sshKeyFile && sshKeyFile.fileName && sshKeyFile.fileName.length > 0 }
          label={sshKeyFile && sshKeyFile.fileName ? sshKeyFile.fileName : "Upload Key File"}
          custom
          onChange={(e) => handleFileUpload(e)} 
        />
        {sshFileMessage ? 
          <Form.Text className="red">{sshFileMessage}</Form.Text> :
          <Form.Text className="text-muted">Attach the PEM/CER key file needed for accessing the EC2 instance.  This data will be secured in our Vault.</Form.Text> }
      </Form.Group>

      <Form.Group controlId="userName" className="mt-3">
        <Form.Label>User Name</Form.Label>
        <Form.Control maxLength="150" type="text" placeholder="" value={formData.userName || ""} onChange={e => setFormData({ ...formData, userName: e.target.value })} />
        <Form.Text className="text-muted">Username needed to access the EC2 instance.</Form.Text>
      </Form.Group>
      
      <Form.Group controlId="serverIp">
        <Form.Label>Server Address</Form.Label>
        <Form.Control maxLength="75" type="text" placeholder="" value={formData.serverIp || ""} onChange={e => setFormData({ ...formData, serverIp: e.target.value })} />
        <Form.Text className="text-muted">DNS or IP Address for the server.</Form.Text>
      </Form.Group>

      <Form.Group controlId="serverIp">
        <Form.Label>Server Path</Form.Label>
        <Form.Control maxLength="250" type="text" placeholder="" value={formData.serverPath || ""} onChange={e => setFormData({ ...formData, serverPath: e.target.value })} />
        <Form.Text className="text-muted">Path where the deployment occurs in.</Form.Text>
      </Form.Group>

      <Form.Group controlId="ssh-file-upload">
        <Form.Check 
          type="switch"
          id="ssh-file-upload"
          label="Use SSH File Upload Method" 
          checked={formData.sshAction === "SSH File Upload" ? true : false}   
          onChange={() => handleFileUploadToggle(formData.sshAction)} 
        />
      </Form.Group>

      {formData.sshAction === "SSH File Upload" && 
      <>
        <Form.Group controlId="jenkinsList">
          <Form.Label>Select Jenkins Tool Configuration*</Form.Label>
          {isJenkinsSearching ? (
            <div className="form-text text-muted mt-2 p-2">
              <LoadingIcon className={"text-muted mr-1"} />
              Loading Jenkins accounts from registry
            </div>
          ) : (
            <>
              {jenkinsList && jenkinsList.length > 0 ? (
                <StandaloneSelectInput
                  selectOptions={jenkinsList}
                  value={
                    formData.toolConfigId
                      ? jenkinsList[
                          jenkinsList.findIndex(
                            (x) => x.id === formData.toolConfigId
                          )
                        ]
                      : jenkinsList[0]
                  }
                  valueField={"id"}
                  textField={"name"}
                  defaultValue={
                    formData.toolConfigId
                      ? jenkinsList[
                          jenkinsList.findIndex(
                            (x) => x.id === formData.toolConfigId
                          )
                        ]
                      : jenkinsList[0]
                  }
                  setDataFunction={handleJenkinsChange}
                />
              ) : (
                <>
                  <div className="form-text text-muted p-2">
                    <IconBase
                      icon={faExclamationCircle}
                      className={"text-muted mr-1"}
                    />
                    No accounts have been registered for{" "}
                    <span className="upper-case-first">{formData.service}</span>
                    . Please go to
                    <Link to="/inventory/tools"> Tool Registry</Link> and add an
                    entry for this repository in order to proceed.{" "}
                  </div>
                </>
              )}
            </>
          )}
        </Form.Group>
      </>
      }

      <Form.Group controlId="commands">
        <Form.Label>SSH Commands</Form.Label>
        <Form.Control as="textarea" type="text" rows={6} placeholder="" value={formData.commands || ""} onChange={e => setFormData({ ...formData, commands: e.target.value })} />
        <Form.Text className="text-muted">SSH commands necessary for this step to complete.</Form.Text>
      </Form.Group>
      
      <Button variant="primary" type="button" 
        onClick={() => { callbackFunction(); }}> 
        {loading ? 
          <span><LoadingIcon className={"mr-1"} /> Saving</span> :
          <span><IconBase icon={faSave} className={"mr-1"}/> Save</span> }
      </Button>
      
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}

SshUploadDeployStepConfiguration.propTypes = {
  data: PropTypes.object,
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  setToast: PropTypes.func,
  setShowToast: PropTypes.func
};

export default SshUploadDeployStepConfiguration;
