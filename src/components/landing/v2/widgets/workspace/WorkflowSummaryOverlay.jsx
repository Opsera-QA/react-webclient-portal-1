import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {DialogToastContext} from "contexts/DialogToastContext";
import {faDraftingCompass, faSearch} from "@fortawesome/pro-light-svg-icons";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import CloseButton from "components/common/buttons/CloseButton";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import {useHistory} from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import TaskLastRunDateField from "temp-library-components/fields/orchestration/date/TaskLastRunDateField";
import PipelineLastRunDateField from "temp-library-components/fields/orchestration/date/PipelineLastRunDateField";

// TODO: Should this be two separate panels?
export default function WorkflowSummaryOverlay({ workflowModel }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();

  const handleViewDetailsButton = () => {
    history.push(workflowModel?.getDetailViewLink());
    closePanel();
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  const getDateField = () => {
    if (workflowModel?.getType() === "Task") {
      return (
        <TaskLastRunDateField
          taskModel={workflowModel}
        />
      );
    }

    return (
      <PipelineLastRunDateField
        pipelineModel={workflowModel}
      />
    );
  };

  if (workflowModel == null) {
    return null;
  }

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      titleText={workflowModel?.getData("name")}
      titleIcon={faDraftingCompass}
      showToasts={true}
      showCloseButton={false}
      minimumHeight={"50vh"}
      maximumHeight={"50vh"}
    >
      <div className={"p-3"}>
        <Row>
          <Col xs={6}>
            <TextFieldBase
              dataObject={workflowModel}
              fieldName={"run_count"}
            />
          </Col>
          <Col xs={6}>
            {getDateField()}
          </Col>
          <Col xs={12}>
            <TextFieldBase
              dataObject={workflowModel}
              fieldName={"description"}
            />
          </Col>
        </Row>
        <ButtonContainerBase>
          <VanityButtonBase
            onClickFunction={handleViewDetailsButton}
            normalText={"View Details"}
            icon={faSearch}
          />
          <CloseButton
            className={"ml-2"}
            closeEditorCallback={closePanel}
          />
        </ButtonContainerBase>
      </div>
    </CenterOverlayContainer>
  );
}

WorkflowSummaryOverlay.propTypes = {
  workflowModel: PropTypes.object,
};
