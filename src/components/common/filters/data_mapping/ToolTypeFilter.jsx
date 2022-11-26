import React from "react";
import PropTypes from "prop-types";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";
import {tagTypes} from "components/common/list_of_values_input/settings/tags/TagTypeSelectInput";

function ToolTypeFilter({ fieldName, filterModel, setFilterModel, className, setDataFunction, inline}) {
    if (filterModel == null) {
        return null;
    }

    const TOOL_TYPES = [
        { value: "gitlab", text: "Gitlab" },
        { value: "github", text: "Github" },
        { value: "bitbucket", text: "Bitbucket" },
        { value: "jira", text: "Jira" },
        { value: "jenkins", text: "Jenkins" },
        { value: "sonar", text: "Sonar" },
    ];

    return (
        <FilterSelectInputBase
            fieldName={fieldName}
            placeholderText={"Filter by Tool Type"}
            setDataObject={setFilterModel}
            dataObject={filterModel}
            selectOptions={TOOL_TYPES}
            className={className}
            setDataFunction={setDataFunction}
            inline={inline}
        />
    );
}

ToolTypeFilter.propTypes = {
    filterModel: PropTypes.object,
    setFilterModel: PropTypes.func,
    className: PropTypes.string,
    setDataFunction: PropTypes.func,
    inline: PropTypes.bool,
    fieldName: PropTypes.string
};

ToolTypeFilter.defaultProps = {
    fieldName: "tool_identifier"
};

export default ToolTypeFilter;
