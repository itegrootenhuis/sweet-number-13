import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'galleryPage',
  title: 'Gallery Page',
  type: 'document',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Optional. Describe the image for accessibility.',
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Optional title shown in the modal',
            },
            {
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [{ type: 'block' }],
              description: 'Optional rich text shown in the modal',
            },
          ],
          preview: {
            select: { title: 'title', alt: 'alt' },
            prepare({ title, alt }: { title?: string; alt?: string }) {
              return {
                title: title || alt || 'Image',
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Gallery Page',
      }
    },
  },
})
