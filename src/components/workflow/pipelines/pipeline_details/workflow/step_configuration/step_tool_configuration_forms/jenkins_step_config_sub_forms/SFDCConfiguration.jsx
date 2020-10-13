import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faTimes,
  faSpinner,
  faEllipsisH
} from "@fortawesome/free-solid-svg-icons";
import DropdownList from "react-widgets/lib/DropdownList";
import { AuthContext } from "../../../../../../../../contexts/AuthContext";
import { DialogToastContext } from "../../../../../../../../contexts/DialogToastContext";
import { axiosApiService } from "../../../../../../../../api/apiService";
import { Link } from "react-router-dom";
import {
  getErrorDialog,
} from "components/common/toasts/toasts";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import SFDCUnitTestModal from "./SFDCUnitTestModal";

const UNIT_TEST_OPTIONS = [
  { value: "", label: "Select One", isDisabled: "yes" },
  { value: "RunLocalTests", label: "Run Local Tests" },
  { value: "RunAllTestsInOrg", label: "Run All Tests In Org" },
  { value: "RunSpecifiedTests", label: "Run Specified Tests" },
];

//data is JUST the tool object passed from parent component, that's returned through parent Callback
// ONLY allow changing of the configuration and threshold properties of "tool"!
function SFDCConfiguration({  
  plan,
  pipelineId,
  stepId,
  renderForm,
  jobType,
  jenkinsList,
  accountsList,
  formData,
  setFormData,
  setToast,
  setShowToast,
}) {
  const contextType = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [listOfSteps, setListOfSteps] = useState([]);
  const [sfdcList, setSFDCList] = useState([]);
  const [isSFDCSearching, setisSFDCSearching] = useState(false);
  const [show, setShow] = useState(false);
  const [save, setSave] = useState(false);

  useEffect(() => {
    if (plan && stepId) {
      setListOfSteps(formatStepOptions(plan, stepId));
    }
  }, [plan, stepId]);

  const formatStepOptions = (plan, stepId) => {
    let STEP_OPTIONS = plan.slice(
      0,
      plan.findIndex((element) => element._id === stepId)
    );
    STEP_OPTIONS.unshift({ _id: "", name: "Select One", isDisabled: "yes" });
    return STEP_OPTIONS;
  };

  // search sfdc
  useEffect(() => {
    setShowToast(false);

    async function fetchSFDCDetails(service) {
      setisSFDCSearching(true);
      let results = await searchToolsList(service);

      if (results) {
        const filteredList = results.filter((el) => el.configuration !== undefined); //filter out items that do not have any configuration data!
        if (filteredList) {
          setSFDCList(filteredList);
          setisSFDCSearching(false);
        }
      }
    }

    // Fire off our API call
    fetchSFDCDetails("sfdc-configurator");
  }, []);

  const searchToolsList = async (service) => {
    const { getAccessToken } = contextType;
    const accessToken = await getAccessToken();
    const apiUrl = "/registry/properties/" + service; // this is to get all the service accounts from tool registry
    try {
      const res = await axiosApiService(accessToken).get(apiUrl);
      if (res.data && res.status === 200) {
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
        let toast = getErrorDialog(
          "Jenkins information is missing or unavailable!  Please ensure the required Jenkins creds are registered and up to date in Tool Registry.",
          setShowToast,
          "detailPanelTop"
        );
        setToast(toast);
        setShowToast(true);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
  };

  const handleSFDCChange = (selectedOption) => {
    //setLoading(true);
    //console.log(selectedOption);
    if (selectedOption.id && selectedOption.configuration) {
      setFormData({
        ...formData,
        sfdcToolId: selectedOption.id,
        accountUsername: selectedOption.configuration ? selectedOption.configuration.accountUsername : "",
        sfdcUnitTestType: ""
      });
    }
    //setLoading(false);
  };

  const handleDestinationSFDCChange = (selectedOption) => {
    //setLoading(true);
    //console.log(selectedOption);
    if (selectedOption.id && selectedOption.configuration) {
      setFormData({
        ...formData,
        sfdcDestToolId: selectedOption.id,
        destAccountUsername: selectedOption.configuration ? selectedOption.configuration.destAccountUsername : "",
      });
    }
    //setLoading(false);
  };

  const handleUnitTestChange = (selectedOption) => {
    setFormData({
      ...formData,
      sfdcUnitTestType: selectedOption.value,
    });
  }

  const handleClose = () => { 
    setSave(false);
    setShow(false);
   };

  const handleShow = () => setShow(true);

  const getTestClasses = async() => {
    
    setSave(true);
    // call api to get test classes
    try {
      // const accessToken = await getAccessToken();
      const res = await sfdcPipelineActions.setTestClassesList({"sfdcToolId": formData.sfdcToolId, "pipelineId": pipelineId, "stepId": stepId }, getAccessToken);
      if (res.data.status != 200 ) {
        let toast = getErrorDialog(
          res.data.message,
          setShowToast,
          "detailPanelTop"
        );
        setToast(toast);
        setShowToast(true);
        setSave(false);
        return;
      }
      handleShow();
    } catch (error) {
      console.error("Error getting API Data: ", error);
      toastContext.showLoadingErrorDialog(error);
    }
  }

  const RegistryPopover = (data) => {
    if (data) {
      return (
        <Popover id="popover-basic" style={{ maxWidth: "500px" }}>
          <Popover.Title as="h3">
            Tool and Account Details{" "}
            <FontAwesomeIcon icon={faTimes} className="fa-pull-right pointer" onClick={() => document.body.click()} />
          </Popover.Title>

          <Popover.Content>
            <div className="text-muted mb-2">
              Configuration details for this item are listed below. Tool and account specific settings are stored in the
              <Link to="/inventory/tools">Tool Registry</Link>. To add a new entry to a dropdown or update settings,
              make those changes there.
            </div>
            {data.configuration && (
              <>
                {Object.entries(data.configuration).map(function (a) {
                  return (
                    <div key={a}>
                      {a[1].length > 0 && (
                        <>
                          <span className="text-muted pr-1">{a[0]}: </span> {a[1]}
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
            <FontAwesomeIcon icon={faTimes} className="fa-pull-right pointer" onClick={() => document.body.click()} />
          </Popover.Title>

          <Popover.Content>
            <div className="text-muted mb-2">Please select any tool/account to get the details.</div>
          </Popover.Content>
        </Popover>
      );
    }
  };

  return (
    <>
      <Form>
        {(jobType === "sfdc-ant" || jobType === "sfdc-ant-profile"  || (formData.toolJobType && formData.toolJobType.includes("SFDC"))) && (
              <>
              {formData.jobType != "SFDC PUSH ARTIFACTS" && 
                  <Form.Group controlId="sfdcList">
                  <Form.Label className="w-100">
                    SalesForce Credentials*
                    <OverlayTrigger
                      trigger="click"
                      rootClose
                      placement="left"
                      overlay={RegistryPopover(sfdcList[sfdcList.findIndex((x) => x.id === formData.sfdcToolId)])}
                    >
                      <FontAwesomeIcon
                        icon={faEllipsisH}
                        className="fa-pull-right pointer pr-1"
                        onClick={() => document.body.click()}
                      />
                    </OverlayTrigger>
                  </Form.Label>
                  {isSFDCSearching ? (
                    <div className="form-text text-muted mt-2 p-2">
                      <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
                      Loading SalesForce accounts from Tool Registry
                    </div>
                  ) : (
                    <>
                      {renderForm && sfdcList && sfdcList.length > 0 ? (
                        <>
                          <DropdownList
                            data={sfdcList}
                            value={sfdcList[sfdcList.findIndex((x) => x.id === formData.sfdcToolId)]}
                            valueField="id"
                            textField="name"
                            filter="contains"
                            onChange={handleSFDCChange}
                          />
                        </>
                      ) : (
                        <>
                          <div className="form-text text-muted p-2">
                            <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
                            No accounts have been registered for SalesForce. Please go to
                            <Link to="/inventory/tools">Tool Registry</Link> and add a SalesForce (SFDC) Account entry
                            in order to proceed.
                          </div>
                        </>
                      )}
                    </>
                  )}
                </Form.Group>
              }
              </>
            )}

            {formData.jobType === "SFDC CREATE PACKAGE XML" && 
               <Form.Group controlId="formBasicCheckboxOrgToOrg" className="mt-4 ml-1">
               <Form.Check
                 type="checkbox"
                 label="Compare with destination SFDC Org"
                 checked={formData.isOrgToOrg}
                 onChange={(e) =>
                   setFormData({
                     ...formData,
                     isOrgToOrg: e.target.checked,
                     sfdcDestToolId: "",
                     destAccountUsername: "",
                   })
                 }
               />
             </Form.Group>
            }

            {formData.isOrgToOrg && (
              <Form.Group controlId="jenkinsList">
                <Form.Label>Destination SalesForce Credentials*
                <OverlayTrigger
                      trigger="click"
                      rootClose
                      placement="left"
                      overlay={RegistryPopover(sfdcList[sfdcList.findIndex((x) => x.id === formData.sfdcDestToolId)])}
                    >
                      <FontAwesomeIcon
                        icon={faEllipsisH}
                        className="fa-pull-right pointer pr-1"
                        onClick={() => document.body.click()}
                      />
                    </OverlayTrigger>
                </Form.Label>
                {isSFDCSearching ? (
                  <div className="form-text text-muted mt-2 p-2">
                    <FontAwesomeIcon icon={faSpinner} spin className="text-muted mr-1" fixedWidth />
                    Loading SalesForce accounts from Tool Registry
                  </div>
                ) : (
                  <>
                    {renderForm && sfdcList && sfdcList.length > 0 ? (
                      <>
                        <DropdownList
                          data={sfdcList}
                          value={sfdcList[sfdcList.findIndex((x) => x.id === formData.sfdcDestToolId)]}
                          valueField="id"
                          textField="name"
                          filter="contains"
                          onChange={handleDestinationSFDCChange}
                        />
                        {formData.destAccountUsername && formData.destAccountUsername.length > 0 && (
                          <div className="text-right pt-2">
                            <OverlayTrigger
                              trigger="click"
                              rootClose
                              placement="left"
                              overlay={RegistryPopover(
                                sfdcList[sfdcList.findIndex((x) => x.id === formData.sfdcDestToolId)]
                              )}
                            >
                              <Button variant="outline-dark" size="sm">
                                Info
                              </Button>
                            </OverlayTrigger>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="form-text text-muted p-2">
                          <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
                          No accounts have been registered for SalesForce. Please go to
                          <Link to="/inventory/tools"> Tool Registry</Link> and add an entry for this repository in
                          order to proceed.
                        </div>
                      </>
                    )}
                  </>
                )}
              </Form.Group>
            )}

            {formData.jobType === "SFDC BACK UP" && 
               <Form.Group controlId="formBasicCheckboxIsFullBackup" className="mt-4 ml-1">
               <Form.Check
                 type="checkbox"
                 label="Full Backup"
                 checked={formData.isFullBackup}
                 onChange={(e) =>
                   setFormData({
                     ...formData,
                     isFullBackup: e.target.checked,
                   })
                 }
               />
             </Form.Group>
            }
            
            {formData.jobType === "SFDC UNIT TESTING" && formData.sfdcToolId.length > 0 && 
            <>
              <Form.Group controlId="unitTestSelection" className="mt-4 ml-1">
                <Form.Label className="w-100">
                    Unit Test Type*
                </Form.Label>
                <DropdownList
                  data={UNIT_TEST_OPTIONS}
                  value={UNIT_TEST_OPTIONS[UNIT_TEST_OPTIONS.findIndex((x) => x.value === formData.sfdcUnitTestType)]}
                  valueField="id"
                  textField="label"
                  filter="contains"
                  placeholder="Please select type of unit test"
                  onChange={handleUnitTestChange}
                />
              </Form.Group>
              {formData.sfdcUnitTestType === "RunSpecifiedTests" && 
                <div className="flex-container-bottom pr-2 mt-4 mb-2 text-right">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      getTestClasses();
                    }}
                    disabled={save}
                  >
                  {save ? (
                    <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth />
                  ) : (
                    <FontAwesomeIcon fixedWidth className="mr-1" />
                  )}
                  Select Test classes
                </Button>
              </div>
              }
             </>
            }
      </Form>
      
      <SFDCUnitTestModal 
        show={show}
        pipelineId={pipelineId}
        stepId={stepId}
        sfdcToolId={formData.sfdcToolId}
        handleClose={handleClose}
      />

      </>
  );
}

SFDCConfiguration.propTypes = {
  plan: PropTypes.array,
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  renderForm: PropTypes.bool,
  jobType: PropTypes.string,
  jenkinsList: PropTypes.array,
  accountsList: PropTypes.array,
  formData: PropTypes.object,
  setFormData: PropTypes.func,
  setToast: PropTypes.func,
  setShowToast: PropTypes.func,
};

export default SFDCConfiguration;
