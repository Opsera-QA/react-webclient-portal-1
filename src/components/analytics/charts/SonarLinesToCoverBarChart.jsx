// Analytics Software Testing, Persona Manager/Developer/Executive, Node Ticket AN-147
import React, { useState } from "react";
// { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import DateFormatHelper from "@opsera/persephone/helpers/date/dateFormat.helper";
// import { AuthContext } from "../../../contexts/AuthContext";
// import { axiosApiService } from "../../../api/apiService";
// import LoadingDialog from "../../common/loading";
import { ResponsiveBar } from "@nivo/bar";
import "./charts.css";
import ModalLogs from "../../common/modal/modalLogs";
import InfoDialog from "../../common/status_notifications/info";
import {capitalizeFirstLetter} from "components/common/helpers/string-helpers";
import { defaultConfig, assignLineColors, capitalizeLegend, adjustBarWidth } from "../../insights/charts/charts-views";
         import ChartTooltip from "../../insights/charts/ChartTooltip";

function SonarLinesToCoverBarChart({ data, persona }) {
  const [showModal, setShowModal] = useState(false);
  assignLineColors(data?.data);

  // if (typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) {
  //   return <ErrorDialog error="No Data Present in the ES!" />;
  // } else {
  return (
    <>
      <ModalLogs header="Lines to Cover" size="lg" jsonMessage={data ? data.data : []} dataType="bar" show={showModal} setParentVisibility={setShowModal} />

      <div className="chart mb-3" style={{ height: "300px" }}>
        <div className="chart-label-text">Sonar: Lines to Cover</div>
        {(typeof data !== "object" || Object.keys(data).length === 0 || data.status !== 200) ?
          <div className='max-content-width p-5 mt-5' style={{ display: "flex",  justifyContent:"center", alignItems:"center" }}>
            <InfoDialog message="No Data is available for this chart at this time." />
          </div>
          : 
          <ResponsiveBar
            {...defaultConfig("Value", "Code Coverage Metric", 
                    false, true, "", "monthDate2")}
            {...adjustBarWidth(data?.data)}
            data={data ? data.data : []}
            onClick={() => setShowModal(true)}
            keys={[
              "uncovered_lines",
              "line_coverage"
            ]}
            groupMode="stacked"
            indexBy="analysedAt"
            colorBy="id"
            colors={({ id, data }) => data[`${id}_color`]}
            tooltip={({ indexValue, value, id, color, data }) => <ChartTooltip 
                titles = {["Timestamp", capitalizeFirstLetter(id) , "Project Key"]}
                values = {[DateFormatHelper.formatDateAsTimestampWithoutSeconds(new Date(indexValue)), value, data.key]}
                style = {false}
                color = {color} />}
          />
        }
      </div>
    </>
  );
  // }
}

SonarLinesToCoverBarChart.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};

export default SonarLinesToCoverBarChart;