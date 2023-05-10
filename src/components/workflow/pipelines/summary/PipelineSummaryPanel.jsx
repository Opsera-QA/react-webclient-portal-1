import React, {useContext, useState, useEffect} from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import InformationDialog from "components/common/status_notifications/info";
import PipelineDurationMetricsStandaloneField
  from "components/common/fields/pipelines/metrics/PipelineDurationMetricsStandaloneField";
import PipelineSchedulerField from "components/workflow/pipelines/summary/fields/PipelineSchedulerField";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineRoleAccessInput from "components/workflow/pipelines/summary/inputs/PipelineRoleAccessInput";
import SmartIdField from "components/common/fields/text/id/SmartIdField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateTimeField from "components/common/fields/date/DateTimeField";
import OwnerNameField from "components/common/fields/text/general/OwnerNameField";
import InlinePipelineTypeSelectInput from "components/workflow/pipelines/summary/inputs/type/InlinePipelineTypeSelectInput";
import PipelineOrchestrationSummaryField
  from "temp-library-components/fields/orchestration/pipeline/PipelineOrchestrationSummaryField";
import PipelineModel from "components/workflow/pipeline.model";
import PipelineDescriptionTextInput from "components/workflow/pipelines/summary/inputs/PipelineDescriptionTextInput";
import PipelineTagManagerInput from "components/workflow/pipelines/summary/inputs/PipelineTagManagerInput";

function PipelineSummaryPanel(
  {
    pipeline,
    parentWorkflowStatus,
    fetchPlan,
  }) {
  const [pipelineModel, setPipelineModel] = useState(new PipelineModel(pipeline, false));
  const {
    userData,
  } = useComponentStateReference();

  useEffect(() => {
    // if (pipeline) {
    //   if (pipelineModel) {
    //     pipelineModel?.replaceOriginalData(pipeline);
    //     setPipelineModel({...pipelineModel});
    //   } else {
    //     setPipelineModel({...new PipelineModel(pipeline, false)});
    //   }
    // }
  }, [pipeline]);

  if (pipeline == null || typeof pipeline !== "object" || Object.keys(pipeline).length === 0) {
    return (
      <InformationDialog
        message="No Pipeline details found.  Please ensure you have access to view the requested pipeline."
      />
    );
  }

  return (
    <>
      <div className={"mx-3 mb-3 mt-2"}>
        <Row>
          <PipelineRoleAccessInput
            loadData={fetchPlan}
            pipelineModel={pipelineModel}
            setPipelineModel={setPipelineModel}
            disabled={parentWorkflowStatus === "running"}
          />
          <Col sm={12} md={6}>
            <OwnerNameField
              model={pipelineModel}
            />
          </Col>
          <Col sm={12} md={6}>
            <SmartIdField
              model={pipelineModel}
            />
          </Col>
          <Col sm={12} md={6}>
            <TextFieldBase
              dataObject={pipelineModel}
              fieldName={"workflow.run_count"}
            />
          </Col>
          <Col sm={12} md={6}>
            <DateTimeField
              fieldName={"createdAt"}
              dataObject={pipelineModel}
            />
          </Col>
          <Col sm={12} md={6}>
            <TextFieldBase
              dataObject={pipelineModel}
              fieldName={"organizationName"}
              className={"my-2 upper-case-first"}
            />
          </Col>
          <Col sm={12} md={6}>
            <TextFieldBase
              dataObject={pipelineModel}
              fieldName={"account"}
            />
          </Col>
          <Col sm={12} md={6}>
            <InlinePipelineTypeSelectInput
              pipelineModel={pipelineModel}
              setPipelineModel={setPipelineModel}
              workflowStatus={parentWorkflowStatus}
            />
          </Col>
          <Col sm={12} md={6}>
            <PipelineSchedulerField
              pipelineModel={pipelineModel}
              updatedAt={pipelineModel?.getData("updatedAt")}
              canEditPipelineSchedule={PipelineRoleHelper.canEditPipelineAttributes(userData, pipeline) && parentWorkflowStatus !== "running"}
            />
          </Col>
          <Col xs={12}>
            <PipelineTagManagerInput
              pipelineModel={pipelineModel}
              setPipelineModel={setPipelineModel}
              workflowStatus={parentWorkflowStatus}
            />
          </Col>
          <Col xs={12}>
            <PipelineDescriptionTextInput
              pipelineModel={pipelineModel}
              setPipelineModel={setPipelineModel}
              workflowStatus={parentWorkflowStatus}
            />
          </Col>
          <Col sm={12}>
            <PipelineOrchestrationSummaryField
              pipelineModel={pipelineModel}
            />
          </Col>
          <Col sm={12}>
            <PipelineDurationMetricsStandaloneField
              pipelineId={pipelineModel?.getMongoDbId()}
              pipelineRunCount={pipelineModel?.getRunCount()}
            />
          </Col>
          {/*<Col sm={12}>*/}
          {/*  <PipelineOrchestrationProgressBarBase*/}
          {/*    pipelineModel={pipelineModel}*/}
          {/*    className={"mx-3"}*/}
          {/*  />*/}
          {/*</Col>*/}
        </Row>
      </div>
    </>
  );
}

PipelineSummaryPanel.propTypes = {
  pipeline: PropTypes.object,
  parentWorkflowStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  fetchPlan: PropTypes.func,
};

export default PipelineSummaryPanel;