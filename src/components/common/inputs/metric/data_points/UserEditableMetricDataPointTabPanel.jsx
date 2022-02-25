import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserEditableMetricDataPointInputBase
  from "components/common/inputs/metric/data_points/UserEditableMetricDataPointInputBase";

function UserEditableMetricDataPointTabPanel(
  {
    model,
    setModel,
    dataPoints,
  }) {
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    if (Array.isArray(dataPoints) && dataPoints.length > 0) {
      setActiveTab(dataPoints[0]?._id);
    }
  }, [dataPoints]);

  const handleTabClick = (newTab) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  };

  const getVerticalTab = (id, name) => {
    return (
      <VanitySetVerticalTab
        key={id}
        tabText={name}
        tabName={id}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
      />
    );
  };

  const getVerticalTabContainer = () => {
    return (
      <VanitySetVerticalTabContainer
        className={"h-100 w-100"}
      >
        {dataPoints.map((dataPoint) => {
          return (
            getVerticalTab(dataPoint?._id, dataPoint?.name)
          );
        })}
      </VanitySetVerticalTabContainer>
    );
  };

  const getTabView = () => {
    return (
      <Row className={"mx-0"}>
        <Col sm={2} className={"px-0"}>
          {getVerticalTabContainer()}
        </Col>
        <Col sm={10} className={"px-0"}>
          <div className={""}>
            {getCurrentView()}
          </div>
        </Col>
      </Row>
    );
  };

  const getCurrentView = () => {
    if (activeTab !== "") {
      const dataPoint = dataPoints.find((dataPoint) => dataPoint._id === activeTab);

      if (dataPoint) {
        return (
          <UserEditableMetricDataPointInputBase
            model={model}
            setModel={setModel}
            dataPoint={dataPoint}
          />
        );
      }
    }
  };

  if (!Array.isArray(dataPoints)) {
    return null;
  }

  return (getTabView());
}

UserEditableMetricDataPointTabPanel.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  dataPoints: PropTypes.array,
};

export default UserEditableMetricDataPointTabPanel;