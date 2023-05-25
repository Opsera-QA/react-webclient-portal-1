import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import toolsActions from "components/inventory/tools/tools-actions";
import CreateButton from "components/common/buttons/saving/CreateButton";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function CreateTaskSpecificInputFieldsButton(
    {
        onSuccessFunction,
        toolModel,
        setToolModel,
        customLabel,
        icon,
        variant,
    }) {
    const {
        getAccessToken,
        cancelTokenSource,
    } = useComponentStateReference();

    const handleToolCreation = async () => {
        setToolModel(toolModel);
        onSuccessFunction();
    };

    return (
        <CreateButton
            showSuccessToasts={false}
            addAnotherOption={false}
            customLabel={customLabel}
            variant={variant}
            icon={icon}
            createRecord={handleToolCreation}
            recordDto={toolModel}
        />
    );
}

CreateTaskSpecificInputFieldsButton.propTypes = {
    onSuccessFunction: PropTypes.func,
    toolModel: PropTypes.object,
    setToolModel: PropTypes.func,
    icon: PropTypes.object,
    customLabel: PropTypes.string,
    variant: PropTypes.string,
};


