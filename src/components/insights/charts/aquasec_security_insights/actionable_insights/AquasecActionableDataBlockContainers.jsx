import React from "react";
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import TwoLineScoreDataBlock from "components/common/metrics/score/TwoLineScoreDataBlock";
import DataBlockBoxContainer from "components/common/metrics/data_blocks/DataBlockBoxContainer";
import {
    faCheckCircle,
    faExclamationTriangle,
    faFolders,
    faSirenOn,
    faExclamation,
} from "@fortawesome/pro-light-svg-icons";
import {faCompass, faShieldCheck} from "@fortawesome/pro-thin-svg-icons";

function AquasecActionableDataBlockContainers({ data, level }) {
    let className = `p-2 dark-gray-text-primary`;

    const getColor = (metric) => {
        if (metric > 0) {
            return "danger-red";
        }
        return "green";
    };

    const getIcon = (level) => {
        if (level == "low") {
            return faExclamation;
        }
        if (level == "medium") {
            return faExclamationTriangle;
        }
        if (level == "high") {
            return faSirenOn;
        }
    };

    return (
        <div>
            <Row className="justify-content-sm-center px-2">
                <Col xl={3} lg={3} sm={4} className={"my-3"}>
                    <DataBlockBoxContainer showBorder={true}>
                        <TwoLineScoreDataBlock
                            className={className}
                            score={Array.isArray(data?.TotalIssues) ? data?.TotalIssues[0]?.issues : 0}
                            icon={faCompass}
                            subtitle={"Total Issues"}
                        />
                    </DataBlockBoxContainer>
                </Col>
                <Col xl={3} lg={3} sm={4} className={"my-3"}>
                    <DataBlockBoxContainer showBorder={true}>
                        <TwoLineScoreDataBlock
                            className={className}
                            score={Array.isArray(data?.TotalProjects) ? data?.TotalProjects[0]?.projects: 0}
                            icon={faFolders}
                            subtitle={"Total Projects"}
                        />
                    </DataBlockBoxContainer>
                </Col>
                <Col xl={3} lg={3} sm={4} className={"my-3"}>
                    <DataBlockBoxContainer showBorder={true}>
                        <TwoLineScoreDataBlock
                            className={className}
                            score={Array.isArray(data?.TotalScans) ? data?.TotalScans[0]?.scans: 0}
                            icon={faCheckCircle}
                            subtitle={"Total Scans"}
                        />
                    </DataBlockBoxContainer>
                </Col>
                <Col xl={3} lg={3} sm={4} className={"my-3"}>
                    <DataBlockBoxContainer showBorder={true}>
                        <TwoLineScoreDataBlock
                            className={className}
                            score={Array.isArray(data?.TotalCVEs) ? data?.TotalCVEs[0]?.cveNumber : 0}
                            icon={faShieldCheck}
                            subtitle={"Total CVEs"}
                        />
                    </DataBlockBoxContainer>
                </Col>
            </Row>
        </div>
    );
}

AquasecActionableDataBlockContainers.propTypes = {
    data: PropTypes.object,
    level: PropTypes.string,
};

export default AquasecActionableDataBlockContainers;