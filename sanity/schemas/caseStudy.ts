import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Project name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "result",
      title: "Result (headline)",
      type: "string",
      description:
        "The bold, result-first headline shown on the card. e.g. 'Cut order processing from 3 hours to 4 minutes.'",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "clientName",
      title: "Client name (optional)",
      type: "string",
    }),
    defineField({
      name: "industry",
      title: "Industry",
      type: "string",
      description: "e.g. Beverage, Skincare, Snacks, Supplements",
    }),
    defineField({
      name: "problem",
      title: "Problem",
      type: "text",
      rows: 3,
      description: "What was broken or manual before.",
    }),
    defineField({
      name: "whatWasBuilt",
      title: "What was built",
      type: "text",
      rows: 3,
      description: "Short description of the solution shipped.",
    }),
    defineField({
      name: "toolsUsed",
      title: "Tools used",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "e.g. n8n, Make, Airtable, OpenAI",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Live", value: "live" },
          { title: "In progress", value: "in progress" },
          { title: "Beta", value: "beta" },
        ],
        layout: "radio",
      },
      initialValue: "live",
    }),
    defineField({
      name: "timeSaved",
      title: "Time saved per week",
      type: "string",
      description: "e.g. '15+ hours/week', '5 hrs → 30 min'",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail (card image)",
      type: "image",
      description: "Main image shown on the homepage card.",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      description: "Additional images shown on the case study detail page (workflow screenshots, diagrams, etc.)",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
            defineField({
              name: "caption",
              title: "Caption (optional)",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first.",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "result",
      media: "thumbnail",
    },
  },
});
