import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { AuthContext } from "../../../contexts/AuthContext";
import { ApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
import ErrorDialog from "../../common/error";
import config from "./sonarCodeSmellsLineChartConfigs";
import "./charts.css";

class DemoLineChart extends React.Component {
  static contextType = AuthContext;

  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      fetching: true,
      error: null,
      messages: null
    };
  }

  componentDidMount() {
    this.getApiData();
  }

  async getApiData() {
    const { getAccessToken, getUserInfo } = this.context;
    const accessToken = await getAccessToken();
    const userInfo = await getUserInfo();
    if (userInfo) {
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
  }

  render() {
    const { data, error, fetching } = this.state;
    if (fetching) {
      return (<LoadingDialog size="sm" />);
    } else if (typeof data !== "object" || Object.keys(data).length == 0 || error) {
      return (<ErrorDialog align="center" error={error ? error : "Missing Data!"} />);
    } else {
      return (
        <>
          <div className="chart-label-text">Sonar: Code Smells</div>
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
        </>
      );
    }
  }
}

export default DemoLineChart;
