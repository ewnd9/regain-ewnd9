discovery.page.define(
  'project',
  {
    view: 'context',
    data: '.projects.pick(<(.full_name=#.id)>)',
    content: {
      view: 'switch',
      content: [
        {
          when: 'no $',
          content: 'alert-warning:"Project not found: " + #.id'
        },
        {
          content: [
            'h1:.full_name',
            {
              view: 'list',
              data: `
                .files
              `,
              item: [
                {
                  view: 'ul',
                  item: ['link:{ href: "#file:" + path, text: path }']
                }
              ]
            }
          ]
        }
      ]
    }
  },
  {
    resolveLink: 'project'
  }
);
