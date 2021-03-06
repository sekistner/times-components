import { iterator } from "@times-components/test-utils";
import { readFileSync } from "fs";
import { getCacheKey, process as transform } from "../src/source-loader";

const tests = [
  {
    name: "monorepo package hash",
    test() {
      const filePath = "./fixtures/times-components/src/test.js";
      const fileContents = readFileSync(filePath).toString();

      expect(getCacheKey(fileContents, filePath, "", {})).toMatchSnapshot();
    }
  },
  {
    name: "transformed non-monorepo file",
    test() {
      const fileContents = readFileSync("./fixtures/test.js").toString();

      const { code } = transform(fileContents, "./fixtures/test.js", {
        coveragePathIgnorePatterns: [],
        cwd: "/home/cwd"
      });

      expect(code).toMatchSnapshot();
    }
  },
  {
    name: "transformed monorepo src file",
    test() {
      const fileContents = readFileSync(
        "./fixtures/times-components/dist/test.js"
      ).toString();

      const { code } = transform(
        fileContents,
        "./fixtures/times-components/dist/test.js",
        {
          coveragePathIgnorePatterns: [],
          cwd: "/home/cwd"
        }
      );

      expect(code).toMatchSnapshot();
    }
  }
];

iterator(tests);
