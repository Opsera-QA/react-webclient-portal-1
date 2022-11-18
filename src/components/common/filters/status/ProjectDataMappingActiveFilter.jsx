import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

const statusOptions = [
    {text: "All", value: undefined},
    {text: "Active", value: "active"},
    {text: "Inactive", value: "inactive"}
];

function ProjectDataMappingActiveFilter({ filterDto, setFilterDto, className, fieldName, inline}) {
    if (filterDto == null) {
        return null;
    }

    return (
        <FilterSelectInputBase
            className={className}
            fieldName={fieldName}
            inline={inline}
            setDataObject={setFilterDto}
            dataObject={filterDto}
            selectOptions={statusOptions}
        />
    );
}

ProjectDataMappingActiveFilter.propTypes = {
    filterDto: PropTypes.object,
    setFilterDto: PropTypes.func,
    className: PropTypes.string,
    fieldName: PropTypes.string,
    inline: PropTypes.bool
};

ProjectDataMappingActiveFilter.defaultProps = {
    fieldName: "active"
};

export default ProjectDataMappingActiveFilter;