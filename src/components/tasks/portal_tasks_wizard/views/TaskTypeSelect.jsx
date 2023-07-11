import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import Row from "react-bootstrap/Row";
import SelectionCardColumn from "temp-library-components/cards/SelectionCardColumn";
import OverlayWizardButtonContainerBase from "temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import TaskCreationFlowSelectionCardBase from "../task_cards/TaskCreationFlowSelectionCardBase";
import {TASK_TYPE_LABELS, TASK_TYPES} from "../../task.types";
import {faSalesforce} from "@fortawesome/free-brands-svg-icons";
import IconBase from "../../../common/icons/IconBase";
import {WORKFLOW_OPTION_TYPES} from "../../../wizard/portal/workflows/flows/WorkflowOptionCardBase";
import {getLargeVendorIconFromToolIdentifier} from "../../../common/helpers/icon-helpers";
import {toolIdentifierConstants} from "../../../admin/tools/identifiers/toolIdentifier.constants";
import IconTitleBar from "../../../common/fields/title/IconTitleBar";
import {ImageBase} from "@opsera/react-vanity-set";
import {platformImageConstants} from "../../../../temp-library-components/image/platformImage.constants";
import Col from "react-bootstrap/Col";

export default function TaskTypeSelect(
  {
    className,
    selectedTaskType,
    setSelectedTaskType,
    setCurrentScreen,
    backButtonFunction,
    setButtonContainer,
  }) {
  useEffect(() => {
    if (setButtonContainer) {
      setButtonContainer(
        <OverlayWizardButtonContainerBase
          backButtonFunction={backButtonFunction}
        />,
      );
    }
  }, []);

  const handleFlowSelection = (taskType) => {
    setSelectedTaskType(taskType);
    setCurrentScreen("task_config");
  };

  return (
    <div className={"m-4"}>
      <H5FieldSubHeader
        className={"mb-3 mx-3"}
        subheaderText={
          "What kind of Salesforce Task would you like to create today?"
        }
      />
      <Row>
        <Col xs={4}>
          <TaskCreationFlowSelectionCardBase
            option={TASK_TYPES.SALESFORCE_BULK_MIGRATION}
            handleFlowSelection={handleFlowSelection}
            selectedFlow={selectedTaskType}
            icon={
              <IconTitleBar
                icon={
                  <ImageBase
                    height={96}
                    imageSource={
                      platformImageConstants.PLATFORM_IMAGE_LINKS
                        .SALESFORCE_GENERAL
                    }
                  />
                }
                title={TASK_TYPE_LABELS.SALESFORCE_BULK_MIGRATION}
                titleClassName={"mx-auto"}
                subTitleClassName={"mx-auto"}
              />
            }
            description={"Retrieve and Create Salesforce Repo."}
            workflowOptionType={WORKFLOW_OPTION_TYPES.TASK}
          />
        </Col>
        <Col xs={4}>
          <TaskCreationFlowSelectionCardBase
            option={TASK_TYPES.SALESFORCE_QUICK_DEPLOY}
            handleFlowSelection={handleFlowSelection}
            selectedFlow={selectedTaskType}
            icon={
              <IconTitleBar
                icon={
                  <ImageBase
                    height={96}
                    imageSource={
                      platformImageConstants.PLATFORM_IMAGE_LINKS
                        .SALESFORCE_GENERAL
                    }
                  />
                }
                title={TASK_TYPE_LABELS.SALESFORCE_QUICK_DEPLOY}
                titleClassName={"mx-auto"}
                subTitleClassName={"mx-auto"}
              />
            }
            description={"Quick Deploy validated packages."}
            workflowOptionType={WORKFLOW_OPTION_TYPES.TASK}
          />
        </Col>
        <Col xs={4}>
          <TaskCreationFlowSelectionCardBase
            option={TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC}
            handleFlowSelection={handleFlowSelection}
            selectedFlow={selectedTaskType}
            icon={
              <IconTitleBar
                icon={
                  <ImageBase
                    height={96}
                    imageSource={
                      platformImageConstants.PLATFORM_IMAGE_LINKS
                        .SALESFORCE_GIT_TASK
                    }
                  />
                }
                title={TASK_TYPE_LABELS.SALESFORCE_TO_GIT_MERGE_SYNC}
                titleClassName={"mx-auto"}
                subTitleClassName={"mx-auto"}
              />
            }
            description={
              "Retrieve and deploy components from Salesforce Org to Git Branch (With Merge Conflict Resolution)."
            }
            workflowOptionType={WORKFLOW_OPTION_TYPES.TASK}
          />
        </Col>
      </Row>
      <Row className={"mt-2"}>
        <Col xs={4}>
          <TaskCreationFlowSelectionCardBase
            option={TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE}
            handleFlowSelection={handleFlowSelection}
            selectedFlow={selectedTaskType}
            icon={
              <IconTitleBar
                icon={
                  <ImageBase
                    height={96}
                    imageSource={
                      platformImageConstants.PLATFORM_IMAGE_LINKS
                        .SALESFORCE_GIT_TASK
                    }
                  />
                }
                title={TASK_TYPE_LABELS.SYNC_SALESFORCE_BRANCH_STRUCTURE}
                titleClassName={"mx-auto"}
                subTitleClassName={"mx-auto"}
              />
            }
            description={
              "Review and Sync Salesforce Branch Structure and corresponding details."
            }
            workflowOptionType={WORKFLOW_OPTION_TYPES.TASK}
          />
        </Col>
        <Col xs={4}>
          <TaskCreationFlowSelectionCardBase
            option={TASK_TYPES.SYNC_SALESFORCE_REPO}
            handleFlowSelection={handleFlowSelection}
            selectedFlow={selectedTaskType}
            icon={
              <IconTitleBar
                icon={
                  <ImageBase
                    height={96}
                    imageSource={
                      platformImageConstants.PLATFORM_IMAGE_LINKS
                        .SALESFORCE_GIT_TASK
                    }
                  />
                }
                title={TASK_TYPE_LABELS.SYNC_SALESFORCE_REPO}
                titleClassName={"mx-auto"}
                subTitleClassName={"mx-auto"}
              />
            }
            description={
              "Retrieve and deploy components from Salesforce Org to Git Branch (Without Merge Conflict Resolution)."
            }
            workflowOptionType={WORKFLOW_OPTION_TYPES.TASK}
          />
        </Col>
      </Row>
    </div>
  );
}

TaskTypeSelect.propTypes = {
  selectedTaskType: PropTypes.string,
  setSelectedTaskType: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  backButtonFunction: PropTypes.func,
  setButtonContainer: PropTypes.func,
  className: PropTypes.string,
  accountMetrics: PropTypes.object,
};