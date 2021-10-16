import React, {useState} from "react";
import PlatformToolsTable2 from "components/inventory/platform/PlatformToolsTable2.jsx";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import InventorySubNavigationBar from "components/inventory/InventorySubNavigationBar";
import Model from "core/data_model/model";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {platformMetadata} from "components/inventory/platform/platform.metadata";
import PlatformInventoryPlatformApplicationSelectInput
  from "components/inventory/platform/inputs/PlatformInventoryPlatformApplicationSelectInput";

function PlatformInventory () {
  const [platformModel, setPlatformModel] = useState(new Model(platformMetadata.newObjectFields, platformMetadata, true));

  return (
    <ScreenContainer
      navigationTabContainer={<InventorySubNavigationBar currentTab={"platform"}/>}
      breadcrumbDestination={"platform"}
    >
      <Row className={"mx-0"}>
        <Col xs={12}>
          <PlatformInventoryPlatformApplicationSelectInput
            model={platformModel}
            setModel={setPlatformModel}
          />
        </Col>
        <Col xs={12}>
          <PlatformToolsTable2
            platformApplication={platformModel?.getData("applicationId")}
            applicationTools={platformModel?.getData("toolsList")}
          />
        </Col>
      </Row>
    </ScreenContainer>
  );
}

PlatformInventory.propTypes = {};

export default PlatformInventory;
