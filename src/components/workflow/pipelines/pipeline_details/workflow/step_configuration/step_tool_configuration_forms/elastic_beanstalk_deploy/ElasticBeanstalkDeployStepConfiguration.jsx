//PP-95 Deploy Step form for AWS Elastic Beanstalk
//https://opsera.atlassian.net/wiki/spaces/OPSERA/pages/283935120/Code-Deployer

import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button, OverlayTrigger, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, 
  faSpinner,
  faExclamationCircle,
  faExclamationTriangle,
  faTimes,
  faEllipsisH,
  faTools } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import { axiosApiService } from "../../../../../../../../api/apiService";
import { Link } from "react-router-dom";
import {getErrorDialog, getMissingRequiredFieldsErrorDialog} from "../../../../../../../common/toasts/toasts";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";

const PLATFORM_OPTIONS = [
  { value: "", label: "Select One", isDisabled: "yes" },
  { value: ".NET on Windows Server", label: ".NET on Windows Server" },
  { value: "Go", label: "Go" },
  { value: "Java SE", label: "Java SE" },
  { value: "Multicontainer Docker", label: "Multiple Container Docker" },
  { value: "Node.js", label: "Node.js" },
  { value: "PHP", label: "PHP" },
  { value: "Preconfigured Docker", label: "Pre-configured Docker" },
  { value: "Python", label: "Python" },
  { value: "Ruby", label: "Ruby" },
  { value: "Single Container Docker", label: "Single Container Docker" },
  { value: "Tomcat", label: "Tomcat" }
];

//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  awsToolConfigId: "",
  accessKey: "",
  secretKey: "",
  bucketName: "",
  regions: "",
  applicationName: "",
  applicationVersionLabel: "",
  s3StepId: "",
  description: "",
  port: "",
  ec2KeyName: "",
  platform: ""
};


// TODO: This needs to be refactored to follow new standards and won't work without a refactor
//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function ElasticBeanstalkDeployStepConfiguration({ stepTool, pipelineId, plan, stepId, parentCallback, callbackSaveToVault, setToast, setShowToast }) {
  const contextType = useContext(AuthContext);

  const [formData, setFormData] = useState(INITIAL_DATA);
  const [renderForm, setRenderForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listOfSteps, setListOfSteps] = useState([]);
  
  const [awsList, setAwsList] = useState([]);
  const [isAwsSearching, setIsAwsSearching] = useState(false);
 
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
        setRenderForm(true);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Request was canceled via controller.abort");
          return;
        }        
      }
    };
    runEffect();
    return () => {
      setRenderForm(false);     
      controller.abort();      
    };
  }, [stepTool]);

  
  // search aws
  useEffect(() => {
    setShowToast(false);

    async function fetchAWSDetails(service) {
      setIsAwsSearching(true);
      // Set results state
      let results = await searchToolsList(service);
      //console.log(results);
      const filteredList = results.filter(
        (el) => el.configuration !== undefined
      ); //filter out items that do not have any configuration data!
      if (filteredList) {
        setAwsList(filteredList);
        setIsAwsSearching(false);
      }
    }

    // Fire off our API call
    fetchAWSDetails("aws_account");
  }, []);


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
        configuration: formData
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

  //TODO: Refactor this into actions.jsx
  const searchToolsList = async (service) => {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/registry/properties/" + service; // this is to get all the service accounts from tool registry
    try {
      const res = await axiosApiService(accessToken).get(apiUrl);
      if (res.data) {
        let respObj = [];
        let arrOfObj = res.data;
        arrOfObj.map((item) => {
          respObj.push({
            name: item.name,
            id: item._id,
            configuration: item.configuration,
            accounts: item.accounts,
            jobs: item.jobs,
          });
        });
        //console.log(respObj);
        return respObj;
      } else {
        let errorMessage ="Jenkins information is missing or unavailable!  Please ensure the required Jenkins creds are registered and up to date in Tool Registry.";
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

  const validateRequiredFields = () => {
    let { accessKey, secretKey, regions, bucketName, port, ec2KeyName } = formData;
    if (
      accessKey.length === 0 || 
      secretKey.length === 0 || 
      regions.length === 0 || 
      port.length === 0 || 
      ec2KeyName.length === 0 || 
      bucketName.length === 0) {
      let toast = getMissingRequiredFieldsErrorDialog(setShowToast, "stepConfigurationTop");
      setToast(toast);
      setShowToast(true);
      return false;
    } else {
      return true;
    }
  };
  
  const handleAWSChange = (selectedOption) => {
    setLoading(true);
    //console.log(selectedOption);
    if (selectedOption.id && selectedOption.configuration) {
      setFormData({
        ...formData,
        awsToolConfigId: selectedOption.id ? selectedOption.id : "",
        awsAccountId: selectedOption.configuration
          ? selectedOption.configuration.awsAccountId
          : "",
        accessKey: selectedOption.configuration
          ? selectedOption.configuration.accessKey
          : "",
        secretKey: selectedOption.configuration
          ? selectedOption.configuration.secretKey
          : "",
        regions: selectedOption.configuration
          ? selectedOption.configuration.regions
          : "",
      });
    }
    setLoading(false);
  };

  const handlePlatformChange = (selectedOption) => {
    setFormData({ ...formData, platform: selectedOption.value });    
  };
  
  const handleS3StepChange = (selectedOption) => {
    setFormData({ ...formData, s3StepId: selectedOption._id });    
  };

  
  const RegistryPopover = (data) => {
    if (data) {
      return (
        <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
          <Popover.Title as="h3">
            Tool and Account Details{" "}
            <FontAwesomeIcon
              icon={faTimes}
              className="fa-pull-right pointer"
              onClick={() => document.body.click()}
            />
          </Popover.Title>

          <Popover.Content>
            <div className="text-muted mb-2">
              Configuration details for this item are listed below. Tool and
              account specific settings are stored in the
              <Link to="/inventory/tools">Tool Registry</Link>. To add a new
              entry to a dropdown or update settings, make those changes there.
            </div>
            {data.configuration && (
              <>
                {Object.entries(data.configuration).map(function (a) {
                  return (
                    <div key={a}>
                      {a[1].length > 0 && (
                        <>
                          <span className="text-muted pr-1">{a[0]}: </span>{" "}
                          {a[1]}
                        </>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </Popover.Content>
        </Popover>
      );
    } else {
      return (
        <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
          <Popover.Title as="h3">
            Tool and Account Details{" "}
            <FontAwesomeIcon
              icon={faTimes}
              className="fa-pull-right pointer"
              onClick={() => document.body.click()}
            />
          </Popover.Title>

          <Popover.Content>
            <div className="text-muted mb-2">
              Please select any tool/account to get the details.
            </div>
          </Popover.Content>
        </Popover>
      );
    }
  };
  
  return (
    <Form>
<Form.Group controlId="jenkinsList">
            <Form.Label className="w-100">
              AWS Credentials*
              <OverlayTrigger
                trigger="click"
                rootClose
                placement="left"
                overlay={RegistryPopover(
                  awsList[
                    awsList.findIndex((x) => x.id === formData.awsToolConfigId)
                  ]
                )}
              >
                <FontAwesomeIcon
                  icon={faEllipsisH}
                  className="fa-pull-right pointer pr-1"
                  onClick={() => document.body.click()}
                />
              </OverlayTrigger>
            </Form.Label>
            {isAwsSearching ? (
              <div className="form-text text-muted mt-2 p-2">
                <FontAwesomeIcon
                  icon={faSpinner}
                  spin
                  className="text-muted mr-1"
                  fixedWidth
                />
                Loading AWS accounts from Tool Registry
              </div>
            ) : (
              <>
                {renderForm && awsList && awsList.length > 0 ? (
                  <>
                    <StandaloneSelectInput
                      selectOptions={awsList}
                      value={
                        awsList[
                          awsList.findIndex(
                            (x) => x.id === formData.awsToolConfigId
                          )
                        ]
                      }
                      valueField="id"
                      textField="name"
                      setDataFunction={handleAWSChange}
                    />
                  </>
                ) : (
                  <>
                    <div className="form-text text-muted p-2">
                      <FontAwesomeIcon
                        icon={faExclamationCircle}
                        className="text-muted mr-1"
                        fixedWidth
                      />
                      No accounts have been registered for Code Scan. Please go
                      to
                      <Link to="/inventory/tools">Tool Registry</Link> and add a
                      AWS Account entry in order to proceed.
                    </div>
                  </>
                )}
              </>
            )}
          </Form.Group>

      <Form.Group controlId="bucketName">
        <Form.Label>S3 Bucket Name*</Form.Label>
        <Form.Control maxLength="150" type="text" placeholder="" value={formData.bucketName || ""} onChange={e => setFormData({ ...formData, bucketName: e.target.value })} />
      </Form.Group>

      <Form.Group controlId="ec2KeyName">
        <Form.Label>EC2 Key Name*</Form.Label>
        <Form.Control maxLength="50" type="text" placeholder="" value={formData.ec2KeyName || ""} onChange={e => setFormData({ ...formData, ec2KeyName: e.target.value })} />
        <Form.Text className="text-muted">Key-pair file name used to access the EC2 instance.</Form.Text>
      </Form.Group>

      <Form.Group controlId="port">
        <Form.Label>Application Port*</Form.Label>
        <Form.Control maxLength="10" type="text" placeholder="" value={formData.port || ""} onChange={e => setFormData({ ...formData, port: e.target.value })} />
        <Form.Text className="text-muted">Port that the application needs in order to run.</Form.Text>
      </Form.Group>

      <Form.Group controlId="platform">
        <Form.Label>Platform*</Form.Label>
        {renderForm ?
          <StandaloneSelectInput
            data={PLATFORM_OPTIONS}
            valueField='id'
            textField='label'
            defaultValue={formData.platform ? PLATFORM_OPTIONS[PLATFORM_OPTIONS.findIndex(x => x.value === formData.platform)] : PLATFORM_OPTIONS[0]}
            setDataFunction={handlePlatformChange}
          /> : null }
      </Form.Group>


      <Form.Group controlId="applicationName">
        <Form.Label>Application Name</Form.Label>
        <Form.Control maxLength="250" type="text" placeholder="" value={formData.applicationName || ""} onChange={e => setFormData({ ...formData, applicationName: e.target.value })} />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control maxLength="250" type="text" placeholder="" value={formData.description || ""} onChange={e => setFormData({ ...formData, description: e.target.value })} />
      </Form.Group>

      <Form.Group controlId="applicationVersionLabel">
        <Form.Label>Application Version</Form.Label>
        <Form.Control maxLength="50" type="text" placeholder="" value={formData.applicationVersionLabel || ""} onChange={e => setFormData({ ...formData, applicationVersionLabel: e.target.value })} />
      </Form.Group>

      
      <Form.Group controlId="s3Step">
        <Form.Label>S3 Step Info :</Form.Label>
        {renderForm && listOfSteps ?
          <StandaloneSelectInput
            selectOptions={listOfSteps}
            value={formData.s3StepId ? listOfSteps[listOfSteps.findIndex(x => x._id === formData.s3StepId)] : listOfSteps[0]}
            valueField='_id'
            textField='name'
            defaultValue={formData.s3StepId ? listOfSteps[listOfSteps.findIndex(x => x._id === formData.s3StepId)] : listOfSteps[0]}
            setDataFunction={handleS3StepChange}
          /> : <FontAwesomeIcon icon={faSpinner} spin className="text-muted ml-2" fixedWidth/> }
      </Form.Group>

      {/* Leave the threshold form group as is for now, just read only for all forms */}
      {/* <Form.Group controlId="threshold">
        <Form.Label>Step Success Threshold</Form.Label>
        <Form.Control type="text" placeholder="" value={thresholdVal || ""} onChange={e => setThresholdValue(e.target.value)} disabled={true} />
      </Form.Group> */}
      
      <Button variant="primary" type="button" 
        onClick={() => { callbackFunction(); }}> 
        {loading ? 
          <><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/> Saving</> :
          <><FontAwesomeIcon icon={faSave} disabled={!listOfSteps || !renderForm} className="mr-1"/> Save</> }
      </Button>
      
      <small className="form-text text-muted mt-2 text-right">* Required Fields</small>
    </Form>
  );
}

ElasticBeanstalkDeployStepConfiguration.propTypes = {
  stepTool: PropTypes.object,
  plan: PropTypes.array,
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  parentCallback: PropTypes.func,
  callbackSaveToVault: PropTypes.func,
  setToast: PropTypes.func,
  setShowToast: PropTypes.func
};

export default ElasticBeanstalkDeployStepConfiguration;
