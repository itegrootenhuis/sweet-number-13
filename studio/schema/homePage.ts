import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImageDesktop',
      title: 'Desktop Hero Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Recommended: 1920×800 or similar.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImageMobile',
      title: 'Mobile Hero Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Recommended: 800×1200 or similar.',
    }),
    defineField({
      name: 'heroLogoImage',
      title: 'Hero Logo Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
      description: 'If set, shown in the center of the hero instead of the title and subtitle.',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroTextColor',
      title: 'Hero Text Color',
      type: 'string',
      options: {
        list: [
          { title: 'Light', value: 'light' },
          { title: 'Dark', value: 'dark' },
        ],
        layout: 'radio',
      },
      initialValue: 'light',
      description: 'Choose light text (white) for dark images or dark text for light images',
    }),
    defineField({
      name: 'aboutTitle',
      title: 'About Us Title',
      type: 'string',
    }),
    defineField({
      name: 'aboutContent',
      title: 'About Us Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [{ type: 'block' }],
              description: 'Optional rich text',
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              description: 'Recommended: 600×600 or similar.',
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Optional',
            },
          ],
          preview: {
            select: { title: 'title' },
            prepare({ title }: { title?: string }) {
              return { title: title || 'Product' }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'optionalSection1Title',
      title: 'Optional Section 1 Title',
      type: 'string',
    }),
    defineField({
      name: 'optionalSection1Content',
      title: 'Optional Section 1 Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'optionalSection1Image',
      title: 'Optional Section 1 Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'optionalSection1ImageAlt',
      title: 'Optional Section 1 Image Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'optionalSection2Title',
      title: 'Optional Section 2 Title',
      type: 'string',
    }),
    defineField({
      name: 'optionalSection2Content',
      title: 'Optional Section 2 Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'optionalSection2Image',
      title: 'Optional Section 2 Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'optionalSection2ImageAlt',
      title: 'Optional Section 2 Image Alt Text',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
    },
  },
})
