import React from "react";
import ArticleTemplate from "./src/article-template";

export default {
  children: [
    {
      component: () => <ArticleTemplate />,
      name: "ArticleTemplate",
      type: "story"
    }
  ],
  name: "ArticleTemplate"
};
