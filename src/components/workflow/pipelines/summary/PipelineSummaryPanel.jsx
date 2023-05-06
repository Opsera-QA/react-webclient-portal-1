import React, {useContext, useState, useEffect} from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import {
  faPencilAlt,
  faTag,
} from "@fortawesome/pro-light-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import InformationDialog from "components/common/status_notifications/info";
import pipelineActions from "components/workflow/pipeline-actions";
import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import CustomBadge from "components/common/badges/CustomBadge";
import PipelineDurationMetricsStandaloneField
  from "components/common/fields/pipelines/metrics/PipelineDurationMetricsStandaloneField";
import IconBase from "components/common/icons/IconBase";
import PipelineSchedulerField from "components/workflow/pipelines/summary/fields/PipelineSchedulerField";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";
import PipelineRoleAccessInput from "components/workflow/pipelines/summary/inputs/PipelineRoleAccessInput";
import SmartIdField from "components/common/fields/text/id/SmartIdField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateTimeField from "components/common/fields/date/DateTimeField";
import OwnerNameField from "components/common/fields/text/general/OwnerNameField";
import InlinePipelineTypeSelectInput from "components/workflow/pipelines/summary/inputs/type/InlinePipelineTypeSelectInput";
import {Divider} from "temp-library-components/divider/Divider";
import PipelineOrchestrationSummaryField
  from "temp-library-components/fields/orchestration/pipeline/PipelineOrchestrationSummaryField";
import PipelineOrchestrationProgressBarBase
  from "temp-library-components/fields/orchestration/progress/PipelineOrchestrationProgressBarBase";
import PipelineModel from "components/workflow/pipeline.model";
import PipelineDescriptionTextInput from "components/workflow/pipelines/summary/inputs/PipelineDescriptionTextInput";

// TODO: This class needs to be reworked with new components and also to cleanup
function PipelineSummaryPanel(
  {
    pipeline,
    parentWorkflowStatus,
    fetchPlan,
  }) {
  const contextType = useContext(AuthContext);
  const [editTags, setEditTags] = useState(false);
  const [pipelineModel, setPipelineModel] = useState(new PipelineModel(pipeline, false));
  const {
    userData,
    cancelTokenSource,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    // if (pipeline) {
    //   setPipelineModel({...new PipelineModel(pipeline, false)});
    // }
  }, [pipeline]);

  const handleSavePropertyClick = async (pipelineId, value, type) => {
    if (Object.keys(value).length > 0 && type.length > 0) {
      const { getAccessToken } = contextType;
      let postBody = {};

      switch (type) {
        case "tags":
          pipeline.tags = value;
          postBody = {
            "tags": pipeline.tags,
          };
          setEditTags(false);
          break;
      }

      setPipelineModel({...new PipelineModel(pipeline, false)});

      if (Object.keys(postBody).length > 0) {
        try {
          await pipelineActions.updatePipelineV2(
            getAccessToken,
            cancelTokenSource,
            pipelineId,
            pipeline,
          );
          toastContext.showUpdateSuccessResultDialog("Pipeline");
          await fetchPlan();
        } catch (error) {
          toastContext.showErrorDialog(error);
        }
      }
    }
  };

  const handleEditPropertyClick = (type) => {
    switch (type) {
      case "tags":
        setEditTags(true);
        break;
    }
  };

  const getEditIcon = (field) => {
    return (
      <IconBase
        icon={faPencilAlt}
        className={"ml-2 text-muted pointer"}
        iconSize={"sm"}
        onClickFunction={() => {
          handleEditPropertyClick(field);
        }} />
    );
  };

  const getTagField = () => {
    return (
      <Col xs={12} className={"d-flex"}>
        <div className={"text-muted my-2 mr-1"}>Tags:</div>
        <div className={"my-auto d-flex"}>


        {!editTags && pipeline.tags &&
        <CustomBadgeContainer>
          {pipeline.tags.map((item, idx) => {
            if (typeof item !== "string")
              return (
                <CustomBadge badgeText={<span><span className="mr-1">{item.type}:</span>{item.value}</span>}
                             icon={faTag}
                             key={idx}
                />
              );
          })}
        </CustomBadgeContainer>
        }
        <div className={"mt-1"}>
          {PipelineRoleHelper.canEditPipelineTags(userData, pipeline) && parentWorkflowStatus !== "running" && getEditIcon("tags")}
        </div>

        {editTags &&
        // <EditTagModal data={pipeline.tags} visible={editTags} onHide={() => {
        //   setEditTags(false);
        // }} onClick={(tags) => {
        //   handleSavePropertyClick(pipeline._id, tags, "tags");
        // }} />
          undefined
        }

        </div>
      </Col>
    );
  };

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
          <Col xs={12}>
            <PipelineRoleAccessInput
              loadData={fetchPlan}
              pipelineModel={pipelineModel}
              setPipelineModel={setPipelineModel}
              disabled={parentWorkflowStatus === "running"}
            />
          </Col>
          <div className={"d-flex my-1 mx-3 w-100"}>
            <Divider className={"w-100"} />
          </div>
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
          {getTagField()}

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