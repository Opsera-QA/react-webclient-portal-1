import React  from "react";
import { Col, Row } from "react-bootstrap";
import IconBase from "../../../../common/icons/IconBase";
import {
  faCheckCircle,
  faIdBadge,
  faToolbox,
} from "@fortawesome/pro-light-svg-icons";
import PropTypes from "prop-types";
import ToolNameFieldDisplayer from "components/common/fields/inventory/name/ToolNameFieldDisplayer";

export function UnitTestStepView({ item, stateColorClass, isSelected }) {
  return (
    <>
      <div
        className={
          "p-1 workflow-module-container workflow-module-container-width mx-auto " +
          (isSelected ? "workflow-step-running" : stateColorClass)
        }
      >
        <div
          className="workflow-module-container-height flex-row"
          style={{ width: "275px" }}
        >
          <Row>
            <Col sm={9}>
              <div className="text-muted mr-1">{item.name}</div>
            </Col>
            <Col sm={1}>
              <span className="flex-grow-1 text-right">
                {isSelected && (
                  <IconBase
                    icon={faCheckCircle}
                    className={"mr-2 green"}
                  />
                )}
              </span>
            </Col>
          </Row>

          <div className="p-1 text-muted small">
            <IconBase
              icon={faToolbox}
              iconSize={"sm"}
              className={"mr-1"}
            />
            Salesforce Org: <ToolNameFieldDisplayer
              toolId={item.tool?.configuration?.sfdcToolId}
          />
          </div>
          <div className="p-1 text-muted small">
            <IconBase
              icon={faIdBadge}
              iconSize={"sm"}
              className={"mr-1"}
            />
            Step ID: {item._id}
          </div>
          <div className="p-1 text-muted small">
            <IconBase
                icon={faIdBadge}
                iconSize={"sm"}
                className={"mr-1"}
            />
            Unit Test Type: {item.tool?.configuration?.sfdcUnitTestType || ""}
          </div>
        </div>
      </div>
    </>
  );
}

UnitTestStepView.propTypes = {
  item: PropTypes.object,
  stateColorClass: PropTypes.string,
  isSelected: PropTypes.bool,
};
