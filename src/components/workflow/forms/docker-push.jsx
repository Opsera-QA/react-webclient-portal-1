import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSpinner } from "@fortawesome/free-solid-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";

//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  jobType: "DOCKER PUSH", //hardcoded   
  jenkinsUrl: "",
  jenkinsPort: "",
  jUserId: "",
  jAuthToken: "",
  jobName: "",

  accessKey: "", 
  secretKey: "", // store in vault
  regions: "",
  awsAccountId: "",
  buildStepId: "",
  dockerName: "",
  dockerTagName : ""
};


//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function DockerPushStepConfiguration( { stepTool, pipelineId, plan, stepId, parentCallback, callbackSaveToVault    }) {
  const [thresholdVal, setThresholdValue] = useState("");
  const [thresholdType, setThresholdType] = useState("");
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [formMessage, setFormMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [listOfSteps, setListOfSteps] = useState([]);

  useEffect(()=> {
    if( plan && stepId ) {
      setListOfSteps(formatStepOptions(plan, stepId));
    }
  }, [plan, stepId]);

  const formatStepOptions = (plan, stepId) => {
    let STEP_OPTIONS = plan.slice(0, plan.findIndex( (element) => element._id === stepId));
    STEP_OPTIONS.unshift({ _id: "", name : "Select One",  isDisabled: "yes" });
    return STEP_OPTIONS;
  };

  useEffect(() => {    
    const controller = new AbortController();
    const runEffect = async () => {
      try {
        await loadFormData(stepTool);
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
  }, [stepTool]);


  const loadFormData = async (step) => {
    let { configuration } = step;
    if (typeof(configuration) !== "undefined") {
      setFormData(configuration);
    } else {
      setFormData(INITIAL_DATA);
    }
  };

  const callbackFunction = async () => {
    if (validateRequiredFields()) {
      setLoading(true);

      let newConfiguration = formData;
      
      if (typeof(newConfiguration.secretKey) === "string") {
        newConfiguration.secretKey = await saveToVault(pipelineId, stepId, "secretKey", "Vault Secured Key", newConfiguration.secretKey);
      }

      const item = {
        configuration: newConfiguration,
        threshold: {
          type: thresholdType,
          value: thresholdVal
        }
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
      setFormMessage("ERROR: Something has gone wrong saving secure data to your vault.  Please try again or report the issue to OpsERA.");
      return "";
    }
  };

  const validateRequiredFields = () => {

    let { jenkinsUrl, jUserId, jAuthToken, accessKey, secretKey, regions, awsAccountId, dockerName, dockerTagName, buildStepId } = formData;
    if ( accessKey.length === 0 ||
      secretKey.length === 0 ||
      regions.length === 0 ||
      awsAccountId.length === 0 ||
    // dockerName.length === 0 ||
    // dockerTagName.length === 0 ||
       buildStepId.length === 0 ||
      jenkinsUrl.length === 0 || jUserId.length === 0 || jAuthToken.length === 0
    ) {
      setFormMessage("Required Fields Missing!");
      return false;
    } else {
      setFormMessage("");
      return true;
    }
  };
  
  const handleBuildStepChange = (selectedOption) => {
    setFormData({ ...formData, buildStepId: selectedOption._id });    
  };

  return (
    <Form>
      { formMessage.length > 0 ? <p className="text-danger">{formMessage}</p> : null}

      {/* Leave the threshold form group as is for now, just read only for all forms */}
      {/* <Form.Group controlId="threshold">
        <Form.Label>Step Success Threshold</Form.Label>
        <Form.Control type="text" placeholder="" value={thresholdVal || ""} onChange={e => setThresholdValue(e.target.value)} disabled={true} />
      </Form.Group> */}

      <Form.Group controlId="repoField">
        <Form.Label>Jenkins Container URL*</Form.Label>
        <Form.Control maxLength="100" type="text" placeholder="" value={formData.jenkinsUrl || ""} onChange={e => setFormData({ ...formData, jenkinsUrl: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Jenkins Port</Form.Label>
        <Form.Control maxLength="5" type="text" placeholder="" value={formData.jenkinsPort || ""} onChange={e => setFormData({ ...formData, jenkinsPort: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Jenkins User ID*</Form.Label>
        <Form.Control maxLength="50" type="text" placeholder="" value={formData.jUserId || ""} onChange={e => setFormData({ ...formData, jUserId: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Jenkins Token*</Form.Label>
        <Form.Control maxLength="500" type="password" placeholder="" value={formData.jAuthToken || ""} onChange={e => setFormData({ ...formData, jAuthToken: e.target.value })} />
      </Form.Group>
      <Form.Group controlId="branchField">
        <Form.Label>Job Name</Form.Label>
        <Form.Control maxLength="150" type="text" placeholder="" value={formData.jobName || ""} onChange={e => setFormData({ ...formData, jobName: e.target.value })} />
      </Form.Group>

      <Form.Group controlId="accessKey">
        <Form.Label>AWS Access Key ID*</Form.Label>
        <Form.Control maxLength="256" type="text" placeholder="" value={formData.accessKey || ""} onChange={e => setFormData({ ...formData, accessKey: e.target.value })} />
      </Form.Group>
     
      <Form.Group controlId="accessKey">
        <Form.Label>AWS Secret Access Key*</Form.Label>
        <Form.Control maxLength="256" type="password" placeholder="" value={formData.secretKey || ""} onChange={e => setFormData({ ...formData, secretKey: e.target.value })} />            
        <Form.Text className="text-muted">AWS access keys consist of two parts: an access key ID and a secret access key. Both are required for automated deployments.</Form.Text> 
      </Form.Group>

      <Form.Group controlId="awsRegion">
        <Form.Label>AWS Region*</Form.Label>
        <Form.Control maxLength="150" type="text" placeholder="" value={formData.regions || ""} onChange={e => setFormData({ ...formData, regions: e.target.value })} />
      </Form.Group>

      <Form.Group controlId="awsAccountId">
        <Form.Label>AWS Account ID*</Form.Label>
        <Form.Control maxLength="150" type="text" placeholder="" value={formData.awsAccountId || ""} onChange={e => setFormData({ ...formData, awsAccountId: e.target.value })} />
      </Form.Group>

      <Form.Group controlId="s3Step">
        <Form.Label>Build Step Info*</Form.Label>
        {listOfSteps ?
          <DropdownList
            data={listOfSteps}
            value = {formData.buildStepId ? listOfSteps[listOfSteps.findIndex(x => x._id === formData.buildStepId)] : listOfSteps[0]}
            valueField='_id'
            textField='name'
            defaultValue={formData.buildStepId ? listOfSteps[listOfSteps.findIndex(x => x._id === formData.buildStepId)] : listOfSteps[0]}
            onChange={handleBuildStepChange}             
          /> : <FontAwesomeIcon icon={faSpinner} spin className="text-muted ml-2" fixedWidth/> }
      </Form.Group>

      <Button variant="primary" type="button" 
        onClick={() => { callbackFunction(); }}> 
        {loading ? 
          <><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> Saving</> :
          <><FontAwesomeIcon icon={faSave} className="mr-1"/> Save</> }
      </Button>
      
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}

DockerPushStepConfiguration.propTypes = {
  data: PropTypes.object,
  pipelineId: PropTypes.string,
  plan: PropTypes.array,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func
};

export default DockerPushStepConfiguration;
