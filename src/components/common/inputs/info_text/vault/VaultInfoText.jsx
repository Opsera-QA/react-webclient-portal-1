import React from "react";
import PropTypes from "prop-types";

function VaultInfoText({ storedInVault, errorMessage }) {
  if (errorMessage != null && errorMessage !== "") {
    return (
      <div className="invalid-feedback">
        <div>{errorMessage}</div>
      </div>
    );
  }

  if (storedInVault) {
    return (
      <small className="text-muted form-text">
        <span>This credential is securely stored in the vault.</span>
      </small>
    );
  }

  return (
    <small className="text-muted form-text">
      <span>This credential will be securely stored in the vault.</span>
    </small>
  );
}

VaultInfoText.propTypes = {
  storedInVault: PropTypes.bool,
  errorMessage: PropTypes.string
};

export default VaultInfoText;