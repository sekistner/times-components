import React from "react";
import PropTypes from "prop-types";
import { ResponsiveContext } from "@times-components/responsive";
import { LeadOneAndTwoSlice } from "@times-components/slice";
import { PrimaryTile } from "../../tiles";

const LeadOneAndOneSlice = ({ lead, support }) => (
  <ResponsiveContext.Consumer>
    {({ isTablet }) => (
      <LeadOneAndTwoSlice
        renderLead={() => <PrimaryTile tile={lead} withImage />}
        renderSupport1={() => <PrimaryTile tile={support} withImage={isTablet} />}
        renderSupport2={() => null}
      />)}
  </ResponsiveContext.Consumer>
);

LeadOneAndOneSlice.propTypes = {
  lead: PropTypes.shape({}).isRequired,
  support: PropTypes.shape({}).isRequired
};

export default LeadOneAndOneSlice;
