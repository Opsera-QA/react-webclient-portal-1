import React, { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import MergeSyncTaskWizardCreateNewRecordButton
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/initialization_screen/MergeSyncTaskWizardCreateNewRecordButton";
import BooleanToggleInput from "../../../../../../../common/inputs/boolean/BooleanToggleInput";
import { Row, Col } from "react-bootstrap";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import SalesforcePackageVersionSelectionInput
  from "../../../../../../../workflow/wizards/sfdc_pipeline_wizard/xml_viewer/xml/SalesforcePackageVersionSelectionInput";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import { faFileCode } from "@fortawesome/pro-light-svg-icons";
import MergeSyncTaskWizardFileUploadComponent
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/csv_file_upload/MergeSyncTaskWizardFileUploadComponent";
import mergeSyncTaskWizardActions from "components/tasks/details/tasks/merge_sync_task/wizard/mergeSyncTaskWizard.actions";
import { DialogToastContext } from "contexts/DialogToastContext";

const MergeSyncTaskWizardInitializationScreen = ({
  wizardModel,
  setWizardModel,
  setCurrentScreen,
  handleClose,
  mergeSyncType,
  skipConfig,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [activeTab, setActiveTab] = useState("manual");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [creatingNewRecord, setCreatingNewRecord] = useState(false);
  const [existingRecord, setExistingRecord] = useState(undefined);

  useEffect(() => {
    wizardModel?.setData("recordId", "64a66e465a5b17fdf3298b6f");
    setWizardModel({ ...wizardModel });
  }, [])

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    loadData(wizardModel, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (newWizardModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);

      const result = await mergeSyncTaskWizardActions.findExistingRecordV2(getAccessToken, cancelSource, newWizardModel);
      const existingRecord = result?.data;

      if (existingRecord) {
        setExistingRecord(existingRecord);
        newWizardModel.setData("recordId", existingRecord._id);
        setWizardModel({ ...newWizardModel });
      }
      else {
        await createNewWizardRecord(newWizardModel);
      }
    }
    catch (error) {
      console.error(error);
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const createNewWizardRecord = async (newWizardModel = wizardModel) => {
    try {
      setCreatingNewRecord(true);
      const response = await mergeSyncTaskWizardActions.createNewRecordV2(
        getAccessToken,
        cancelTokenSource,
        wizardModel,
      );
      const newRecord = response?.data?.data;

      if (isMounted?.current === true && newRecord != null) {
        newWizardModel?.setData("recordId", newRecord._id);
        setWizardModel({ ...newWizardModel });
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(error, "Could not create new wizard record:");
      }
    } finally {
      if (isMounted?.current === true) {
        setCreatingNewRecord(false);
      }
    }
  };

  const getProfileAndVersion = () => {
    if (wizardModel?.getData("taskType") === "SFDC_GIT_COMPARE_SYNC") {
      return (
        <>
          {wizardModel.getData("sfdcToolId") &&
            <SalesforcePackageVersionSelectionInput
              pipelineWizardModel={wizardModel}
              setPipelineWizardModel={setWizardModel}
              fieldName={"apiVersion"}
            />
          }
          <Row className="mx-0 mt-3 d-flex">
            <div className="ml-auto d-flex">
              <Col>
                <BooleanToggleInput
                  fieldName={"isProfiles"}
                  dataObject={wizardModel}
                  setDataObject={setWizardModel}
                />
              </Col>
            </div>
          </Row>
        </>
      );
    }
  };

  const getBody = () => {
    if (isLoading || wizardModel == null) {
      return (
        <CenterLoadingIndicator
          minHeight={"500px"}
          message={`Initializing ${mergeSyncType} Merge Sync Wizard`}
        />
      );
    }

    return (
      <div>
        <div className={"mx-auto mt-3 mb-3"}>
          {`Would you like to start a new ${mergeSyncType} Merge Sync Task Wizard Instance?`}
        </div>
        {getProfileAndVersion()}
        <SaveButtonContainer>
          <MergeSyncTaskWizardCreateNewRecordButton
            wizardModel={wizardModel}
            setWizardModel={setWizardModel}
            setCurrentScreen={setCurrentScreen}
            skipConfig={skipConfig}
            className={"mr-2"}
          />
          <CancelButton
            showUnsavedChangesMessage={false}
            cancelFunction={handleClose}
            size={"sm"}
          />
        </SaveButtonContainer>
      </div>
    );
  };

  const getFileUploadBody = () => {
    return (
      <>
        {getProfileAndVersion()}
        <MergeSyncTaskWizardFileUploadComponent
          wizardModel={wizardModel}
          setWizardScreen={setCurrentScreen}
          setWizardModel={setWizardModel}
          handleClose={handleClose}
        />
      </>
    );
  };

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    let newDataObject = { ...wizardModel };
    newDataObject.setData("fromFileUpload", tabSelection === "automatic");
    setWizardModel({ ...newDataObject });
    setActiveTab(tabSelection);
  };

  const getView = () => {
    switch (activeTab) {
      case "manual":
        return getBody();;
      case "automatic":
        return getFileUploadBody();
    }
  };

  const getTabContainer = () => {
    return (
      <div>
        <div className={"mt-2"}>
          Would you like to start a manual {mergeSyncType} wizard run or use the XML/File Upload Process?
        </div>
        <div className={"mt-2"}>
          <CustomTabContainer>
            <CustomTab
              activeTab={activeTab}
              tabText={`Manual ${mergeSyncType} Wizard Run`}
              handleTabClick={handleTabClick}
              tabName={"manual"}
              toolTipText={"Use Salesforce Component Selection Deployment"}
              icon={faSalesforce}
            />
            <CustomTab
              activeTab={activeTab}
              tabText={"XML/File Upload Process"}
              handleTabClick={handleTabClick}
              tabName={"automatic"}
              toolTipText={"Deploy using an XML or CSV file"}
              icon={faFileCode}
              visible={(wizardModel?.getData("taskType") === "SFDC_GIT_COMPARE_SYNC") || (wizardModel?.getData("taskType") === "GIT_VS_GIT_SYNC" && wizardModel?.getData("isSalesforce"))}
            />
          </CustomTabContainer>
        </div>
      </div>
    );
  };

  const getMainView = () => {
    return (
      <div>
        <div className="h5">{mergeSyncType} Run: Initialization</div>
        {getTabContainer()}
        <div className="my-3">
          {getView()}
        </div>
      </div>
    );
  };

  return (
    <div>
      {getMainView()}
    </div>
  );
};

MergeSyncTaskWizardInitializationScreen.defaultProps = {
  skipConfig: false,
};

MergeSyncTaskWizardInitializationScreen.propTypes = {
  mergeSyncType: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  skipConfig: PropTypes.bool,
};

export default MergeSyncTaskWizardInitializationScreen;
