import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import { faTasksAlt } from "@fortawesome/pro-light-svg-icons";
import ToolConfigurationSummaryPanel from "components/inventory/tools/tool_details/ToolConfigurationSummaryPanel";

export default function ToolConnectionSummaryContainer(
  {
    toolModel,
    isLoading,
  }) {
  return (
    <Card className="my-2 pipeline-summary-card">
      <Card.Title>
        <div className="d-flex pipeline-card-title small p-1 w-100">
          <div className={"mx-2"}>
            <span>
              <IconBase
                isLoading={isLoading}
                className={"mr-2"}
              />
              Account Details
            </span>
          </div>
        </div>
      </Card.Title>
      <Card.Body className="py-0 px-3 h-100 small">
        <ToolConfigurationSummaryPanel
          toolIdentifier={toolModel?.getData("tool_identifier")}
          toolConfiguration={toolModel?.getData("configuration")}
        />
      </Card.Body>
    </Card>
  );
}

ToolConnectionSummaryContainer.propTypes = {
  toolModel: PropTypes.object,
  isLoading: PropTypes.bool,
};