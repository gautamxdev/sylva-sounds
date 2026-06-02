export default {
  name: "track",
  title: "Track",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    },
    { name: "audioFile", title: "Audio File", type: "file" },
    { name: "artwork", title: "Artwork", type: "image" },
    { name: "duration", title: "Duration (seconds)", type: "number" },
    { name: "bpm", title: "BPM", type: "number" },
    {
      name: "mood",
      title: "Mood",
      type: "array",
      of: [{ type: "string" }],
    },
    { name: "genre", title: "Genre", type: "string" },
    {
      name: "usageTags",
      title: "Usage Tags",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "licensingTier",
      title: "Licensing Tier",
      type: "string",
      options: {
        list: [
          { title: "Free Preview", value: "free-preview" },
          { title: "Standard", value: "standard" },
          { title: "Exclusive", value: "exclusive" },
        ],
      },
    },
    { name: "description", title: "Description", type: "text" },
    { name: "featured", title: "Featured", type: "boolean" },
  ],
};
