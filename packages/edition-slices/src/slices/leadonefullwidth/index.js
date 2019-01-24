import React from "react";
import PropTypes from "prop-types";
import { PrimaryTile } from "../../tiles";

const LeadOneFullWidthSlice = ({ lead }) => (
  <PrimaryTile tile={lead} withImagePosition="bottom" />
);

LeadOneFullWidthSlice.propTypes = {
  lead: PropTypes.shape({}).isRequired
};

export default LeadOneFullWidthSlice;
