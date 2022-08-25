import React from "react";
import PropTypes from "prop-types";

export default function FreeTrialSignupHeader({ className }) {
  // <div className={"darkBackgroundText d-flex"}>
  //   <img alt="Opsera"
  //        src="/img/logos/opsera_bird_infinity_171_126.png"
  //        width="171"
  //        height="126"
  //   />
  //   <div className={"mx-auto mt-auto"}>
  //     <h2 style={{ textAlign: "center" }}>{`Let's get started!`}</h2>
  //   </div>
  //   <div
  //     style={{
  //       width: 171,
  //     }}
  //   />
  // </div>

  return (
    <div className={"darkBackgroundText pt-2 pb-4"}>
      {/*<img*/}
      {/*  alt="Opsera"*/}
      {/*  src="/img/logos/opsera_bird_infinity_171_126.png"*/}
      {/*  width="171"*/}
      {/*  height="126"*/}
      {/*/>*/}
      <h2 style={{ textAlign: "center" }}>{`Let's get started!`}</h2>
    </div>
  );
}

FreeTrialSignupHeader.propTypes = {
  className: PropTypes.string,
};