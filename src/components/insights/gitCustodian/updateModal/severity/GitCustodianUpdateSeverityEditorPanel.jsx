import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import chartsActions from "components/insights/charts/charts-actions";
import gitCustodianUpdateSeverityMetaData from "./gitCustodianUpdateSeverityMetaData";
import useComponentStateReference from "hooks/useComponentStateReference";
import modelHelpers from "components/common/model/modelHelpers";
import GitCustodianSelectedIssuesTable from "components/insights/gitCustodian/modal/GitCustodianSelectedIssuesTable";
import GitCustodianSeveritySelectInput from "./inputs/GitCustodianSeveritySelectInput";
import TextAreaInputBase from "components/common/inputs/text/text_area/TextAreaInputBase";

function GitCustodianUpdateSeverityEditorPanel({
  handleClose,
  selectedIssues,
  setSelectedIssues,
  loadData,
}) {
  const [dataModel, setDataModel] = useState(undefined);
  const {
    isMounted,
    cancelTokenSource,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    unpackIssues();
  }, [selectedIssues]);

  const unpackIssues = () => {
    if (!Array.isArray(selectedIssues) || selectedIssues.length === 0) {
      setDataModel(undefined);
      return;
    }
    const issueIds = !selectedIssues ? [] : selectedIssues.map(({ issueId }) => issueId);

    const newModel = modelHelpers.parseObjectIntoModel({
      issuesList: [...selectedIssues],
      issues: issueIds,
    }, gitCustodianUpdateSeverityMetaData);

    setDataModel({ ...newModel });
  };

  const updateSeverity = async () => {
    const response = await chartsActions.updateGitCustodianVulnerabilitySeverity(getAccessToken, cancelTokenSource, dataModel.getPersistData());
    setSelectedIssues([]);
    handleClose();
    loadData();
    return response;
  };

  if (dataModel == null) {
    return null;
  }

  return (
    <EditorPanelContainer
      recordDto={dataModel}
      handleClose={handleClose}
      setRecordDto={setDataModel}
      createRecord={updateSeverity}
      updateRecord={updateSeverity}
      addAnotherOption={false}
      disable={dataModel?.isModelValid() !== true}
    >
      <div className={"px-2"}>
        <Row>
          <Col md={12}>
            <GitCustodianSeveritySelectInput
              model={dataModel}
              setModel={setDataModel}
            />
          </Col>
          <Col md={12}>
            <TextAreaInputBase
              fieldName={"comment"}
              model={dataModel}
              setModel={setDataModel}
              useInfoContainer={false}
            />
          </Col>
          <Col md={12}>
            <GitCustodianSelectedIssuesTable
              selectedIssues={selectedIssues}
            />
          </Col>
        </Row>
      </div>
    </EditorPanelContainer>
  );
}

GitCustodianUpdateSeverityEditorPanel.propTypes = {
  handleClose: PropTypes.func,
  selectedIssues: PropTypes.array,
  setSelectedIssues: PropTypes.func,
  loadData: PropTypes.func,
};

export default GitCustodianUpdateSeverityEditorPanel;
