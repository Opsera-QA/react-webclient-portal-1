import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import chartsActions from "../../charts/charts-actions";
import gitCustodianUpdateStatusMetaData from "./gitCustodianUpdateStatusMetaData";
import useComponentStateReference from "hooks/useComponentStateReference";
import modelHelpers from "components/common/model/modelHelpers";
import GitCustodianSelectedIssuesTable from "components/insights/gitCustodian/modal/GitCustodianSelectedIssuesTable";
import GitCustodianStatusSelectInput from "./inputs/GitCustodianStatusSelectInput";

function GitCustodianUpdateStatusEditorPanel({
  handleClose,
  selectedIssues,
  setSelectedIssues
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
    }, gitCustodianUpdateStatusMetaData);

    setDataModel({ ...newModel });
  };

  const updateStatus = async () => {    
    const response = await chartsActions.updateGitCustodianVulnerabilityStatus(getAccessToken, cancelTokenSource, dataModel.getPersistData());
    setSelectedIssues([]);
    handleClose();
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
      createRecord={updateStatus}
      updateRecord={updateStatus}
      addAnotherOption={false}
      disable={dataModel?.isModelValid() !== true}
    >
      <div className={"px-2"}>
        <Row>
          <Col md={12}>
            <GitCustodianStatusSelectInput 
              model={dataModel}
              setModel={setDataModel}
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

GitCustodianUpdateStatusEditorPanel.propTypes = {
  handleClose: PropTypes.func,
  selectedIssues: PropTypes.array,
  setSelectedIssues: PropTypes.func
};

export default GitCustodianUpdateStatusEditorPanel;
