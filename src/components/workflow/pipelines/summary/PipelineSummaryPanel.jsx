import React, {useContext, useState, useEffect,} from "react";
import PropTypes from "prop-types";
import { Row, Col, Form } from "react-bootstrap";
import { format } from "date-fns";
import {
  faPencilAlt,
  faSave, faTag,
  faTimes,
  faUser,
  faUserFriends,
} from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import EditPipelineRolesOverlay from "components/workflow/EditPipelineRolesOverlay";
import Model from "core/data_model/model";
import pipelineMetadata from "components/workflow/pipelines/pipeline_details/pipeline-metadata";
import workflowAuthorizedActions
  from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";
import InformationDialog from "components/common/status_notifications/info";
import PipelineActionControls from "components/workflow/pipelines/pipeline_details/PipelineActionControls";
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
import { hasStringValue } from "components/common/helpers/string-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";

const INITIAL_FORM_DATA = {
  name: "",
  project: { name: "", project_id: "" },
  description: "",
  type: [],
};

const getWorkflowStatus = (pipeline) => {
  const lastStep = pipeline?.workflow?.last_step;

  if (lastStep != null) {
    const status = lastStep?.status;

    if (status === "stopped" && lastStep?.running?.paused) {
      return "paused";
    } else if (hasStringValue(status)) {
      return status;
    }
  }

  return false;
};

// TODO: This class needs to be reworked with new components and also to cleanup
function PipelineSummaryPanel(
  {
    pipeline,
    ownerName,
    customerAccessRules,
    parentWorkflowStatus,
    fetchPlan,
    setWorkflowStatus,
    setPipeline,
    showActionControls,
  }) {
  const toastContext = useContext(DialogToastContext);
  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editTags, setEditTags] = useState(false);
  const [editRoles, setEditRoles] = useState(false);
  const [editType, setEditType] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [pipelineModel, setPipelineModel] = useState(new Model(pipeline, pipelineMetadata, false));
  const {
    isMounted,
    cancelTokenSource,
    getAccessToken,
    isOpseraAdministrator,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted.current === true) {
        // toastContext.showLoadingError(error);
      }
    });
  }, []);

  const authorizedAction = (action, owner) => {
    let objectRoles = pipeline?.roles;
    return workflowAuthorizedActions.workflowItems(customerAccessRules, action, owner, objectRoles);
  };

  const loadData = async () => {
    try {
      if (setWorkflowStatus) {
        setWorkflowStatus(getWorkflowStatus(pipeline));
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
  };

  const handleSavePropertyClick = async (pipelineId, value, type) => {
    if (Object.keys(value).length > 0 && type.length > 0) {
      let postBody = {};

      switch (type) {
        case "name":
          pipeline.name = value.name;
          postBody = {
            "name": value.name,
          };
          setEditTitle(false);
          break;
        case "project":
          pipeline.project.name = value.project.name;
          postBody = {
            "project": {
              "name": value.project.name,
              "project_id": "",
            },
          };
          break;
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
        case "type":
          pipeline.type = value.type;
          postBody = {
            "type": value.type,
          };
          setEditType(false);
          break;
        case "roles":

          pipeline.roles = [...value];
          postBody = {
            "roles": [...value],
          };
          setEditRoles(false);
          break;
      }

      setPipelineModel(new Model({ ...pipeline }, pipelineMetadata, false));

      if (Object.keys(postBody).length > 0) {
        try {
          await pipelineActions.updatePipeline(pipelineId, postBody, getAccessToken);
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
      case "name":
        setEditTitle(true);
        setFormData({ ...formData, name: pipeline.name });
        break;
      case "project":
        setFormData({
          ...formData,
          project: { name: pipeline.project !== undefined && pipeline.project.hasOwnProperty("name") ? pipeline.project.name : "" },
        });
        break;
      case "description":
        setEditDescription(true);
        setFormData({ ...formData, description: pipeline.description });
        break;
      case "tags":
        setEditTags(true);
        break;
      case "type":
        setEditType(true);
        break;
      case "roles":
        launchRolesEditOverlay();
        break;
      default:
        console.error("Missing value or type for edit field");
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
        iconSize={"xs"}
        iconTransformProperties={"shrink-6"}
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
      <Col xs={12} className="py-2 mr-2 d-flex"><span className="text-muted mr-1">Tags:</span>

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
        <div>
          {authorizedAction("edit_tags", pipeline.owner) && isOpseraAdministrator === true && parentWorkflowStatus !== "running" && getEditIcon("tags")}
        </div>

        {editTags &&
        <EditTagModal data={pipeline.tags} visible={editTags} onHide={() => {
          setEditTags(false);
        }} onClick={(tags) => {
          handleSavePropertyClick(pipeline._id, tags, "tags");
        }} />}

      </Col>
    );
  };

  // TODO: This can be removed once dto components are wired up
  const getRoleBadges = (roles) => {
    if (roles == null || roles.length === 0) {
      return <span>No Access Rules Applied</span>;
    }

    return (
      roles.map((item, i) => {
        const user = item["user"];
        const group = item["group"];

        if (user) {
          return (
            <span key={i} className="mx-1 mb-1 badge badge-light user-badge">
              <IconBase icon={faUser} className={"mr-1"} />{`${user}: ${item.role}`}
            </span>
          );
        }

        return (
          <span key={i} className="mx-1 mb-1 badge badge-light group-badge">
            <IconBase icon={faUserFriends} className={"mr-1"} />{`${group}: ${item.role}`}
          </span>
        );
      })
    );
  };

  const launchRolesEditOverlay = () => {
    const tempPipelineModel = new Model({...pipeline}, pipelineMetadata, false);

    if (authorizedAction("edit_access_roles", pipeline.owner) === true) {
      toastContext.showOverlayPanel(
        <EditPipelineRolesOverlay
          pipelineModel={tempPipelineModel}
          fieldName={"roles"}
          saveDataFunction={(roles) => handleSavePropertyClick(pipeline._id, roles, "roles")}
          loadData={fetchPlan}
        />
      );
    }
  };

  const getRoleAccessField = () => {
    return (
      <Col xs={12} className="py-2"><span className="text-muted mr-1">Access Rules:</span>

        {!editRoles && pipeline.roles &&
        <span className="item-field role-access">{getRoleBadges(pipeline.roles)}</span>}
        {authorizedAction("edit_access_roles", pipeline.owner) && parentWorkflowStatus !== "running" && getEditIcon("roles")}

        {editRoles &&
        <EditPipelineRolesOverlay setPipelineModel={setPipelineModel} pipelineModel={pipelineModel} data={pipeline.roles}
                                  visible={editRoles} onHide={() => {
          setEditRoles(false);
        }} onClick={(roles) => {
          handleSavePropertyClick(pipeline._id, roles, "roles");
        }} />}

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
            canEditPipelineSchedule={authorizedAction("edit_pipeline_attribute", pipeline?.owner) && parentWorkflowStatus !== "running"}
          />
        </Col>
      );
    }
  };

  const getPipelineActionControls = () => {
    if (showActionControls !== false) {
      return (
        <div className={"d-flex"}>
          <PipelineActionControls
            className={"ml-auto pb-2"}
            pipeline={pipeline}
            disabledActionState={false}
            customerAccessRules={customerAccessRules}
            fetchData={fetchPlan}
            setPipeline={setPipeline}
            setParentWorkflowStatus={setWorkflowStatus}
          />
        </div>
      );
    }
  };

  const getPipelineTitleField = () => {
    return (
      <div className="d-flex title-text-header-2 pb-2">
        {editTitle ?
          <>
            <div className="flex-fill p-2">
              <Form.Control maxLength="500" type="text" placeholder="" value={formData.name || ""}
                            onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
            <div className="flex-fill p-2">
              {getSaveIcon("name")}
              {getCancelIcon(setEditTitle)}
            </div>
          </>
          :
          <>{pipeline.name}
            {authorizedAction("edit_pipeline_name", pipeline.owner)
            && parentWorkflowStatus !== "running"
              ? getEditIcon("name")
              : null}
          </>
        }
      </div>
    );
  };

  const getPipelineIdField = () => {
    return (
      <span>
        <span className="text-muted mr-1">ID:</span>
        {pipeline._id}
      </span>
    );
  };

  const getPipelineRunCountField = () => {
    return (
      <span>
        <span className="text-muted mr-1">Pipeline Run Count:</span>
        {pipeline.workflow.run_count || "0"}
      </span>
    );
  };

  const getPipelineOwnerField = () => {
    return (
      <span>
        <span className="text-muted mr-1">Owner:</span>
        {ownerName}
      </span>
    );
  };

  const getCreatedAtField = () => {
    return (
      <span>
        <span className="text-muted mr-1">Created On:</span>
        {pipeline.createdAt && format(new Date(pipeline.createdAt), "yyyy-MM-dd', 'hh:mm a")}
      </span>
    );
  };

  const getOrganizationField = () => {
    return (
      <span>
        <span className="text-muted mr-1">Organization:</span>
        <span className="upper-case-first">{pipeline.organizationName}</span>
      </span>
    );
  };

  const getOrganizationAccountField = () => {
    return (
      <span>
        <span className="text-muted mr-1">Org Account:</span>
        {pipeline.account}
      </span>
    );
  };

  const getPipelineTypeField = () => {
    return (
      <span>
        <span className="text-muted mr-2">Type:</span>
        {pipeline?.type && !editType && getPipelineTypeLabel(pipeline?.type[0])}
        {authorizedAction("edit_pipeline_attribute", pipeline.owner) && isOpseraAdministrator === true
        && parentWorkflowStatus !== "running" && !editType
          ? getEditIcon("type")
          : null}
        {editType &&
          <div className="d-flex mt-1">
            <div className="w-75">
              <StandaloneSelectInput
                selectOptions={PIPELINE_TYPE_SELECT_OPTIONS}
                defaultValue={pipeline?.type[0]}
                valueField={"value"}
                textField={"text"}
                setDataFunction={e => {
                  let type = formData.type;
                  type[0] = e.value;
                  setFormData({ ...formData, type: type });
                }}
              />
            </div>
            <div className="px-2 pt-1">
              {getSaveIcon("type")}
              {getCancelIcon(setEditType)}
            </div>
          </div>
        }
      </span>
    );
  };

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
          {authorizedAction("edit_pipeline_attribute", pipeline.owner)
          && parentWorkflowStatus !== "running"
            ? getEditIcon("description")
            : null}
        </Col>
      </>
    );
  };

  const getPipelineSummaryField = () => {
    if (pipeline.workflow?.last_run?.completed) {
      return (
        <Col sm={12} className="py-2">
          <span className="text-muted mr-1">Summary:</span>
          Last complete run of pipeline finished on {
          format(new Date(pipeline.workflow.last_run.completed), "yyyy-MM-dd', 'hh:mm a")} with a status
          of {pipeline.workflow.last_run.status}.
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
            {getPipelineTitleField()}
          </Col>
          <Col sm={3}>
            <PipelineSummaryActionBar
              pipeline={pipeline}
              pipelineModel={pipelineModel}
              loadPipeline={fetchPlan}
              isActionAllowedFunction={authorizedAction} // TODO: Handle this without passing the function in
            />
          </Col>
          <Col sm={12} md={6} className="py-2">
            {getPipelineIdField()}
          </Col>
          <Col sm={12} md={6} className="py-2">
            {getPipelineRunCountField()}
          </Col>
          <Col xs={12} sm={6} className="py-2">
            {getPipelineOwnerField()}
          </Col>
          <Col xs={12} sm={6} className="py-2">
            {getCreatedAtField()}
          </Col>
          <Col xs={12} sm={6} className="py-2">
            {getOrganizationField()}
          </Col>
          <Col lg className="py-2">
            {getOrganizationAccountField()}
          </Col>
          <Col xs={12} sm={6} className="py-2">
            {getPipelineTypeField()}
          </Col>
          {getSchedulerField()}
          {getTagField()}

          {customerAccessRules.Type !== "sass-user" && getRoleAccessField()}

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
  customerAccessRules: PropTypes.object,
  ownerName: PropTypes.string,
  parentWorkflowStatus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  fetchPlan: PropTypes.func,
  setWorkflowStatus: PropTypes.func,
  setPipeline: PropTypes.func,
  showActionControls: PropTypes.bool,
};

export default PipelineSummaryPanel;