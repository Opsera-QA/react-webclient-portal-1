import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import RoleRestrictedJiraToolSelectInput
  from "components/common/list_of_values_input/tools/jira/RoleRestrictedJiraToolSelectInput";
import CreateJiraTicketProjectSelectInput from "./inputs/CreateJiraTicketProjectSelectInput";
import chartsActions from "../../charts/charts-actions";
import GitCustodianCreateJiraTicketMetaData
  from "components/insights/gitCustodian/modal/gitCustodianCreateJiraTicketMetaData";
import useComponentStateReference from "hooks/useComponentStateReference";
import modelHelpers from "components/common/model/modelHelpers";
import GitCustodianSelectedIssuesTable from "components/insights/gitCustodian/modal/GitCustodianSelectedIssuesTable";

function GitCustodianNewJiraTicketEditorPanel({
  handleClose,
  selectedIssues,
  setSelectedIssues
}) {
  const [createJiraTicketDataModel, setCreateJiraTicketDataModel] = useState(undefined);
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
      setCreateJiraTicketDataModel(undefined);
      return;
    }

    const newModel = modelHelpers.parseObjectIntoModel(undefined, GitCustodianCreateJiraTicketMetaData);
    const issueIds = !selectedIssues ? [] : selectedIssues.map(({ issueId }) => issueId);


    newModel.setData('issuesList', [...selectedIssues]);
    newModel.setData("issues", issueIds);

    // TODO: Determine what this is doing and rewrite
    newModel.setData("description", !selectedIssues ? "" : selectedIssues.reduce((pv, cv) => pv + `Repository: ${cv.repository}; Path: ${cv.path}; Line Number: ${cv.lineNumber?.key}\n`, ""));
    newModel.setData("summary", `Opsera Git custodian - Compliance issue - total number of issues #${issueIds.length}`);
    setCreateJiraTicketDataModel({ ...newModel });
  };

  const createNewJiraTicket = async () => {    
    const response = await chartsActions.createGitCustodianJiraTicket(getAccessToken, cancelTokenSource, createJiraTicketDataModel.getPersistData());
    setSelectedIssues([]);
    handleClose();
    return response;
  };

  if (createJiraTicketDataModel == null) {
    return null;
  }

  return (
    <EditorPanelContainer
      recordDto={createJiraTicketDataModel}
      handleClose={handleClose}
      setRecordDto={setCreateJiraTicketDataModel}
      createRecord={createNewJiraTicket}
      updateRecord={createNewJiraTicket}
      addAnotherOption={false}
      disable={createJiraTicketDataModel?.isModelValid() !== true}
    >
      <div className={"px-2"}>
        <Row>
          <Col md={12}>
            <RoleRestrictedJiraToolSelectInput
              fieldName={"jiraToolId"}
              model={createJiraTicketDataModel}
              setModel={setCreateJiraTicketDataModel}  
            />
          </Col>
          <Col md={12}>
            <CreateJiraTicketProjectSelectInput
              jiraToolId={createJiraTicketDataModel.getData("jiraToolId")}
              model={createJiraTicketDataModel}
              setModel={setCreateJiraTicketDataModel}
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

GitCustodianNewJiraTicketEditorPanel.propTypes = {
  handleClose: PropTypes.func,
  selectedIssues: PropTypes.array,
  setSelectedIssues: PropTypes.func
};

export default GitCustodianNewJiraTicketEditorPanel;
