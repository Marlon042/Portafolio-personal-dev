import sanitizeHtml from 'sanitize-html'

export function sanitizeProjectDescription(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      'p', 'br',
      'h2', 'h3', 'h4',
      'ul', 'ol', 'li',
      'blockquote', 'pre', 'code',
      'strong', 'em', 'u', 's', 'mark',
      'a', 'img',
    ],
    allowedAttributes: {
      p: ['style'],
      h2: ['style'],
      h3: ['style'],
      h4: ['style'],
      a: ['href', 'title', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height'],
    },
    allowedStyles: {
      p: { 'text-align': [/^(left|right|center|justify)$/] },
      h2: { 'text-align': [/^(left|right|center|justify)$/] },
      h3: { 'text-align': [/^(left|right|center|justify)$/] },
      h4: { 'text-align': [/^(left|right|center|justify)$/] },
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, target: '_blank', rel: 'noopener noreferrer' },
      }),
    },
  })
}

export function sanitizeRequiredProjectDescription(html: string): string {
  const sanitized = sanitizeProjectDescription(html)
  const text = sanitizeHtml(sanitized, { allowedTags: [], allowedAttributes: {} }).trim()
  if (!text) throw new Error('Project description is required')
  return sanitized
}
