export const schemaTypes = [
  {
    type: "document",
    name: "post",
    title: "Post",
    fields: [
      {
        type: "string",
        name: "title",
        title: "Title",
      },
      {
        type: "string",
        name: "description",
        description: "Enter a short description of the post",
        title: "Description",
      },
      {
        type: "slug",
        name: "slug",
        title: "Slug",
        options: {
          source: "title",
          maxLength: 96,
        },
      },
      {
        type: "image",
        name: "mainImage",
        title: "Main image",
        options: {
          hotspot: true,
        },
      },
      {
        type: "array",
        name: "categories",
        title: "Categories",
        of: [
          {
            type: "reference",
            name: "category",
            to: [
              {
                type: "category",
              },
            ],
          },
        ],
      },
      {
        type: "array",
        name: "tags",
        title: "Tags",
        of: [
          {
            type: "reference",
            name: "tag",
            to: [
              {
                type: "tag",
              },
            ],
          },
        ],
      },
      {
        type: "date",
        name: "publishedAt",
        title: "Published at",
      },
      {
        type: "array",
        name: "body",
        title: "body",
        of: [
          {
            type: "block",
          },
          {
            type: "image",
          },
          {
            name: "code",
            title: "Code Block",
            type: "code",
            options: {
              withFilename: true, // optional
              highlightedLines: true, // optional
            },
          },
        ],
      },
      {
        type: "reference",
        name: "author",
        title: "Author",
        to: [
          {
            type: "author",
          },
        ],
      },
    ],
  },
  {
    type: "document",
    name: "category",
    title: "Category",
    fields: [
      {
        type: "string",
        name: "title",

        title: "Title",
      },
      {
        type: "slug",
        name: "slug",
        title: "Slug",
        options: {
          source: "title",
          maxLength: 96,
        },
      },
    ],
  },
  {
    type: "document",
    name: "tag",
    title: "Tag",
    fields: [
      {
        type: "string",
        name: "title",
        title: "Title",
      },
      {
        type: "slug",
        name: "slug",
        title: "Slug",
        options: {
          source: "title",
          maxLength: 96,
        },
      },
    ],
  },
  {
    type: "document",
    name: "siteSettings",
    title: "Site Settings",
    fields: [
      {
        type: "string",
        name: "title",
        title: "Site title",
      },
      {
        type: "string",
        name: "description",
        title: "Site description",
      },
      {
        type: "image",
        name: "logo",
        title: "Logo",
      },
      {
        type: "url",
        name: "url",
        title: "Site URL",
      },
    ],
  },
  {
    type: "document",
    name: "author",
    title: "Author",
    fields: [
      {
        type: "string",
        name: "name",
        title: "Name",
      },
      {
        type: "string",
        name: "email",
        title: "Email",
      },
      {
        type: "string",
        name: "twitterHandle",
        title: "Twitter handle",
      },
      {
        type: "image",
        name: "image",
        title: "image",
      },
      {
        type: "string",
        name: "bio",
        title: "Bio",
      },
    ],
  },
];
