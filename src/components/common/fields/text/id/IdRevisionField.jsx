import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import CopyToClipboardIconBase from "components/common/icons/link/CopyToClipboardIconBase";
import FieldLabelBase from "components/common/fields/FieldLabelBase";
import {DATE_FORMATS, getFormattedDate} from "components/common/fields/date/DateFieldBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export const getFormattedRevisionFromId = (id) => {
  const parsedId = DataParsingHelper.parseMongoDbId(id);

  if (parsedId == null) {
    return undefined;
  }

  const revisionDate = DataParsingHelper.parseObjectIdIntoDate(parsedId);

  return `REV_${getFormattedDate(revisionDate, DATE_FORMATS.REVISION)}`;
};

export default function IdRevisionField(
  {
    model,
    fieldName,
    className,
    showLabel,
  }) {
  const revision = getFormattedRevisionFromId(model?.getData(fieldName));

  const getClipboardButton = () => {
    return (
      <CopyToClipboardIconBase
        className={"my-auto ml-3"}
        copyString={model?.getData(fieldName)}
      />
    );
  };

  if (revision == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <div className="w-100 d-flex">
        <FieldLabelBase
          label={"Revision"}
          showLabel={showLabel}
        />
        <span>{revision}</span>
        {getClipboardButton()}
      </div>
    </FieldContainer>
  );
}

IdRevisionField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};

IdRevisionField.defaultProps = {
  fieldName: "_id"
};