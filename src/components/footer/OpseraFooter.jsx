import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import useLocationReference, { PUBLIC_PATHS } from "hooks/useLocationReference";
import { lightThemeConstants } from "temp-library-components/theme/light.theme.constants";

export default function OpseraFooter() {
  const { currentPath } = useLocationReference();

  const getBackgroundColor = () => {
    if (currentPath === PUBLIC_PATHS.FREE_TRIAL_REGISTRATION) {
      return lightThemeConstants.COLOR_PALETTE.OPSERA_HEADER_PURPLE;
    }

    return "#f2f2f2";
  };

  const getFontColor = () => {
    if (currentPath === PUBLIC_PATHS.FREE_TRIAL_REGISTRATION) {
      return lightThemeConstants.COLOR_PALETTE.WHITE;
    }
  };

  return (
    <Row
      style={{
        bottom: 0,
        position: "fixed",
        width: "100%",
        backgroundColor: getBackgroundColor(),
        color: getFontColor(),
        zIndex: 1200,
      }}
    >
      <Col className={"text-center m-1 p-0"} style={{ fontSize: ".6em" }}>
        <span>{`© ${new Date().getFullYear()} Opsera, Inc. The Continuous Orchestration Platform™`}</span>
      </Col>
    </Row>
  );
}

OpseraFooter.propTypes = {};
