import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { ResponsiveSwarmPlot, SwarmPlot } from '@nivo/swarmplot';

// import {defaultConfig, goalSuccessColor} from "components/insights/charts/charts-views";
import _ from "lodash";
import {faMinus, faSquare} from "@fortawesome/pro-solid-svg-icons";
// import config from "./JiraChageFailureRateChartConfig";
import { METRIC_THEME_CHART_PALETTE_COLORS } from "components/common/helpers/metrics/metricTheme.helpers";
import IconBase from "components/common/icons/IconBase";
// import ChartTooltip from "../../../ChartTooltip";
import {DialogToastContext} from "../../../../../contexts/DialogToastContext";
import ChartTooltip from "../../ChartTooltip";
// import JiraChangeFailureRateInsightsOverlay from "./JiraChangeFailureRateInsightsOverlay";

function GitLogCommitActivitiesSwarmPlot({ chartData }) {
    const [maxChartValue, setMaxChartValue] = useState(0);

    const toastContext = useContext(DialogToastContext);
    console.log("grrg");
    useEffect(() => {
        let dataHigh = {x: "", y: 0};
        dataHigh = _.maxBy(chartData, 'y');
        setMaxChartValue(Math.ceil(dataHigh?.y));
    },  [chartData]);

    let cfrChartData = [
        {
            "id": "cfr",
            "data": chartData
        }
    ];

    const closePanel = () => {
        toastContext.removeInlineMessage();
        toastContext.clearOverlayPanel();
    };

    // const onNodeSelect = (node) => {
    //     toastContext.showOverlayPanel(
    //         <JiraChangeFailureRateInsightsOverlay
    //             data={node?.data?.report || []}
    //             closePanel={closePanel}
    //         />
    //     );
    // };

    const data = [
        {
            "id": "0.0",
            "group": "group A",
            "price": 3,
            "volume": 23,
        },
        // {
        //     "id": "0.1",
        //     "group": "group A",
        //     "price": 1,
        //     "volume": 15
        // },
        // {
        //     "id": "0.2",
        //     "group": "group A",
        //     "price": 1,
        //     "volume": 15
        // },
        // {
        //     "id": "0.3",
        //     "group": "group A",
        //     "price": 283,
        //     "volume": 16
        // },
        // {
        //     "id": "0.4",
        //     "group": "group A",
        //     "price": 164,
        //     "volume": 7
        // },
        // {
        //     "id": "0.5",
        //     "group": "group A",
        //     "price": 127,
        //     "volume": 9
        // },
        // {
        //     "id": "0.6",
        //     "group": "group A",
        //     "price": 106,
        //     "volume": 17
        // },
        // {
        //     "id": "0.7",
        //     "group": "group A",
        //     "price": 447,
        //     "volume": 14
        // },
        // {
        //     "id": "0.8",
        //     "group": "group A",
        //     "price": 485,
        //     "volume": 16
        // },
        // {
        //     "id": "0.9",
        //     "group": "group A",
        //     "price": 432,
        //     "volume": 10
        // },
        // {
        //     "id": "0.10",
        //     "group": "group A",
        //     "price": 104,
        //     "volume": 8
        // },
        // {
        //     "id": "0.11",
        //     "group": "group A",
        //     "price": 196,
        //     "volume": 14
        // },
        // {
        //     "id": "0.12",
        //     "group": "group A",
        //     "price": 221,
        //     "volume": 11
        // },
        // {
        //     "id": "0.13",
        //     "group": "group A",
        //     "price": 6,
        //     "volume": 11
        // },
        // {
        //     "id": "0.14",
        //     "group": "group A",
        //     "price": 122,
        //     "volume": 20
        // },
        // {
        //     "id": "0.15",
        //     "group": "group A",
        //     "price": 96,
        //     "volume": 14
        // },
        // {
        //     "id": "0.16",
        //     "group": "group A",
        //     "price": 129,
        //     "volume": 12
        // },
        // {
        //     "id": "0.17",
        //     "group": "group A",
        //     "price": 260,
        //     "volume": 12
        // },
        // {
        //     "id": "0.18",
        //     "group": "group A",
        //     "price": 286,
        //     "volume": 8
        // },
        // {
        //     "id": "0.19",
        //     "group": "group A",
        //     "price": 366,
        //     "volume": 17
        // },
        // {
        //     "id": "0.20",
        //     "group": "group A",
        //     "price": 20,
        //     "volume": 16
        // },
        // {
        //     "id": "0.21",
        //     "group": "group A",
        //     "price": 151,
        //     "volume": 14
        // },
        // {
        //     "id": "0.22",
        //     "group": "group A",
        //     "price": 72,
        //     "volume": 11
        // },
        // {
        //     "id": "0.23",
        //     "group": "group A",
        //     "price": 387,
        //     "volume": 19
        // },
        // {
        //     "id": "0.24",
        //     "group": "group A",
        //     "price": 142,
        //     "volume": 5
        // },
        // {
        //     "id": "0.25",
        //     "group": "group A",
        //     "price": 179,
        //     "volume": 14
        // },
        // {
        //     "id": "0.26",
        //     "group": "group A",
        //     "price": 370,
        //     "volume": 13
        // },
        // {
        //     "id": "0.27",
        //     "group": "group A",
        //     "price": 360,
        //     "volume": 13
        // },
        // {
        //     "id": "0.28",
        //     "group": "group A",
        //     "price": 261,
        //     "volume": 19
        // },
        // {
        //     "id": "0.29",
        //     "group": "group A",
        //     "price": 4,
        //     "volume": 17
        // },
        // {
        //     "id": "0.30",
        //     "group": "group A",
        //     "price": 91,
        //     "volume": 15
        // },
        // {
        //     "id": "0.31",
        //     "group": "group A",
        //     "price": 500,
        //     "volume": 14
        // },
        // {
        //     "id": "0.32",
        //     "group": "group A",
        //     "price": 367,
        //     "volume": 20
        // },
        // {
        //     "id": "0.33",
        //     "group": "group A",
        //     "price": 201,
        //     "volume": 7
        // },
        // {
        //     "id": "0.34",
        //     "group": "group A",
        //     "price": 184,
        //     "volume": 18
        // },
        // {
        //     "id": "0.35",
        //     "group": "group A",
        //     "price": 456,
        //     "volume": 18
        // },
        // {
        //     "id": "0.36",
        //     "group": "group A",
        //     "price": 272,
        //     "volume": 18
        // },
        // {
        //     "id": "0.37",
        //     "group": "group A",
        //     "price": 193,
        //     "volume": 8
        // },
        // {
        //     "id": "0.38",
        //     "group": "group A",
        //     "price": 45,
        //     "volume": 6
        // },
        // {
        //     "id": "0.39",
        //     "group": "group A",
        //     "price": 234,
        //     "volume": 8
        // },
        // {
        //     "id": "0.40",
        //     "group": "group A",
        //     "price": 27,
        //     "volume": 14
        // },
        // {
        //     "id": "0.41",
        //     "group": "group A",
        //     "price": 41,
        //     "volume": 19
        // },
        // {
        //     "id": "0.42",
        //     "group": "group A",
        //     "price": 258,
        //     "volume": 9
        // },
        // {
        //     "id": "0.43",
        //     "group": "group A",
        //     "price": 322,
        //     "volume": 5
        // },
        // {
        //     "id": "0.44",
        //     "group": "group A",
        //     "price": 206,
        //     "volume": 18
        // },
        // {
        //     "id": "0.45",
        //     "group": "group A",
        //     "price": 130,
        //     "volume": 6
        // },
        // {
        //     "id": "0.46",
        //     "group": "group A",
        //     "price": 64,
        //     "volume": 15
        // },
        // {
        //     "id": "0.47",
        //     "group": "group A",
        //     "price": 203,
        //     "volume": 10
        // },
        // {
        //     "id": "0.48",
        //     "group": "group A",
        //     "price": 133,
        //     "volume": 5
        // },
        // {
        //     "id": "0.49",
        //     "group": "group A",
        //     "price": 205,
        //     "volume": 18
        // },
        // {
        //     "id": "0.50",
        //     "group": "group A",
        //     "price": 394,
        //     "volume": 20
        // },
        // {
        //     "id": "0.51",
        //     "group": "group A",
        //     "price": 395,
        //     "volume": 9
        // },
        // {
        //     "id": "0.52",
        //     "group": "group A",
        //     "price": 316,
        //     "volume": 8
        // },
        // {
        //     "id": "0.53",
        //     "group": "group A",
        //     "price": 9,
        //     "volume": 4
        // },
        // {
        //     "id": "0.54",
        //     "group": "group A",
        //     "price": 453,
        //     "volume": 12
        // },
        // {
        //     "id": "0.55",
        //     "group": "group A",
        //     "price": 57,
        //     "volume": 8
        // },
        // {
        //     "id": "0.56",
        //     "group": "group A",
        //     "price": 15,
        //     "volume": 8
        // },
        // {
        //     "id": "0.57",
        //     "group": "group A",
        //     "price": 186,
        //     "volume": 9
        // },
        // {
        //     "id": "0.58",
        //     "group": "group A",
        //     "price": 90,
        //     "volume": 11
        // },
        // {
        //     "id": "0.59",
        //     "group": "group A",
        //     "price": 444,
        //     "volume": 15
        // },
        // {
        //     "id": "0.60",
        //     "group": "group A",
        //     "price": 11,
        //     "volume": 14
        // },
        // {
        //     "id": "0.61",
        //     "group": "group A",
        //     "price": 272,
        //     "volume": 20
        // },
        // {
        //     "id": "0.62",
        //     "group": "group A",
        //     "price": 270,
        //     "volume": 16
        // },
        // {
        //     "id": "0.63",
        //     "group": "group A",
        //     "price": 271,
        //     "volume": 12
        // },
        // {
        //     "id": "0.64",
        //     "group": "group A",
        //     "price": 351,
        //     "volume": 16
        // },
        // {
        //     "id": "0.65",
        //     "group": "group A",
        //     "price": 433,
        //     "volume": 6
        // },
        // {
        //     "id": "0.66",
        //     "group": "group A",
        //     "price": 238,
        //     "volume": 19
        // },
        // {
        //     "id": "0.67",
        //     "group": "group A",
        //     "price": 345,
        //     "volume": 7
        // },
        // {
        //     "id": "0.68",
        //     "group": "group A",
        //     "price": 469,
        //     "volume": 20
        // },
        // {
        //     "id": "0.69",
        //     "group": "group A",
        //     "price": 334,
        //     "volume": 4
        // },
        {
            "id": "1.0",
            "group": "group B",
            "price": 233,
            "volume": 14
        },
        {
            "id": "1.1",
            "group": "group B",
            "price": 71,
            "volume": 12
        },
        {
            "id": "1.2",
            "group": "group B",
            "price": 169,
            "volume": 18
        },
        {
            "id": "1.3",
            "group": "group B",
            "price": 170,
            "volume": 19
        },
        {
            "id": "1.4",
            "group": "group B",
            "price": 203,
            "volume": 10
        },
        {
            "id": "1.5",
            "group": "group B",
            "price": 163,
            "volume": 20
        },
        {
            "id": "1.6",
            "group": "group B",
            "price": 5,
            "volume": 7
        },
        {
            "id": "1.7",
            "group": "group B",
            "price": 231,
            "volume": 11
        },
        {
            "id": "1.8",
            "group": "group B",
            "price": 333,
            "volume": 16
        },
        {
            "id": "1.9",
            "group": "group B",
            "price": 179,
            "volume": 7
        },
        {
            "id": "1.10",
            "group": "group B",
            "price": 472,
            "volume": 8
        },
        {
            "id": "1.11",
            "group": "group B",
            "price": 196,
            "volume": 20
        },
        {
            "id": "1.12",
            "group": "group B",
            "price": 190,
            "volume": 14
        },
        {
            "id": "1.13",
            "group": "group B",
            "price": 324,
            "volume": 4
        },
        {
            "id": "1.14",
            "group": "group B",
            "price": 260,
            "volume": 17
        },
        {
            "id": "1.15",
            "group": "group B",
            "price": 99,
            "volume": 15
        },
        {
            "id": "1.16",
            "group": "group B",
            "price": 396,
            "volume": 9
        },
        {
            "id": "1.17",
            "group": "group B",
            "price": 256,
            "volume": 5
        },
        {
            "id": "1.18",
            "group": "group B",
            "price": 284,
            "volume": 10
        },
        {
            "id": "1.19",
            "group": "group B",
            "price": 138,
            "volume": 4
        },
        {
            "id": "1.20",
            "group": "group B",
            "price": 154,
            "volume": 7
        },
        {
            "id": "1.21",
            "group": "group B",
            "price": 120,
            "volume": 15
        },
        {
            "id": "1.22",
            "group": "group B",
            "price": 97,
            "volume": 20
        },
        {
            "id": "1.23",
            "group": "group B",
            "price": 169,
            "volume": 10
        },
        {
            "id": "1.24",
            "group": "group B",
            "price": 403,
            "volume": 8
        },
        {
            "id": "1.25",
            "group": "group B",
            "price": 116,
            "volume": 8
        },
        {
            "id": "1.26",
            "group": "group B",
            "price": 411,
            "volume": 13
        },
        {
            "id": "1.27",
            "group": "group B",
            "price": 494,
            "volume": 14
        },
        {
            "id": "1.28",
            "group": "group B",
            "price": 500,
            "volume": 10
        },
        {
            "id": "1.29",
            "group": "group B",
            "price": 468,
            "volume": 14
        },
        {
            "id": "1.30",
            "group": "group B",
            "price": 324,
            "volume": 4
        },
        {
            "id": "1.31",
            "group": "group B",
            "price": 226,
            "volume": 15
        },
        {
            "id": "1.32",
            "group": "group B",
            "price": 380,
            "volume": 9
        },
        {
            "id": "1.33",
            "group": "group B",
            "price": 428,
            "volume": 9
        },
        {
            "id": "1.34",
            "group": "group B",
            "price": 459,
            "volume": 4
        },
        {
            "id": "1.35",
            "group": "group B",
            "price": 41,
            "volume": 5
        },
        {
            "id": "1.36",
            "group": "group B",
            "price": 161,
            "volume": 5
        },
        {
            "id": "1.37",
            "group": "group B",
            "price": 401,
            "volume": 9
        },
        {
            "id": "1.38",
            "group": "group B",
            "price": 320,
            "volume": 19
        },
        {
            "id": "1.39",
            "group": "group B",
            "price": 119,
            "volume": 15
        },
        {
            "id": "1.40",
            "group": "group B",
            "price": 310,
            "volume": 16
        },
        {
            "id": "1.41",
            "group": "group B",
            "price": 14,
            "volume": 11
        },
        {
            "id": "1.42",
            "group": "group B",
            "price": 172,
            "volume": 20
        },
        {
            "id": "1.43",
            "group": "group B",
            "price": 419,
            "volume": 14
        },
        {
            "id": "1.44",
            "group": "group B",
            "price": 446,
            "volume": 13
        },
        {
            "id": "1.45",
            "group": "group B",
            "price": 408,
            "volume": 19
        },
        {
            "id": "1.46",
            "group": "group B",
            "price": 421,
            "volume": 7
        },
        {
            "id": "1.47",
            "group": "group B",
            "price": 270,
            "volume": 6
        },
        {
            "id": "1.48",
            "group": "group B",
            "price": 149,
            "volume": 5
        },
        {
            "id": "1.49",
            "group": "group B",
            "price": 9,
            "volume": 12
        },
        {
            "id": "2.0",
            "group": "group C",
            "price": 270,
            "volume": 10
        },
        {
            "id": "2.1",
            "group": "group C",
            "price": 375,
            "volume": 5
        },
        {
            "id": "2.2",
            "group": "group C",
            "price": 72,
            "volume": 18
        },
        {
            "id": "2.3",
            "group": "group C",
            "price": 183,
            "volume": 7
        },
        {
            "id": "2.4",
            "group": "group C",
            "price": 60,
            "volume": 6
        },
        {
            "id": "2.5",
            "group": "group C",
            "price": 88,
            "volume": 7
        },
        {
            "id": "2.6",
            "group": "group C",
            "price": 10,
            "volume": 13
        },
        {
            "id": "2.7",
            "group": "group C",
            "price": 343,
            "volume": 12
        },
        {
            "id": "2.8",
            "group": "group C",
            "price": 101,
            "volume": 20
        },
        {
            "id": "2.9",
            "group": "group C",
            "price": 470,
            "volume": 13
        },
        {
            "id": "2.10",
            "group": "group C",
            "price": 483,
            "volume": 18
        },
        {
            "id": "2.11",
            "group": "group C",
            "price": 134,
            "volume": 4
        },
        {
            "id": "2.12",
            "group": "group C",
            "price": 215,
            "volume": 17
        },
        {
            "id": "2.13",
            "group": "group C",
            "price": 75,
            "volume": 16
        },
        {
            "id": "2.14",
            "group": "group C",
            "price": 457,
            "volume": 11
        },
        {
            "id": "2.15",
            "group": "group C",
            "price": 16,
            "volume": 16
        },
        {
            "id": "2.16",
            "group": "group C",
            "price": 387,
            "volume": 4
        },
        {
            "id": "2.17",
            "group": "group C",
            "price": 87,
            "volume": 7
        },
        {
            "id": "2.18",
            "group": "group C",
            "price": 361,
            "volume": 14
        },
        {
            "id": "2.19",
            "group": "group C",
            "price": 427,
            "volume": 9
        },
        {
            "id": "2.20",
            "group": "group C",
            "price": 162,
            "volume": 19
        },
        {
            "id": "2.21",
            "group": "group C",
            "price": 180,
            "volume": 6
        },
        {
            "id": "2.22",
            "group": "group C",
            "price": 177,
            "volume": 17
        },
        {
            "id": "2.23",
            "group": "group C",
            "price": 411,
            "volume": 10
        },
        {
            "id": "2.24",
            "group": "group C",
            "price": 445,
            "volume": 14
        },
        {
            "id": "2.25",
            "group": "group C",
            "price": 224,
            "volume": 12
        },
        {
            "id": "2.26",
            "group": "group C",
            "price": 154,
            "volume": 7
        },
        {
            "id": "2.27",
            "group": "group C",
            "price": 380,
            "volume": 14
        },
        {
            "id": "2.28",
            "group": "group C",
            "price": 73,
            "volume": 5
        },
        {
            "id": "2.29",
            "group": "group C",
            "price": 224,
            "volume": 4
        },
        {
            "id": "2.30",
            "group": "group C",
            "price": 69,
            "volume": 5
        },
        {
            "id": "2.31",
            "group": "group C",
            "price": 40,
            "volume": 6
        },
        {
            "id": "2.32",
            "group": "group C",
            "price": 415,
            "volume": 16
        },
        {
            "id": "2.33",
            "group": "group C",
            "price": 84,
            "volume": 18
        },
        {
            "id": "2.34",
            "group": "group C",
            "price": 320,
            "volume": 18
        },
        {
            "id": "2.35",
            "group": "group C",
            "price": 24,
            "volume": 20
        },
        {
            "id": "2.36",
            "group": "group C",
            "price": 138,
            "volume": 15
        },
        {
            "id": "2.37",
            "group": "group C",
            "price": 178,
            "volume": 9
        },
        {
            "id": "2.38",
            "group": "group C",
            "price": 417,
            "volume": 4
        },
        {
            "id": "2.39",
            "group": "group C",
            "price": 148,
            "volume": 4
        },
        {
            "id": "2.40",
            "group": "group C",
            "price": 486,
            "volume": 14
        },
        {
            "id": "2.41",
            "group": "group C",
            "price": 40,
            "volume": 17
        },
        {
            "id": "2.42",
            "group": "group C",
            "price": 56,
            "volume": 19
        },
        {
            "id": "2.43",
            "group": "group C",
            "price": 270,
            "volume": 15
        },
        {
            "id": "2.44",
            "group": "group C",
            "price": 383,
            "volume": 19
        },
        {
            "id": "2.45",
            "group": "group C",
            "price": 365,
            "volume": 4
        },
        {
            "id": "2.46",
            "group": "group C",
            "price": 179,
            "volume": 16
        },
        {
            "id": "2.47",
            "group": "group C",
            "price": 346,
            "volume": 13
        },
        {
            "id": "2.48",
            "group": "group C",
            "price": 329,
            "volume": 18
        },
        {
            "id": "2.49",
            "group": "group C",
            "price": 334,
            "volume": 20
        },
        {
            "id": "2.50",
            "group": "group C",
            "price": 473,
            "volume": 20
        },
        {
            "id": "2.51",
            "group": "group C",
            "price": 482,
            "volume": 13
        },
        {
            "id": "2.52",
            "group": "group C",
            "price": 299,
            "volume": 8
        },
        {
            "id": "2.53",
            "group": "group C",
            "price": 38,
            "volume": 20
        },
        {
            "id": "2.54",
            "group": "group C",
            "price": 421,
            "volume": 17
        },
        {
            "id": "2.55",
            "group": "group C",
            "price": 297,
            "volume": 19
        },
        {
            "id": "2.56",
            "group": "group C",
            "price": 457,
            "volume": 20
        },
        {
            "id": "2.57",
            "group": "group C",
            "price": 352,
            "volume": 13
        },
        {
            "id": "2.58",
            "group": "group C",
            "price": 90,
            "volume": 20
        },
        {
            "id": "2.59",
            "group": "group C",
            "price": 22,
            "volume": 16
        },
        {
            "id": "2.60",
            "group": "group C",
            "price": 167,
            "volume": 7
        },
        {
            "id": "2.61",
            "group": "group C",
            "price": 298,
            "volume": 15
        },
        {
            "id": "2.62",
            "group": "group C",
            "price": 143,
            "volume": 5
        }
    ];
    const getCircleComponent = (props) => {
        // const getArcColor = useOrdinalColorScale({ scheme: 'purple_orange' }, v => v)
        // const { dataWithArc, arcGenerator } = usePie({
        //     data: props.node.data.categories.map((value, id) => ({
        //         id,
        //         value,
        //         hidden: false,
        //         data: value,
        //         color: '',
        //         formattedValue: `${value}`,
        //         label: `${value}`,
        //     })),
        //     radius: props.node.size / 2,
        //     innerRadius: (props.node.size / 2) * 0.7,
        //     sortByValue: true,
        // })

        return (
            <g transform={`translate(${props.node.x},${props.node.y})`}>
                <circle r={props.node.size / 2} stroke="rgb(216, 218, 235)" strokeWidth={12} />
                <circle
                    r={props.node.size / 2}
                    fill="rgb(45, 0, 75)"
                    stroke="rgb(45, 0, 75)"
                    strokeWidth={6}
                />
                {/*{dataWithArc.map((datum, i) => {*/}
                {/*    return <path key={i} d={arcGenerator(datum.arc)} fill={getArcColor(i)} />*/}
                {/*})}*/}
                {/*{props.node.size > 52 && (*/}
                {/*    <text*/}
                {/*        fill="white"*/}
                {/*        textAnchor="middle"*/}
                {/*        dominantBaseline="central"*/}
                {/*        style={{*/}
                {/*            fontSize: 14,*/}
                {/*            fontWeight: 800,*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        {props.node.value}*/}
                {/*    </text>*/}
                {/*)}*/}
            </g>
        );
    };

    const getCustomTick = (tick) => {
        return (
            <g transform={`translate(${tick.x},${tick.y + 22})`}>
                <rect x={-14} y={-6} rx={3} ry={3} width={28} height={24} fill="rgba(0, 0, 0, .05)" />
                <rect x={-12} y={-12} rx={2} ry={2} width={24} height={24} fill="rgb(232, 193, 160)" />
                <line stroke="rgb(232, 193, 160)" strokeWidth={1.5} y1={-22} y2={-12} />
                <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                        fill: '#333',
                        fontSize: 10,
                    }}
                >
                    {tick.value}
                </text>
            </g>
        );
    };
    const getTrendChart = () => {
        const groups = [ 'group A', 'group B', 'group C' ];
        return (
            <div
                style={{ height: 450, overflow: 'scroll'}}
            >
                <ResponsiveSwarmPlot
                    height={groups?.length > 3 ?  groups?.length * 150 : 450}
                    data={data}
                    groups={groups}
                    identity="id"
                    value="price"
                    valueFormat="$.2f"
                    valueScale={{ type: 'linear', min: 0, max: 500, reverse: false }}
                    layout={"horizontal"}
                    size={{
                        key: 'volume',
                        values: [
                            1,
                            20
                        ],
                        sizes: [
                            5,
                            25
                        ]
                    }}
                    forceStrength={4}
                    simulationIterations={100}
                    borderColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                0.6
                            ],
                            [
                                'opacity',
                                0.5
                            ]
                        ]
                    }}
                    margin={{ top: 10, right: 10, bottom: 30, left: 50 }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 10,
                        tickPadding: 5,
                        tickRotation: 0,
                        // legend: 'group if vertical, price if horizontal',
                        // legendPosition: 'middle',
                        // legendOffset: 46
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 10,
                        tickPadding: 5,
                        tickRotation: 0,
                        renderTick:getCustomTick
                        // legend: 'price if vertical, group if horizontal',
                        // legendPosition: 'middle',
                        // legendOffset: -76
                    }}
                    enableGridY={false}
                    enableGridX={false}
                    circleComponent={getCircleComponent}
                />
            </div>
        );
    };

    return getTrendChart();
}

GitLogCommitActivitiesSwarmPlot.propTypes = {
    chartData: PropTypes.object,
};

export default GitLogCommitActivitiesSwarmPlot;
