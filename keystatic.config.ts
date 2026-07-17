import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: import.meta.env.DEV
    ? { kind: 'local' }
    : { kind: 'github', repo: 'mehmetfatihakgun-projeler/stokpratik' },
  collections: {
    kategoriler: collection({
      label: 'Kategoriler',
      slugField: 'name',
      path: 'src/content/kategoriler/*',
      schema: {
        name: fields.slug({ name: { label: 'Kategori Adı' } }),
      },
    }),
    blog: collection({
      label: 'Blog Yazıları',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Başlık' } }),
        description: fields.text({ label: 'Kısa Açıklama', multiline: true }),
        author: fields.text({ label: 'Yazar', defaultValue: 'Stok Pratik Ekibi' }),
        externalLink: fields.url({ label: 'Dış Bağlantı (Tıklanınca başka sayfaya gitsin)', description: 'Doldurulursa tıklanınca yeni sekmede bu link açılır.' }),
        tags: fields.array(fields.text({ label: 'Etiket' }), { label: 'Etiketler', itemLabel: props => props.value }),
        content: fields.markdoc({
          label: 'İçerik',
          extension: 'md',
          options: {
            image: {
              directory: 'public/images/blog',
              publicPath: '/images/blog/',
            },
          },
        }),
      },
    }),
    destek: collection({
      label: 'Destek & Nasıl Yapılır',
      slugField: 'title',
      path: 'src/content/destek/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Başlık' } }),
        description: fields.text({ label: 'Kısa Açıklama', multiline: true }),
        category: fields.relationship({
          label: 'Kategori',
          collection: 'kategoriler',
          validation: { isRequired: false }
        }),
        externalLink: fields.url({ label: 'Dış Bağlantı (Tıklanınca başka sayfaya gitsin)' }),
        videoLink: fields.text({ label: 'Video Linki (İsteğe Bağlı)' }),
        content: fields.markdoc({
          label: 'İçerik',
          extension: 'md',
          options: {
            image: {
              directory: 'public/images/destek',
              publicPath: '/images/destek/',
            },
          },
        }),
      },
    }),
  },
});
