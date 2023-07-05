import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import H5FieldSubHeader from "../../../../../../../../common/fields/subheader/H5FieldSubHeader";

function NameSpacePrefixListView({ wizardModel, setWizardModel }) {
  const [selectedManagedPackageList, setSelectedManagedPackageList] = useState(
    [],
  );

  useEffect(() => {
    const selectedItems = wizardModel
      ?.getData("managedPackageList")
      ?.filter(
        (e) => e.name === wizardModel?.getData("selectedManagedPackageKey"),
      );
    let newWizardModel = { ...wizardModel };
    newWizardModel.setData("selectedFieldList", []);
    newWizardModel.setData("filterQuery", "");
    newWizardModel.setData("selectedManagedPackageList", selectedItems);
    setWizardModel({ ...newWizardModel });
    setSelectedManagedPackageList(selectedItems);
  }, [wizardModel?.getData("selectedManagedPackageKey")]);

  const listItems =
    selectedManagedPackageList &&
    selectedManagedPackageList.length > 0 &&
    selectedManagedPackageList?.map((item, index) => {
      return (
        <li
          className={"mt-3"}
          key={index.toString()}
        >
          {item?.namespacePrefix}
        </li>
      );
    });
  return (
    <div className={`mt-4 p-3 message-field info-message-field`}>
      <H5FieldSubHeader subheaderText={`Selected Namespaces`} />
      <ul>{listItems}</ul>
    </div>
  );
}

NameSpacePrefixListView.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
};

export default NameSpacePrefixListView;
