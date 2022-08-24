import React from "react";
import PropTypes from "prop-types";
//import OpseraHeaderIcon from "temp-library-components/icon/opsera/OpseraHeaderIcon";

function FreeTrialSignupHeader({className}) {
  return (
    <div className={"darkBackgroundText"}>

        <img alt="Opsera"
             src="/img/logos/opsera_bird_infinity_171_126.png"
             width="171"
             height="126"
        />


      <h2 style={{ textAlign: "center" }}>Lets get started!</h2>
</div>
)
  ;
}

FreeTrialSignupHeader.propTypes = {
  className: PropTypes.string,
};

export default FreeTrialSignupHeader;
