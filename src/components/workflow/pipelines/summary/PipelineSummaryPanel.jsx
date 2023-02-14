import React, {useContext, useState, useEffect} from "react";
import PropTypes from "prop-types";
import { Row, Col, Form } from "react-bootstrap";
import {
  faPencilAlt,
  faSave, faTag,
  faTimes,
} from "@fortawesome/pro-light-svg-icons";
import Model from "core/data_model/model";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import { AuthContext } from "contexts/AuthContext";
import InformationDialog from "components/common/status_notifications/info";
import PipelineActionControls from "components/workflow/pipelines/action_controls/PipelineActionControls";
import PipelineSummaryActionBar from "components/workflow/pipelines/summary/action_bar/PipelineSummaryActionBar";
import EditTagModal from "components/workflow/EditTagModal";
import pipelineActions from "components/workflow/pipeline-actions";
import CustomBadgeContainer from "components/common/badges/CustomBadgeContainer";
import CustomBadge from "components/common/badges/CustomBadge";
import StandaloneSelectInput from "components/common/inputs/select/StandaloneSelectInput";
import {
  getPipelineTypeLabel,
  PIPELINE_TYPE_SELECT_OPTIONS
} from "components/common/list_of_values_input/pipelines/types/pipeline.types";
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
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";
import PipelineNameTextInput from "components/workflow/pipelines/summary/inputs/PipelineNameTextInput";
import PipelineTypeSelectInput from "components/workflow/pipelines/summary/inputs/type/PipelineTypeSelectInput";

const INITIAL_FORM_DATA = {
  name: "",
  project: { name: "", project_id: "" },
  description: "",
  type: [],
};

// TODO: This class needs to be reworked with new components and also to cleanup
function PipelineSummaryPanel(
  {
    pipeline,
    parentWorkflowStatus,
    fetchPlan,
    setPipeline,
    showActionControls,
    isLoading,
    isQueued,
    runCount,
  }) {
  const contextType = useContext(AuthContext);
  const [editDescription, setEditDescription] = useState(false);
  const [editTags, setEditTags] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [pipelineModel, setPipelineModel] = useState(new Model(pipeline, pipelineMetadata, false));
  const {
    userData,
    cancelTokenSource,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {}, [pipeline, parentWorkflowStatus]);

  const handleSavePropertyClick = async (pipelineId, value, type) => {
    if (Object.keys(value).length > 0 && type.length > 0) {
      const { getAccessToken } = contextType;
      let postBody = {};

      switch (type) {
        case "description":
          pipeline.description = value.description;
          postBody = {
            "description": value.description,
          };
          setEditDescription(false);
          break;
        case "tags":
          pipeline.tags = value;
          postBody = {
            "tags": pipeline.tags,
          };
          setEditTags(false);
          break;
      }

      setPipelineModel(new Model({ ...pipeline }, pipelineMetadata, false));

      if (Object.keys(postBody).length > 0) {
        try {
          await pipelineActions.updatePipelineV2(
            getAccessToken,
            cancelTokenSource,
            pipelineId,
            pipeline,
          );
          setFormData(INITIAL_FORM_DATA);
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
      case "description":
        setEditDescription(true);
        setFormData({ ...formData, description: pipeline.description });
        break;
      case "tags":
        setEditTags(true);
        break;
    }
  };

  const getSaveIcon = (field) => {
    return (
      <IconBase
        icon={faSave}
        className={"text-muted pointer"}
        iconSize={"sm"}
        onClickFunction={() => {
          handleSavePropertyClick(pipeline._id, formData, field);
        }} />
    );
  };

  const getEditIcon = (field) => {
    return (
      <IconBase
        icon={faPencilAlt}
        className={"ml-2 text-muted pointer"}
        iconTransformProperties={"shrink-5"}
        onClickFunction={() => {
          handleEditPropertyClick(field);
        }} />
    );
  };

  const getCancelIcon = (cancelFunction) => {
    return (
      <IconBase
        icon={faTimes}
        className={"text-muted ml-3 pointer"}
        iconSize={"sm"}
        onClickFunction={() => {
          cancelFunction(false);
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
        <EditTagModal data={pipeline.tags} visible={editTags} onHide={() => {
          setEditTags(false);
        }} onClick={(tags) => {
          handleSavePropertyClick(pipeline._id, tags, "tags");
        }} />}

        </div>
      </Col>
    );
  };

  const getSchedulerField = () => {
    const pipelineTypes = pipeline?.type;
    // TODO: Move canEditPipelineSchedule inside field. Left it out for now.
    if (!Array.isArray(pipelineTypes) || (!pipelineTypes.includes("informatica") && !pipelineTypes.includes("sfdc"))) {
      return (
        <Col xs={12} sm={6}>
          <PipelineSchedulerField
            pipelineModel={pipelineModel}
            updatedAt={pipelineModel?.getData("updatedAt")}
            canEditPipelineSchedule={PipelineRoleHelper.canEditPipelineAttributes(userData, pipeline) && parentWorkflowStatus !== "running"}
          />
        </Col>
      );
    }
  };

  const getPipelineActionControls = () => {
    if (showActionControls !== false) {
      return (
        <div className={"text-right py-2 pr-2"}>
          <PipelineActionControls
            pipeline={pipeline}
            disabledActionState={false}
            fetchData={fetchPlan}
            setPipeline={setPipeline}
            isLoading={isLoading}
            isQueued={isQueued}
            workflowStatus={parentWorkflowStatus}
            runCount={runCount}
          />
        </div>
      );
    }
  };

  // const getPipelineTypeField = () => {
  //   return (
      // <div className={"my-2"}>
      //   <span className="text-muted mr-2">Type:</span>
      //   {pipeline?.type && !editType && getPipelineTypeLabel(pipeline?.type[0])}
      //   {PipelineRoleHelper.canEditPipelineAttributes(userData, pipeline)
      //   && parentWorkflowStatus !== "running" && !editType
      //     ? getEditIcon("type")
      //     : null}
      //   {editType &&
      //     <div className="d-flex mt-1">
      //       <div className="w-75">
      //         <StandaloneSelectInput
      //           selectOptions={PIPELINE_TYPE_SELECT_OPTIONS}
      //           defaultValue={pipeline?.type[0]}
      //           valueField={"value"}
      //           textField={"text"}
      //           setDataFunction={e => {
      //             let type = formData.type;
      //             type[0] = e.value;
      //             setFormData({ ...formData, type: type });
      //           }}
      //         />
      //       </div>
      //       <div className="px-2 pt-1">
      //         {getSaveIcon("type")}
      //         {getCancelIcon(setEditType)}
      //       </div>
      //     </div>
      //   }
      // </div>
    // );
  // };

  const getDescriptionField = () => {
    if (editDescription === true) {
      return (
        <>
          <Col xs={11}>
            <Form.Control maxLength="2000" as="textarea" type="text" placeholder=""
                          value={formData.description || ""}
                          onChange={e => setFormData({ ...formData, description: e.target.value })} /></Col>
          <Col xs={1} className="my-auto">
            {getSaveIcon("description")}
            {getCancelIcon(setEditDescription)}
          </Col>
        </>
      );
    }

    return (
      <>
        <Col sm={12} className="py-2">
          <span className="text-muted mr-1">Notes:</span>{pipeline.description}
          {PipelineRoleHelper.canEditPipelineAttributes(userData, pipeline)
          && parentWorkflowStatus !== "running"
            ? getEditIcon("description")
            : null}
        </Col>
      </>
    );
  };

  const getPipelineSummaryField = () => {
    const completed = DataParsingHelper.parseNestedDate(pipeline, "workflow.last_run.completed");

    if (completed) {
      const status = DataParsingHelper.parseNestedString(pipeline, "workflow.last_run.status");

      return (
        <Col sm={12} className="py-2">
          <span className="text-muted mr-1">Summary:</span>
          Last complete run of pipeline finished on {
          DateFormatHelper.formatDateAsTimestampWithoutSeconds(new Date(completed))} with a status
          of {status}.
        </Col>
      );
    }
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
      {getPipelineActionControls()}

      <div className="pr-1">
        <Row>
          <Col sm={9}>
            <PipelineNameTextInput
              pipelineModel={pipelineModel}
              setPipelineModel={setPipelineModel}
              workflowStatus={parentWorkflowStatus}
            />
          </Col>
          <Col sm={3}>
            <PipelineSummaryActionBar
              pipeline={pipeline}
              pipelineModel={pipelineModel}
              loadPipeline={fetchPlan}
            />
          </Col>
          <Col xs={12} sm={6}>
            <OwnerNameField
              model={pipelineModel}
            />
          </Col>
          <Col sm={12} md={6}>
            <SmartIdField
              model={pipelineModel}
            />
          </Col>
          <Col xs={12}>
            <PipelineRoleAccessInput
              loadData={fetchPlan}
              pipelineModel={pipelineModel}
              setPipelineModel={setPipelineModel}
              disabled={parentWorkflowStatus === "running"}
            />
          </Col>
          <Col sm={12} md={6}>
            <TextFieldBase
              dataObject={pipelineModel}
              fieldName={"workflow.run_count"}
            />
          </Col>
          <Col xs={12} sm={6}>
            <DateTimeField
              fieldName={"createdAt"}
              dataObject={pipelineModel}
            />
          </Col>
          <Col xs={12} sm={6}>
            <TextFieldBase
              dataObject={pipelineModel}
              fieldName={"organizationName"}
              className={"my-2 upper-case-first"}
            />
          </Col>
          <Col sm={6}>
            <TextFieldBase
              dataObject={pipelineModel}
              fieldName={"account"}
            />
          </Col>
          <Col xs={12} sm={6}>
            <PipelineTypeSelectInput
              pipelineModel={pipelineModel}
              setPipelineModel={setPipelineModel}
              workflowStatus={parentWorkflowStatus}
            />
          </Col>
          {getSchedulerField()}
          {getTagField()}

          {getDescriptionField()}
          {getPipelineSummaryField()}

          <Col sm={12}>
            <PipelineDurationMetricsStandaloneField
              pipelineId={pipeline?._id}
              pipelineRunCount={pipeline?.workflow?.run_count}
            />
          </Col>
        </Row>
      </div>
    </>
  );
}

PipelineSummaryPanel.propTypes = {
  pipeline: PropTypes.object,
  parentWorkflowStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  fetchPlan: PropTypes.func,
  setPipeline: PropTypes.func,
  showActionControls: PropTypes.bool,
  isLoading: PropTypes.bool,
  isQueued: PropTypes.bool,
  runCount: PropTypes.number,
};

export default PipelineSummaryPanel;