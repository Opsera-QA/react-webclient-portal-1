import React from "react";
import PropTypes from "prop-types";
import ActionBarEditorToggleButton from "components/common/actions/buttons/ActionBarEditorToggleButton";
import { faCogs } from "@fortawesome/pro-light-svg-icons";
import ActionBarButton from "components/common/actions/buttons/ActionBarButton";
import useComponentStateReference from "hooks/useComponentStateReference";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function SummaryPanelContainer(
  {
    setActiveTab,
    editingAllowed,
    children,
    settingsTab,
    className,
  }) {
  const {
    isOpseraAdministrator,
    isFreeTrial,
  } = useComponentStateReference();

  const getSettingsToggle = () => {
    if (isOpseraAdministrator !== true && isFreeTrial === true) {
      return (
        <Row>
          <Col xs={12} className={"w-100 d-flex mt-2"}>
            <ActionBarButton
              iconClasses={"dark-grey"}
              icon={faCogs}
              popoverText={`Editing Settings is available in the main Opsera offering.`}
            />
          </Col>
        </Row>
      );
    }

    if (editingAllowed !== false && setActiveTab) {
      return (
        <Row>
          <Col xs={12} className={"w-100 d-flex mt-2"}>
            <div className={"ml-auto"}>
              <ActionBarEditorToggleButton setActiveTab={setActiveTab} settingsTab={settingsTab} />
            </div>
          </Col>
        </Row>
      );
    }
  };

  return (
    <div className={"scroll-y hide-x-overflow h-100"}>
      {getSettingsToggle()}
      <div className={className}>
        {children}
      </div>
    </div>
  );
}

SummaryPanelContainer.propTypes = {
  setActiveTab: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  editingAllowed: PropTypes.bool,
  settingsTab: PropTypes.string,
  className: PropTypes.string
};