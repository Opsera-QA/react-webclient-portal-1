import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import Row from "react-bootstrap/Row";
import SelectionCardColumn from "temp-library-components/cards/SelectionCardColumn";
import OverlayWizardButtonContainerBase from "temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import TaskCardBase from "../task_cards/TaskCardBase";
import { TASK_TYPE_LABELS, TASK_TYPES } from "../../task.types";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import IconBase from "../../../common/icons/IconBase";
import { WORKFLOW_OPTION_TYPES } from "../../../wizard/portal/workflows/flows/WorkflowOptionCardBase";
import {getLargeVendorIconFromToolIdentifier} from "../../../common/helpers/icon-helpers";
import {toolIdentifierConstants} from "../../../admin/tools/identifiers/toolIdentifier.constants";
import IconTitleBar from "../../../common/fields/title/IconTitleBar";

export default function TaskTypeSelect({
  className,
  selectedFlow,
  setSelectedFlow,
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

  const handleFlowSelection = (newFlowOption) => {
    setSelectedFlow(newFlowOption);
    setCurrentScreen("task_config");
  };

  return (
    <div className={"py-3"}>
      <CenteredContentWrapper>
        <H5FieldSubHeader
          className={"mb-3 mx-3"}
          subheaderText={
            "What kind of Salesforce Task would you like to create today?"
          }
        />
      </CenteredContentWrapper>
      <Row
        xs={3}
        style={{
          verticleAlign: "middle",
          marginLeft: "10rem",
          marginRight: "10rem",
        }}
      >
        <SelectionCardColumn>
          <TaskCardBase
            option={TASK_TYPES.SALESFORCE_BULK_MIGRATION}
            handleFlowSelection={handleFlowSelection}
            selectedFlow={selectedFlow}
            icon={
                <IconTitleBar
                    icon={
                        getLargeVendorIconFromToolIdentifier(toolIdentifierConstants.TOOL_IDENTIFIERS.SFDC_CONFIGURATOR)
                    }
                    title={TASK_TYPE_LABELS.SALESFORCE_BULK_MIGRATION}
                    titleClassName={"mx-auto"}
                    subTitleClassName={"mx-auto"}
                />
            }
            workflowOptionType={WORKFLOW_OPTION_TYPES.TASK}
          />
        </SelectionCardColumn>
        <SelectionCardColumn>
          <TaskCardBase
            option={TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION}
            handleFlowSelection={handleFlowSelection}
            selectedFlow={selectedFlow}
            icon={
                <IconTitleBar
                    icon={
                        getLargeVendorIconFromToolIdentifier(toolIdentifierConstants.TOOL_IDENTIFIERS.SFDC_CONFIGURATOR)
                    }
                    title={TASK_TYPE_LABELS.SALESFORCE_CERTIFICATE_GENERATION}
                    titleClassName={"mx-auto"}
                    subTitleClassName={"mx-auto"}
                />
            }
            workflowOptionType={WORKFLOW_OPTION_TYPES.TASK}
          />
        </SelectionCardColumn>
        <SelectionCardColumn>
          <TaskCardBase
            option={TASK_TYPES.SALESFORCE_QUICK_DEPLOY}
            handleFlowSelection={handleFlowSelection}
            selectedFlow={selectedFlow}
            icon={
                <IconTitleBar
                    icon={
                        getLargeVendorIconFromToolIdentifier(toolIdentifierConstants.TOOL_IDENTIFIERS.SFDC_CONFIGURATOR)
                    }
                    title={TASK_TYPE_LABELS.SALESFORCE_QUICK_DEPLOY}
                    titleClassName={"mx-auto"}
                    subTitleClassName={"mx-auto"}
                />
            }
            workflowOptionType={WORKFLOW_OPTION_TYPES.TASK}
          />
        </SelectionCardColumn>
        {/*disabled for now need to activate later*/}
        {/*<SelectionCardColumn>*/}
        {/*  <TaskCardBase*/}
        {/*    option={TASK_TYPES.GIT_TO_GIT_MERGE_SYNC}*/}
        {/*    handleFlowSelection={handleFlowSelection}*/}
        {/*    selectedFlow={selectedFlow}*/}
        {/*    title={TASK_TYPE_LABELS.SALESFORCE_TO_GIT_MERGE_SYNC}*/}
        {/*    icon={*/}
        {/*      <IconBase*/}
        {/*        icon={faSalesforce}*/}
        {/*        iconColor={"#1798c1"}*/}
        {/*        className={"mt-5"}*/}
        {/*        iconSize={"3x"}*/}
        {/*      />*/}
        {/*    }*/}
        {/*    workflowOptionType={WORKFLOW_OPTION_TYPES.TASK}*/}
        {/*  />*/}
        {/*</SelectionCardColumn>*/}
        <SelectionCardColumn>
          <TaskCardBase
            option={TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE}
            handleFlowSelection={handleFlowSelection}
            selectedFlow={selectedFlow}
            icon={
                <IconTitleBar
                    icon={
                        getLargeVendorIconFromToolIdentifier(toolIdentifierConstants.TOOL_IDENTIFIERS.SFDC_CONFIGURATOR)
                    }
                    title={TASK_TYPE_LABELS.SYNC_SALESFORCE_BRANCH_STRUCTURE}
                    titleClassName={"mx-auto"}
                    subTitleClassName={"mx-auto"}
                />
            }
            workflowOptionType={WORKFLOW_OPTION_TYPES.TASK}
          />
        </SelectionCardColumn>
        <SelectionCardColumn>
          <TaskCardBase
            option={TASK_TYPES.SYNC_SALESFORCE_REPO}
            handleFlowSelection={handleFlowSelection}
            selectedFlow={selectedFlow}
            icon={
                <IconTitleBar
                    icon={
                        getLargeVendorIconFromToolIdentifier(toolIdentifierConstants.TOOL_IDENTIFIERS.SFDC_CONFIGURATOR)
                    }
                    title={TASK_TYPE_LABELS.SYNC_SALESFORCE_REPO}
                    titleClassName={"mx-auto"}
                    subTitleClassName={"mx-auto"}
                />
            }
            workflowOptionType={WORKFLOW_OPTION_TYPES.TASK}
          />
        </SelectionCardColumn>
      </Row>
    </div>
  );
}

TaskTypeSelect.propTypes = {
  selectedFlow: PropTypes.string,
  setSelectedFlow: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  backButtonFunction: PropTypes.func,
  setButtonContainer: PropTypes.func,
  className: PropTypes.string,
  accountMetrics: PropTypes.object,
};
