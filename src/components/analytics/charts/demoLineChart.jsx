import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { AuthContext } from "../../../contexts/AuthContext"; //New AuthContext State 

//Temporarily importing test data here.  The axios API call to the NodeAPI will replace this
import sampleData from "./demoLineData";
import config from "./demoLineChartConfigs";

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
        this.setState({ data: sampleData });
    }


    render() {
        const { data } = this.state;
        console.log(data);
        return (
            <div className="chart">
                <ResponsiveLine
                    data={data}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={config.axisBottom}
                    axisLeft={config.axisLeft}
                    pointSize={10}
                    pointBorderWidth={2}
                    pointLabel="y"
                    pointLabelYOffset={-12}
                    useMesh={true}
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

export default DemoLineChart;
