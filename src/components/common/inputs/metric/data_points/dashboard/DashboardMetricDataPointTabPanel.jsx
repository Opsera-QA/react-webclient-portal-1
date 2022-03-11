import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import VanitySetVerticalTab from "components/common/tabs/vertical_tabs/VanitySetVerticalTab";
import VanitySetVerticalTabContainer from "components/common/tabs/vertical_tabs/VanitySetVerticalTabContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DashboardMetricDataPointInputBase
  from "components/common/inputs/metric/data_points/dashboard/DashboardMetricDataPointInputBase";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";

function DashboardMetricDataPointTabPanel(
  {
    model,
    setModel,
    dataPoints,
    setKpiConfiguration
  }) {
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    if (!Array.isArray(dataPoints) || dataPoints.length === 0) {
      setActiveTab("");
    }

    const initialState = isMongoDbId(dataPoints[0]?._id) === true ? dataPoints[0]?._id : "";

    if (hasStringValue(activeTab) === true) {
      const dataPoint = dataPoints?.find((dataPoint) => dataPoint?._id === activeTab);

      if (dataPoint == null) {
        setActiveTab(initialState);
      }
    } else {
      setActiveTab(initialState);
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
        className={""}
      />
    );
  };

  const getVerticalTabContainer = () => {
    return (
      <VanitySetVerticalTabContainer
        className={"h-100 w-100"}
      >
        <div className={"metric-tab-tree"}>
          {dataPoints.map((dataPoint) => {
            return (
              getVerticalTab(dataPoint?._id, dataPoint?.name)
            );
          })}
        </div>
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

  const updateDataPoint = (newDataPoint) => {
    const currentDataPoints = model?.getData("dataPoints");
    const index = currentDataPoints?.findIndex((dataPoint) => dataPoint._id === newDataPoint?._id);

    if (newDataPoint && index !== -1) {
      const newModel = {...model};
      const newDataPoints = [...currentDataPoints];
      newDataPoints[index] = newDataPoint;
      newModel?.setData("dataPoints", newDataPoints);
      setKpiConfiguration(model?.data);
      setModel({...newModel});
    }
  };

  const getCurrentView = () => {
    if (activeTab !== "") {
      const dataPoint = dataPoints.find((dataPoint) => dataPoint._id === activeTab);

      if (dataPoint) {
        return (
          <DashboardMetricDataPointInputBase
            model={model}
            setModel={setModel}
            dataPoint={dataPoint}
            updateDataPoint={(newDataPoint) => updateDataPoint(newDataPoint)}
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

DashboardMetricDataPointTabPanel.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  dataPoints: PropTypes.array,
  setKpiConfiguration: PropTypes.func,
};

export default DashboardMetricDataPointTabPanel;