import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { AuthContext } from "../../../contexts/AuthContext"; //New AuthContext State 
import { ApiService } from "../../../api/apiService";

//Temporarily importing test data here.  The axios API call to the NodeAPI will replace this
import sampleData from "./demoLineData";
import config from "./sonarMaintainabilityLineChartConfigs";

import "./charts.css";

class DemoLineChart extends React.Component {
    static contextType = AuthContext;  //Registers the User Authentication context data in the component

    constructor(props, context) {
      super(props, context);
      this.state = {
        data: [],
      };
    }

    componentDidMount() {
      this.getApiData();
      // this.setState({ data: sampleData });
    }

    async getApiData() {
      const { getAccessToken, getUserInfo } = this.context;
      const accessToken = await getAccessToken();
      const userInfo = await getUserInfo();
      const urlParams = { userid: userInfo.sub };
      const apiCall = new ApiService("/analytics/dashboard/secops", urlParams, accessToken);
      let currentComponent = this;
      apiCall.get()
        .then(function (response) {
          currentComponent.setState({
            data: response.data.data.sonarMaintainability.data,
            error: null,
            fetching: false
          });
        })
        .catch(function (error) {
          currentComponent.setState({
            error: error,
            fetching: false
          });
        });
      console.log(this.data);
    }

    render() {
      const { data } = this.state;
      console.log(data);
      return (
        
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 80 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: "auto", max: "auto", stacked: true, reverse: false }}
          axisTop={null}
          axisRight={null}
          axisBottom={config.axisBottom}
          axisLeft={config.axisLeft}
          pointSize={10}
          pointBorderWidth={8}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh={true}
          lineWidth={3.5}
          colors={{ scheme: "category10" }}
          theme={{
            tooltip: {
              container: {
                fontSize: "12px",
              },
            },
          }}
        />
        
      );
    }
}

export default DemoLineChart;
