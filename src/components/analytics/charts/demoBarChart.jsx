/*  This is a sample bar chart using Nivo
  https://nivo.rocks/bar

  For this first version of our Analytics Project, we are going to follow the rule of having 1 JSX/React Component and one "<chartName>Config.js" 
  file per chart.  The two files should be all that's required to render a particular chart including the API call, legend and other customizations.   
  There will be a shared "charts.css" that will contain any customizations for all charts in this first release.  Use hyphenated class names for that syntax.
  
  Each file should be named in camelCase format under the /analytics/charts 
  folder in the React project following this syntax:  <metric description><chart type><file type> (ie deploySuccessPieChart.jsx and deploySuccessPieChartConfig.js)  
  
  Each chart should contain ALL code necessary to render the chart, that means the UI components, legends, 
  and API calls.  We do not want to be managing more than these two files for every chart when the number of charts we will support could get very large.  Future designs will 
  review this architecture and if any concerns arise, please contact Todd.  Also, we use React Context (not redux) for managing the user authentication and state management.

  This sample is in a React Class format, however React Functional Components are preferred.  The demo was simply done this way because of the Nivo documentation using that format.

  Color Schemes are available at this link:
  https://nivo.rocks/guides/colors
  This sample is using the "yellow_green_blue" theme (as defined near line 92 on the chart below)

*/

import React from "react";
//import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
import { AuthContext } from "../../../contexts/AuthContext"; //New AuthContext State 
import { ApiService } from "../../../api/apiService";
//import LoadingDialog from "../../common/loading";  //component currently used when calling APIs.  TODO: We may want to add a different one for charts that just works on the specific chart UI
//import ErrorDialog from "../../common/error"; //EVER chart should have an Error Dialog supported.  This is the shared site one, but also may need to be updated to match our charting needs.


//Temporarily importing test data here.  The axios API call to the NodeAPI will replace this
import sampleData from "./demoData";

import config from "./demoBarChartConfigs";
import "./charts.css";

class Chart extends React.Component {
  static contextType = AuthContext;  //Registers the User Authentication context data in the component

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
    //this.getApiData();  //TODO" API Sample included with token data, but needs to be flushed out.
    this.setState({ data: sampleData });
  }


  async getApiData() {
    const { getAccessToken, getUserInfo } = this.context;
    const accessToken = await getAccessToken();
    const userInfo = await getUserInfo();
    const urlParams = { userid: userInfo.sub };
    const apiCall = new ApiService("/applications", urlParams, accessToken);
    let currentComponent = this;
    apiCall.get()
      .then(function (response) {
        currentComponent.setState({
          data: response.data,
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
  }


  render() {
    const { data, error, fetching } = this.state;
    return (
      <div className="chart">
        <ResponsiveBar
          data={data}
          keys={config.keys}
          indexBy="country"
          margin={config.margin}
          padding={0.3}
          colors={{ scheme: "yellow_green_blue" }}
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
          labelTextColor="inherit:darker(1.6)"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          legends={config.legends}
          theme={{
            tooltip: {
              container: {
                fontSize: "12px",
              },
            },
          }}
        />
      </div>
    );
  }
}

export default Chart;
