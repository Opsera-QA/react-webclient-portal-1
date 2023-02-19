import React, {useEffect, useState, useContext, useMemo} from "react";
import PropTypes from "prop-types";
import { ResponsiveCirclePackingCanvas } from '@nivo/circle-packing';
import { Col} from "react-bootstrap";
import {
    METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY_VNEXT
} from "../../../../common/helpers/metrics/metricTheme.helpers";
import Row from "react-bootstrap/Row";
import gitLogDeveloperActivitiesMetaData from "./gitlog-developer-360-metedata";
import {getLimitedTableTextColumn, getTableTextColumn} from "../../../../common/table/table-column-helpers";
import {getField} from "../../../../common/metadata/metadata-helpers";
import CustomTable from "../../../../common/table/CustomTable";


function GitLogDeveloper360CirclePacking({ chartData }) {
    const [zoomedId, setZoomedId] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [currentZoomLevel, setCurrentZoomLevel] = useState(0);
    useEffect(() => {
        setTableData([]);
        setZoomedId(null);
        setCurrentZoomLevel(0);
    }, [chartData]);
    const getTableData = (node) => {
        if(node?.data?.childType === 'commit') {
            const tableData = [
                {
                    name:"Commit Title",
                    value:node?.data?.name
                },
                {
                    name:"Author",
                    value:node?.data?.author
                },
                {
                    name:"Lines of Code",
                    value:node?.data?.codeLinesAdded?.toString()
                },
                {
                    name:"Commit Review Score",
                    value:node?.data?.totalCommitScore?.toFixed(0).toString()
                },
                {
                    name:"Last GC Scan",
                    value:"N/A"
                }
            ];
            return tableData;
        } else {
            const tableData = [
                {
                    name:"Name",
                    value:node?.data?.name
                },
                {
                    name:"Total Commits",
                    value:node?.data?.commitsCount?.toString()
                },
                {
                    name:"Lines of Code",
                    value:node?.data?.codeLinesAdded?.toString()
                },
                {
                    name:"Commit Review Score",
                    value:node?.data?.totalCommitScore?.toFixed(0).toString()
                },
                {
                    name:"Total Tickets",
                    value: "N/A"
                },
                {
                    name:"Completed Tickets",
                    value: "N/A"
                }
            ];
            return tableData;
        }

    };

    const onNodeSelect = (node) => {
        setTableData(getTableData(node));
        const zoomId = zoomedId === node.id ? null : node.id;
        setZoomedId(zoomId);
        setCurrentZoomLevel((currentZoomLevel === node.depth && zoomId === null) ? 0 : node.depth);
    };

    const filterLabel = (props) => {
        const labelLevel = currentZoomLevel?currentZoomLevel:1;
        if((labelLevel === props.node.depth) ){
            return true;
        }
        return false;
    };

    const fields = gitLogDeveloperActivitiesMetaData.fields;
    const columns = useMemo(
        () => [
            getTableTextColumn(getField(fields, "name")),
            getLimitedTableTextColumn(getField(fields, "value"), 50),
        ],
        []
    );
    const getColor = (props) => {
        return METRIC_THEME_NIVO_CHART_PALETTE_COLORS_ARRAY_VNEXT[props.depth];
    };
    const getTrendChart = () => {
        return (
            <div>
                <Row>
                <Col>
                <div
                    style={{ height: "450px"}}
                >
                    <ResponsiveCirclePackingCanvas
                        data={chartData?.chartData}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                        id="name"
                        value="commitScore"
                        padding={4}
                        enableLabels={true}
                        labelsFilter={filterLabel}
                        colors={getColor}
                        labelsSkipRadius={20}
                        labelTextColor={"black"}
                        zoomedId={zoomedId}
                        onClick={onNodeSelect}
                    />
                </div>
                </Col>
                    <Col>
                       <CustomTable
                           columns={columns}
                           data={tableData}
                           noDataMessage={"Click on a node to view details"}
                       />
                    </Col>
                </Row>
            </div>
        );
    };

    return getTrendChart();
}

GitLogDeveloper360CirclePacking.propTypes = {
    chartData: PropTypes.object,
    kpiConfiguration: PropTypes.object,
};

export default GitLogDeveloper360CirclePacking;
