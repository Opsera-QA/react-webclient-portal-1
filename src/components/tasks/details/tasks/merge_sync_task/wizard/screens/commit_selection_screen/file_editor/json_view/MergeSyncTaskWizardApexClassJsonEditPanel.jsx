import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ApexClassProfleEditorView from "./apex_class/ApexClassProfleEditorView";
import { DividerWithCenteredText } from "../../../../../../../../../../temp-library-components/divider/DividerWithCenteredText";

const MergeSyncTaskWizardApexClassJsonEditPanel = ({
  wizardModel,
  comparisonFileModel,
  setComparisonFileModel,
  modifiedApexClassJson,
  originalApexClassJson,
  isLoading,
}) => {
  const newModifiedData = [
    {
      apexClass: "newcreatePartnerLibraryTest",
      enabled: "false",
    },
    {
      apexClass: "newcreatePartnerLibraryTest",
      enabled: "false",
    },
    {
      apexClass: "newcreatePartnerLibraryTest",
      enabled: "false",
    },
    {
      apexClass: "newcreatePartnerLibraryTest",
      enabled: "false",
    },
    {
      apexClass: "newcreatePartnerLibraryTest",
      enabled: "false",
    },
    {
      apexClass: "newcreatePartnerLibraryTest",
      enabled: "false",
    },
    {
      apexClass: "newcreatePartnerLibraryTest",
      enabled: "false",
    },
  ];

  if (isLoading) {
    return (
      <LoadingDialog
        size={"sm"}
        message={"Loading"}
      />
    );
  }

  const modifiedApexClassEditView = () => {
    return (
      <Col>
        {newModifiedData &&
          newModifiedData.map((apexclass, idx) => (
            <>
              <ApexClassProfleEditorView
                wizardModel={wizardModel}
                comparisonFileModel={comparisonFileModel}
                setComparisonFileModel={setComparisonFileModel}
                apexClassData={apexclass}
                isLoading={isLoading}
              />
              <DividerWithCenteredText className={"m-4"} />
            </>
          ))}
      </Col>
    );
  };

  const originalApexClassEditView = () => {
    return (
      <Col>
        {newModifiedData &&
          newModifiedData.map((apexclass, idx) => (
            <>
              <ApexClassProfleEditorView
                wizardModel={wizardModel}
                comparisonFileModel={comparisonFileModel}
                setComparisonFileModel={setComparisonFileModel}
                apexClassData={apexclass}
                isLoading={isLoading}
              />
              <DividerWithCenteredText className={"m-4"} />
            </>
          ))}
      </Col>
    );
  };
  return (
    <div className={"m-2"}>
      <Row>
        {originalApexClassEditView()}
        {modifiedApexClassEditView()}
      </Row>
    </div>
  );
};

MergeSyncTaskWizardApexClassJsonEditPanel.propTypes = {
  wizardModel: PropTypes.object,
  comparisonFileModel: PropTypes.object,
  setComparisonFileModel: PropTypes.func,
  isLoading: PropTypes.bool,
  modifiedApexClassJson: PropTypes.array,
  originalApexClassJson: PropTypes.array,
};

export default MergeSyncTaskWizardApexClassJsonEditPanel;
