export default {
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    },
    { name: "subtitle", title: "Subtitle", type: "string" },
    { name: "heroImage", title: "Hero Image", type: "image" },
    { name: "client", title: "Client", type: "string" },
    { name: "industry", title: "Industry", type: "string" },
    { name: "publishedAt", title: "Published At", type: "date" },
    { name: "excerpt", title: "Excerpt", type: "text" },
    { name: "content", title: "Content", type: "array", of: [{ type: "block" }] },
  ],
};
