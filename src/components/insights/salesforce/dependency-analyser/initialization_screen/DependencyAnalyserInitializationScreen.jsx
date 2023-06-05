import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";import LoadingDialog from "components/common/status_notifications/loading";
import { format } from "date-fns";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import { Button } from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import {
  faFileCode,
  faStepForward,
  faSync,
} from "@fortawesome/pro-light-svg-icons";
import { parseDate } from "utils/helpers";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import SfdcPipelineWizardFileUploadComponent from "components/workflow/wizards/sfdc_pipeline_wizard/csv_file_upload/SfdcPipelineWizardFileUploadComponent";
import { parseError } from "components/common/helpers/error-helpers";
import useComponentStateReference from "../../../../../hooks/useComponentStateReference";
import RoleRestrictedSalesforceConfiguratorToolSelectInput from "../../../../common/list_of_values_input/tools/salesforce/sfdc-configurator/RoleRestrictedSalesforceConfiguratorToolSelectInput";
import sfdcDependencyAnalyserActions from "../sfdc-dependency-analyser-actions";
import { DEPENDENCY_ANALYSER_SCREENS } from "../DependencyAnalyser";
const DataParsingHelper = require("@opsera/persephone/helpers/data/dataParsing.helper");

const DependencyAnalyserInitializationScreen = ({
  pipelineWizardModel,
  setPipelineWizardModel,
  setPipelineWizardScreen,
  setError,
}) => {
  const [activeTab, setActiveTab] = useState("manual");
  const [isLoading, setIsLoading] = useState(false);
  const [creatingNewRecord, setCreatingNewRecord] = useState(false);
  const [existingRecord, setExistingRecord] = useState(undefined);

  const { isMounted, cancelTokenSource, toastContext, getAccessToken } =
    useComponentStateReference();

  console.log(pipelineWizardModel?.getPersistData());
  const createNewPipelineWizardRecord = async (
    newPipelineWizardModel = pipelineWizardModel,
  ) => {
    try {

      const response = await sfdcDependencyAnalyserActions.createNewRecord(getAccessToken, cancelTokenSource, newPipelineWizardModel);
      const newRecord = response?.data;
      if (newRecord) {
        console.log(newRecord);
        newPipelineWizardModel?.setData("recordId", newRecord._id);
        setPipelineWizardModel({...newPipelineWizardModel});
      }

        setPipelineWizardScreen(DEPENDENCY_ANALYSER_SCREENS.COMPONENT_SELECTOR);
    } catch (error) {
      console.error(error);
      setError("Could not create new Salesforce Pipeline Wizard record");
    } finally {
      if (isMounted?.current === true) {
        setCreatingNewRecord(false);
      }
    }
  };

  const getBody = () => {
    if (isLoading || pipelineWizardModel == null) {
      return (
        <LoadingDialog
          message={`Initializing a new instance`}
          size={"sm"}
        />
      );
    }

    return (
      <div>
        <div>
          <RoleRestrictedSalesforceConfiguratorToolSelectInput
            fieldName={"sfdcToolId"}
            model={pipelineWizardModel}
            setModel={setPipelineWizardModel}
          />
        </div>

        <SaveButtonContainer>
          <Button
            className={"mr-2"}
            size={"sm"}
            variant="primary"
            disabled={isLoading || pipelineWizardModel?.getData("sfdcToolId")?.length < 1}
            onClick={() => createNewPipelineWizardRecord(pipelineWizardModel)}
          >
            <span>
              <IconBase
                icon={faSync}
                fixedWidth
                className="mr-2"
              />
              Start A New Instance
            </span>
          </Button>
        </SaveButtonContainer>
      </div>
    );
  };

  const handleTabClick = (tabSelection) => (e) => {
    e.preventDefault();
    let newDataObject = { ...pipelineWizardModel };
    newDataObject.setData("fromFileUpload", tabSelection === "automatic");
    setPipelineWizardModel({ ...newDataObject });
    setActiveTab(tabSelection);
  };

  const getTabContainer = () => {
    return (
      <div>
        <div className={"mt-2"}>
          Would you like to start a manual dependency fetch or use the XML/File
          Upload Process?
        </div>
        <div className={"mt-2"}>
          <CustomTabContainer>
            <CustomTab
              activeTab={activeTab}
              tabText={`Manual Selection`}
              handleTabClick={handleTabClick}
              tabName={"manual"}
              toolTipText={
                "Use Salesforce Component Selection to get dependencies"
              }
              icon={faSalesforce}
            />
            <CustomTab
              activeTab={activeTab}
              tabText={"XML/File Upload Process"}
              handleTabClick={handleTabClick}
              tabName={"automatic"}
              toolTipText={"Fetch Dependency using an XML or CSV file"}
              icon={faFileCode}
            />
          </CustomTabContainer>
        </div>
      </div>
    );
  };

  const getFileUploadBody = () => {
    return (
      <div>
        <SfdcPipelineWizardFileUploadComponent
          pipelineWizardModel={pipelineWizardModel}
          setPipelineWizardScreen={setPipelineWizardScreen}
          setPipelineWizardModel={setPipelineWizardModel}
        />
      </div>
    );
  };

  const getView = () => {
    switch (activeTab) {
      case "manual":
        return getBody();
      case "automatic":
        return getFileUploadBody();
    }
  };

  const getMainView = () => {
    if (creatingNewRecord) {
      return (
        <LoadingDialog
          message={`Starting a new Salesforce Dependency Analyser Instance`}
          size={"sm"}
        />
      );
    }

    return (
      <div>
        <div className="h5">Salesforce Dependency Analyser: Initialization</div>
        {getTabContainer()}
        <div className="my-3">{getView()}</div>
      </div>
    );
  };

  return <div>{getMainView()}</div>;
};

DependencyAnalyserInitializationScreen.propTypes = {
  setPipelineWizardScreen: PropTypes.func,
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  pipeline: PropTypes.object,
  gitTaskData: PropTypes.object,
  setError: PropTypes.func,
};

export default DependencyAnalyserInitializationScreen;
