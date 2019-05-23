const horizontalStyles = {
  container: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  flagStyle: {
    alignItems: "flex-start",
    width: "75%"
  }
};

const tileStar = {
  position: "absolute",
  right: 10,
  bottom: 5
};

const starPadding = {
  paddingBottom: 25
};

const verticalStyles = {
  container: {
    flexDirection: "column"
  },
  starButton: {
    alignSelf: "center"
  }
};

export { horizontalStyles, verticalStyles, tileStar, starPadding };
