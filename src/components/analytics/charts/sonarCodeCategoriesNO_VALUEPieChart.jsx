import React, { useState } from "react";
import PropTypes from "prop-types";
import { ResponsivePie } from "@nivo/pie";
import ErrorDialog from "../../common/status_notifications/error";
import config from "./sonarCodeCategoriesNO_VALUEPieChartConfigs";
import "./charts.css";
import ModalLogs from "../../common/modal/modalLogs";
import InfoDialog from "../../common/status_notifications/info";



function CodeCategoriesPieChart( { data, persona } ) {
  const { sonarCodeCategoriesNO_VALUE }  =  data;
  const [showModal, setShowModal] = useState(false);
      
    return (
      <>
      
        <ModalLogs header=" Code Categories (Keyword = No Value)" size="lg" jsonMessage={sonarCodeCategoriesNO_VALUE ? sonarCodeCategoriesNO_VALUE.data : []} dataType="pie" show={showModal} setParentVisibility={setShowModal} />
        <div className="chart mb-3" style={{ height: "300px" }}>
        <div className="chart-label-text">Sonar: Code Categories (Keyword = No Value)</div>
          { typeof data !== "object" || Object.keys(data).length === 0 || sonarCodeCategoriesNO_VALUE.status !== 200 ? (
            <div
              className="max-content-width p-5 mt-5"
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <InfoDialog message="No Data is available for this chart at this time." />
            </div>
          ) : (
        <ResponsivePie
          data={sonarCodeCategoriesNO_VALUE ? sonarCodeCategoriesNO_VALUE.data : []}
          margin={{ top: 40, right: 230, bottom: 80, left: 80 }}
          innerRadius={0.5}
          onClick={() => setShowModal(true)}
          padAngle={0.7}
          cornerRadius={3}
          borderWidth={1}
          radialLabelsSkipAngle={45}
          radialLabelsTextXOffset={6}
          radialLabelsTextColor="#333333"
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={16}
          radialLabelsLinkHorizontalLength={24}
          radialLabelsLinkStrokeWidth={1}
          slicesLabelsSkipAngle={10}
          slicesLabelsTextColor="#333333"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          defs={config.defs}
          fill={config.fill}
          legends={config.legends}
          theme={{
            tooltip: {
              container: {
                fontSize: "16px",
              },
            },
          }}
        />
          )}
      </div>
      </>
    );
  }
  
CodeCategoriesPieChart.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};

export default CodeCategoriesPieChart;
