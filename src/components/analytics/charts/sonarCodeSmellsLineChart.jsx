import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { AuthContext } from "../../../contexts/AuthContext"; //New AuthContext State 
import { ApiService } from "../../../api/apiService";

//Temporarily importing test data here.  The axios API call to the NodeAPI will replace this
import sampleData from "./demoLineData";
import config from "./sonarCodeSmellsLineChartConfigs";

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
            data: response.data.data.sonarCodeSmells.data,
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
          margin={{ top: 50, right: 110, bottom: 65, left: 80 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: "auto", max: "auto", stacked: true, reverse: false }}
          axisTop={null}
          axisRight={null}
          axisBottom={config.axisBottom}
          colors={{ scheme: "spectral" }}
          axisLeft={config.axisLeft}
          pointSize={10}
          pointBorderWidth={8}
          pointLabel="y"
          pointLabelYOffset={-12}
          useMesh={true}
          lineWidth={3.5}
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
