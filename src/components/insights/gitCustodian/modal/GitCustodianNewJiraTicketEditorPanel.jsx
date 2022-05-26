import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import { AuthContext } from "contexts/AuthContext";
import { Col, Row } from "react-bootstrap";
import IssuesSelectionView from "./IssuesSelectionView";
import EditorPanelContainer from "components/common/panels/detail_panel_container/EditorPanelContainer";
import GitCustodianCreateJiraTicketMetaData from "./gitCustodianCreateJiraTicketMetaData";
import axios from "axios";
import TextAreaInput from "../../../common/inputs/text/TextAreaInput";
import RoleRestrictedJiraToolSelectInput
  from "components/common/list_of_values_input/tools/jira/RoleRestrictedJiraToolSelectInput";
import CreateJiraTicketProjectSelectInput from "./inputs/CreateJiraTicketProjectSelectInput";
import chartsActions from "../../charts/charts-actions";


function GitCustodianNewJiraTicketEditorPanel({ handleClose, gitCustodianData }) {
  const { getAccessToken } = useContext(AuthContext);  
  const [createJiraTicketDataModel, setCreateJiraTicketDataModel] = useState(new Model({ ...GitCustodianCreateJiraTicketMetaData.newObjectFields }, GitCustodianCreateJiraTicketMetaData, false));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [issuesData, setIssuesData] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const createNewJiraTicket = async () => {
    console.log({createJiraTicketDataModel});
    const response = await chartsActions.createGitCustodianJiraTicket(getAccessToken, cancelTokenSource, createJiraTicketDataModel.getPersistData());
    console.log({response});
  };

  return (
    <EditorPanelContainer
      recordDto={createJiraTicketDataModel}
      handleClose={handleClose}
      setRecordDto={setCreateJiraTicketDataModel}
      createRecord={createNewJiraTicket}
      updateRecord={createNewJiraTicket}
      addAnotherOption={false}
    >
      <div className={"px-2"}>
        <Row>
          <Col md={12}>
            <RoleRestrictedJiraToolSelectInput
              fieldName={"jiraToolId"}
              model={createJiraTicketDataModel}
              setModel={setCreateJiraTicketDataModel}
            // setDataFunction={setDataFunction}              
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
            <TextAreaInput
              fieldName={"description"}
              dataObject={createJiraTicketDataModel}
              setDataObject={setCreateJiraTicketDataModel}
            />
          </Col>
          <Col md={12}>
            <TextAreaInput
              fieldName={"summary"}
              dataObject={createJiraTicketDataModel}
              setDataObject={setCreateJiraTicketDataModel}
            />
          </Col>
          <Col md={12}>
            <IssuesSelectionView 
              model={createJiraTicketDataModel}
              setModel={setCreateJiraTicketDataModel}
              gitCustodianData={gitCustodianData}
            />
          </Col>          
        </Row>
      </div>
    </EditorPanelContainer>
  );
}

GitCustodianNewJiraTicketEditorPanel.propTypes = {
  handleClose: PropTypes.func,
  gitCustodianData: PropTypes.object,
};

export default GitCustodianNewJiraTicketEditorPanel;
