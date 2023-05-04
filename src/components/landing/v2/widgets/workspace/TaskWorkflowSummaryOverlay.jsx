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
import TaskOrchestrationSummaryField
  from "temp-library-components/fields/orchestration/task/TaskOrchestrationSummaryField";
import TaskRunDurationMetricsStandaloneField
  from "temp-library-components/fields/orchestration/task/metrics/TaskRunDurationMetricsStandaloneField";

export default function TaskWorkflowSummaryOverlay({ taskModel }) {
  const toastContext = useContext(DialogToastContext);
  const history = useHistory();

  const handleViewDetailsButton = () => {
    history.push(taskModel?.getDetailViewLink());
    closePanel();
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (taskModel == null) {
    return null;
  }

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      titleText={taskModel?.getData("name")}
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
              dataObject={taskModel}
              fieldName={"run_count"}
            />
          </Col>
          <Col xs={6}>
            <TaskLastRunDateField
              taskModel={taskModel}
            />
          </Col>
          <Col xs={12}>
            <TextFieldBase
              dataObject={taskModel}
              fieldName={"description"}
            />
          </Col>
          <Col xs={12}>
            <TaskOrchestrationSummaryField
              taskModel={taskModel}
            />
          </Col>
          <Col xs={12}>
            <TaskRunDurationMetricsStandaloneField
              taskRunCount={taskModel?.getRunCount()}
              taskId={taskModel?.getMongoDbId()}
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

TaskWorkflowSummaryOverlay.propTypes = {
  taskModel: PropTypes.object,
};
