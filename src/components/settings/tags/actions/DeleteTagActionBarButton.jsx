import React from "react";
import PropTypes from "prop-types";
import {faTrash} from "@fortawesome/pro-light-svg-icons";
import ActionBarButton from "components/common/actions/buttons/ActionBarButton";
import DeleteConfirmationOverlay from "components/common/overlays/center/delete/DeleteConfirmationOverlay";
import useComponentStateReference from "hooks/useComponentStateReference";
import {useHistory} from "react-router-dom";
import useTagActions from "hooks/settings/tags/useTagActions";
import TagRoleHelper from "@opsera/know-your-role/roles/settings/tags/tagRole.helper";
import {tagHelper} from "components/settings/tags/tag.helper";

export default function DeleteTagActionBarButton(
  {
    tagModel,
    className,
  }) {
  const {
    userData,
    toastContext,
  } = useComponentStateReference();
  const history = useHistory();
  const tagActions = useTagActions();

  const handleDeleteFunction = async () => {
    return await tagActions.deleteTag(
      tagModel?.getMongoDbId(),
    );
  };

  const showOverlayFunction = async () => {
    toastContext.showOverlayPanel(
      <DeleteConfirmationOverlay
        type={"Tag"}
        handleDeleteFunction={handleDeleteFunction}
        afterDeleteFunction={() => history.push(tagHelper.getManagementScreenLink())}
      />
    );
  };

  if (TagRoleHelper.canDeleteTags(userData) !== true) {
    return null;
  }

  return (
    <ActionBarButton
      action={showOverlayFunction}
      icon={faTrash}
      iconClasses={"danger-red"}
      popoverText={`Delete this Tag`}
      className={className}
    />
  );
}

DeleteTagActionBarButton.propTypes = {
  tagModel: PropTypes.object,
  className: PropTypes.string,
};
