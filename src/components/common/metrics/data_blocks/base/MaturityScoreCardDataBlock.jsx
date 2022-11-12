import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DataPointInfoOverlayIcon from "components/common/icons/metric/info/DataPointInfoOverlayIcon";
import OverlayIconBase from "components/common/icons/OverlayIconBase";
import {dataPointHelpers} from "components/common/helpers/metrics/data_point/dataPoint.helpers";
import TwoLineScoreDataBlock from "../../score/TwoLineScoreDataBlock";
import JiraTeamNamesFilterMultiSelectInput
    from "../../../list_of_values_input/insights/charts/jira/JiraTeamNamesFilterMultiSelectInput";
import {faCircleInfo} from "@fortawesome/pro-solid-svg-icons";
import {getMaturityScoreText} from "../../../../insights/charts/charts-helpers";
import PlatformSystemParameterTypeSelectInput
    from "../../../../admin/system_parameters/details/inputs/PlatformSystemParameterTypeSelectInput";

function MaturityScoreCardDataBlock(
    {
        maturityScore,
        text,
        className,
        icon,
        iconOverlayTitle,
        iconOverlayBody,
        maturityColor,
    }) {

    // const getScoreText = (maturityScore) => {
    //     switch (maturityScore) {
    //         case `elite`:
    //             return 'Elite';
    //         case `high`:
    //             return 'High';
    //         case `medium`:
    //             return 'Medium';
    //         case `low`:
    //             return 'Low';
    //         default:
    //             return 'NA';
    //     }
    // };
    //
    // const getMaturityColorClass = () => {
    //     switch (maturityScore) {
    //         case `elite`:
    //             return 'maturity-card-elite-color';
    //         case `high`:
    //             return 'maturity-card-high-color';
    //         case `medium`:
    //             return 'maturity-card-medium-color';
    //         case `low`:
    //             return 'maturity-card-low-color';
    //         default:
    //             return 'maturity-card-default-color';
    //     }
    // };

    const getLeftDataBlockIcon = () => {
        if (icon) {
            return (
                <div className={"p-1"}>
                    <OverlayIconBase
                        icon={icon}
                        overlayTitle={iconOverlayTitle}
                        overlayBody={iconOverlayBody}
                    />
                </div>
            );
        }
    };

    // const getMaturityScore = () => {
    //     if (maturityScore) {
    //         return (
    //             <div className={"dark-gray-text-primary maturity-card-block-content-text font-inter-light-500"}>
    //                 {getScoreText(maturityScore)}
    //             </div>
    //         );
    //     }
    // };
    //
    // const getSubtitle = () => {
    //     if (bottomText) {
    //         return (
    //             <div className={"metric-block-footer-text"}>
    //                 {bottomText}
    //             </div>
    //         );
    //     }
    // };

    return (
        // <div className={`${className} ${getMaturityColorClass(maturityScore)} pt-4 maturity-card-border`}>
        //     <Row className={"w-100 h-100 mx-auto text-center maturity-card-content-bg maturity-card-border"}>
        //         <div className={"data-block-icon"}>
        //             {getLeftDataBlockIcon()}
        //         </div>
        //         <Col xs={12} className={"my-auto text-center"}>
        //             {getMaturityScore()}
        //         </Col>
        //         <Col xs={12} className={"pb-3 mt-auto text-center"}>
        //             {getSubtitle()}
        //         </Col>
        //     </Row>
        // </div>
        <Row className={`${className} ml-2 p-2 d-flex maturity-top-border ${maturityColor}`}>
            {getLeftDataBlockIcon()}
            <div onClick={()=>{console.log("open mat");}}
                className={"pointer d-flex pr-1 dark-gray-text-primary maturity-card-block-content-text font-inter-light-500"}>
                {text}{maturityScore}
            </div>
        </Row>
    );
}

MaturityScoreCardDataBlock.propTypes = {
    maturityScore: PropTypes.any,
    maturityColor: PropTypes.string,
    text: PropTypes.any,
    className: PropTypes.string,
    icon: PropTypes.object,
    dataPoint: PropTypes.object,
    iconOverlayTitle: PropTypes.string,
    iconOverlayBody: PropTypes.any,
};

MaturityScoreCardDataBlock.defaultProps = {
    text: "Maturity Score: ",
};
export default MaturityScoreCardDataBlock;