import React, {useState}  from "react";
import PropTypes from "prop-types";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import {Row} from "react-bootstrap";
import SfdcComponentListInput
  from "components/workflow/wizards/sfdc_pipeline_wizard/component_selector/SfdcComponentListInput";
import Col from "react-bootstrap/Col";
import CancelButton from "components/common/buttons/CancelButton";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import SfdcPipelineWizardFileSelectionDateTimeRange
  from "components/workflow/wizards/sfdc_pipeline_wizard/component_selector/SfdcPipelineWizardFileSelectionDateTimeRange";
import SfdcPipelineWizardIncludedComponentTypesRadioInput
  from "components/workflow/wizards/sfdc_pipeline_wizard/component_selector/SfdcPipelineWizardIncludedComponentTypesRadioInput";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import SfdcPipelineWizardSubmitComponentTypesButton
  from "components/workflow/wizards/sfdc_pipeline_wizard/component_selector/SfdcPipelineWizardSubmitComponentTypesButton";
import SFDCFileUploadComponent from "components/workflow/wizards/sfdc_pipeline_wizard/csv_file_upload/SFDCFileUploadComponent";
import {
  faFileCode,
} from "@fortawesome/pro-light-svg-icons";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";

const SfdcPipelineWizardComponentSelector = ({ pipelineWizardModel, setPipelineWizardModel, setPipelineWizardScreen, handleClose }) => {
  const [activeTab, setActiveTab] = useState("component");
  
  if (pipelineWizardModel == null) {
    return null;
  }

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();    if (activeTab !== tabSelection) {
      setActiveTab(tabSelection);
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab activeTab={activeTab} tabText={"Component Selection Process"} handleTabClick={handleTabClick} tabName={"component"}
                   toolTipText={"SFDC Component Selection Deployment"} icon={faSalesforce}  />
        <CustomTab activeTab={activeTab} tabText={"XML/File Upload Process"} handleTabClick={handleTabClick} tabName={"file"}
                   toolTipText={"Deploy using XML or an Excel file"} icon={faFileCode}  />
      </CustomTabContainer>
    );
  };
  
  const getView = () => {
    if (activeTab === "component") {
      return getComponentsBody();
    }
    if (activeTab === "file") {
      return getFileDeploymentBody();
    }
  };
  
  const getComponentsBody = () => {
    return (
      <div>
        <Row className="my-3">
          <Col sm={12} lg={6}>
            <TextInputBase fieldName={"namespacePrefix"} setDataObject={setPipelineWizardModel} dataObject={pipelineWizardModel} />
          </Col>
          <Col sm={12} lg={6}>
            <SfdcPipelineWizardIncludedComponentTypesRadioInput
              pipelineWizardModel={pipelineWizardModel}
              setPipelineWizardModel={setPipelineWizardModel}
            />
          </Col>
        </Row>
        <SfdcComponentListInput
          pipelineWizardModel={pipelineWizardModel}
          setPipelineWizardModel={setPipelineWizardModel}
          selectedComponents={[...pipelineWizardModel.getArrayData("selectedComponentTypes")]}
        />
        <div className={"my-3"}>
          <SfdcPipelineWizardFileSelectionDateTimeRange
            pipelineWizardModel={pipelineWizardModel}
            setPipelineWizardModel={setPipelineWizardModel}
          />
        </div>
        <SaveButtonContainer>
          <SfdcPipelineWizardSubmitComponentTypesButton
            pipelineWizardModel={pipelineWizardModel}
            setPipelineWizardScreen={setPipelineWizardScreen}
          />
          <CancelButton className={"ml-2"} showUnsavedChangesMessage={false} cancelFunction={handleClose} size={"sm"} />
        </SaveButtonContainer>
      </div>
    );
  };

  const getFileDeploymentBody = () => {
    return (
      <div>
         <SFDCFileUploadComponent 
          pipelineWizardModel={pipelineWizardModel}
            setPipelineWizardScreen={setPipelineWizardScreen}
            setPipelineWizardModel={setPipelineWizardModel}
            handleClose={handleClose}
         />
      </div>
    );
  };

  return (
    <div>
      <div className="h5">SalesForce Pipeline Run: Component Type Selection</div>
      <div className="text-muted">Select which component types to include in this pipeline run.</div>
      <div className="mt-3">
        {getTabContainer()}
      </div>
        {getView()}
    </div>
  );

};

SfdcPipelineWizardComponentSelector.propTypes = {
  setPipelineWizardScreen: PropTypes.func,
  handleClose: PropTypes.func,
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func
};

export default SfdcPipelineWizardComponentSelector;
