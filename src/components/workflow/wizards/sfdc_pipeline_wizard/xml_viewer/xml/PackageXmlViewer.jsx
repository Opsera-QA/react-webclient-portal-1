import React from 'react';
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import PackageXmlFieldBase from "components/common/fields/code/PackageXmlFieldBase";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import SalesforcePackageVersionSelectionInput from "./SalesforcePackageVersionSelectionInput";

const PackageXmlViewer = ({isSaving, isLoading, pipelineWizardModel, setPipelineWizardModel}) => {
  const getPipelineOrTaskText = () => pipelineWizardModel.getData('fromGitTasks') ? 'Task' : 'Pipeline';

  const getFormattedPackageXml = () => {
    const xml = pipelineWizardModel?.getData("xml");

    if (typeof xml === "string" && xml.length > 0) {
      return (
        <PackageXmlFieldBase fieldName={"xml"} model={pipelineWizardModel} isLoading={isLoading} />
      );
    }
  };

  const getFormattedDestructiveXml = () => {
    const destructiveXml = pipelineWizardModel?.getData("destructiveXml");

    if (typeof destructiveXml === "string" && destructiveXml.length > 0) {
      return (
        <PackageXmlFieldBase fieldName={"destructiveXml"} model={pipelineWizardModel} isLoading={isLoading} />
      );
    }
  };

  const getBody = () => {
    if (isLoading === true) {
      return (
        <LoadingDialog size="sm" message={"Loading XML"} />
      );
    }

    if (isSaving === true) {
      return (
        <LoadingDialog size="sm" message={"Saving Data"} />
      );
    }

    return (
      <div className="d-flex">
        <div className={"w-50 mr-2"}>{getFormattedPackageXml()}</div>
        <div className={"w-50 ml-2"}>{getFormattedDestructiveXml()}</div>
      </div>
    );
  };

  return (
    <div className="flex-container-content mt-4">
      <div className="h5">Salesforce {getPipelineOrTaskText()} Run: XML Viewer</div>
      <div className="text-muted mb-2">Please confirm that you want to proceed with this operation.</div>
      {pipelineWizardModel.getData("fromGitTasks") === false &&
        <BooleanToggleInput
          dataObject={pipelineWizardModel}
          setDataObject={setPipelineWizardModel}
          fieldName={"ignoreWarning"}
          disabled={isSaving}
        />
      }
      <SalesforcePackageVersionSelectionInput
        pipelineWizardModel={pipelineWizardModel}
        setPipelineWizardModel={setPipelineWizardModel}
        fieldName={"apiVersion"}
        disabled={isSaving}
      />
      {getBody()}
    </div>
  );
};

PackageXmlViewer.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  isSaving: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default PackageXmlViewer;