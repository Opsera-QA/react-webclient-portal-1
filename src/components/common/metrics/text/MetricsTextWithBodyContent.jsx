import React from "react";
import PropTypes from "prop-types";
import DataBlockBoxContainer from "../data_blocks/DataBlockBoxContainer";

function MetricsTextWithBodyContent({ titleText, contentText }) {

    if (titleText == null) {
        return null;
    }

    return (
        <div className={"p-2"} style={{minHeight: '10rem'}}>
            <div style={{fontWeight: 'bolder', fontSize: '1.3rem'}}>{titleText} </div>
            <span style={{fontSize: '1rem'}}>{contentText}</span>
        </div>
    );
}

MetricsTextWithBodyContent.propTypes = {
    titleText: PropTypes.string,
    contentText: PropTypes.node,
};

export default MetricsTextWithBodyContent;