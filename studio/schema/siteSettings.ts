import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      description: 'Optional - Leave blank if not applicable',
    }),
    defineField({
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
      description: 'Optional - Leave blank if not applicable',
    }),
    defineField({
      name: 'etsyUrl',
      title: 'Etsy URL',
      type: 'url',
      description: 'Optional - Leave blank if not applicable',
    }),
    defineField({
      name: 'pinterestUrl',
      title: 'Pinterest URL',
      type: 'url',
      description: 'Optional - Leave blank if not applicable',
    }),
    defineField({
      name: 'disclaimer',
      title: 'Footer Disclaimer',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Disclaimer text for footer. You can add links to government sites (e.g., Michigan Cottage Food Laws)',
      initialValue: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'This company operates under Michigan\'s Cottage Food Laws',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return {
        title: 'Site Settings',
      }
    },
  },
})
