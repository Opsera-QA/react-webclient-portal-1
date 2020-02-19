import React from "react";
//import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import { AuthContext } from "../../../contexts/AuthContext";
import { ApiService } from "../../../api/apiService";
import LoadingDialog from "../../common/loading";
import ErrorDialog from "../../common/error"; 
import config from "./buildsByUserBarChartConfigs";
import "./charts.css";

class Chart extends React.Component {
  static contextType = AuthContext;  

  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      fetching: true,
      error: null,
      messages: null,
      selection: "platform"
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
    const apiCall = new ApiService("/analytics/dashboard/pipeline", urlParams, accessToken);
    let currentComponent = this;
    apiCall.get()
      .then(function (response) {
        currentComponent.setState({
          data: response.data.data.buildsByUser.data,
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
          <div className="chart-label-text">Jenkins: Builds by User</div>
          <ResponsiveBar
            data={data}
            keys={config.keys}
            indexBy="key"
            margin={config.margin}
            padding={0.3}
            layout={"horizontal"}
            colors={{ scheme: "dark2" }}
            borderColor={{ theme: "background" }}
            colorBy="id"
            defs={config.defs}
            fill={config.fill}
            axisTop={null}
            axisRight={null}
            axisBottom={config.axisBottom}
            axisLeft={config.axisLeft}
            labelSkipWidth={12}
            labelSkipHeight={12}
            enableLabel={false}
            borderRadius={5}
            labelTextColor="inherit:darker(2)"
            animate={true}
            motionStiffness={90}
            borderWidth={2}
            motionDamping={15}
            theme={{
              tooltip: {
                container: {
                  fontSize: "16px",
                },
              },
            }}
          />
        </>
      );}
  }
}

export default Chart;
