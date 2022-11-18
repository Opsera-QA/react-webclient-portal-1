import React from "react";
import PropTypes from "prop-types";
import ToolTypeFilter from "./ToolTypeFilter";

function InlineToolTypeFilter({ fieldName, filterModel, setFilterModel, className, loadData}) {
    const setDataFunction = (fieldName, selectedOption) => {
        let newDataObject = filterModel;
        newDataObject.setData(fieldName, selectedOption?.value);
        loadData(newDataObject);
    };

    return (
        <ToolTypeFilter
            filterModel={filterModel}
            setFilterModel={setFilterModel}
            fieldName={fieldName}
            className={className}
            setDataFunction={setDataFunction}
            inline={true}
        />
    );
}

InlineToolTypeFilter.propTypes = {
    filterModel: PropTypes.object,
    setFilterModel: PropTypes.func,
    className: PropTypes.string,
    fieldName: PropTypes.string,
    loadData: PropTypes.func
};

export default InlineToolTypeFilter;


