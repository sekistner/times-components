import React from "react";
import TestRenderer from "react-test-renderer";
import Datawrapper from "../src/datawrapper";

export default () => {
  it("renders correctly", () => {
    const testInstance = TestRenderer.create(
      <Datawrapper />
    );

    expect(testInstance.toJSON()).toMatchSnapshot();
  });
};
