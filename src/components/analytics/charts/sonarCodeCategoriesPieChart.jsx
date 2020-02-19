import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { AuthContext } from "../../../contexts/AuthContext"; 
import { ApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
import ErrorDialog from "../../common/error"; 
import config from "./sonarCodeCategoriesPieChartConfigs";
import "./charts.css";

class DemoPieChart extends React.Component {
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
      const urlParams = { userid: userInfo.sub };
      const apiCall = new ApiService("/analytics/dashboard/secops", urlParams, accessToken);
      let currentComponent = this;
      apiCall.get()
        .then(function (response) {
          currentComponent.setState({
            data: response.data.data.sonarCodeCategoriesNO_VALUE.data,
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
      const { data, error, fetching } = this.state;
      if(fetching) {
        return (<LoadingDialog size="sm" />);
      } else if (typeof data !== "object" || Object.keys(data).length == 0 || error) {
        return (<ErrorDialog  align="center" error={error ? error : "Missing Data!"} />);
      } else {
        return (
          <>
            <div className="chart-label-text">Sonar: Code Categories</div>
            <ResponsivePie
              data={data}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              borderWidth={1}
              radialLabelsSkipAngle={10}
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
                    fontSize: "12px",
                  },
                },
              }}
            />
          </>
        );}
    }
}

export default DemoPieChart;
