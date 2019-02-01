import { fontFactory, spacing } from "@times-components/styleguide";

const styles = {
  headline: {
    ...fontFactory({
      font: "headline",
      fontSize: "tileHeadline"
    })
  },
  summaryContainer: {
    marginHorizontal: spacing(2),
    marginVertical: spacing(1)
  }
};

export default styles;
