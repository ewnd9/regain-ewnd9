discovery.view.define("sidebar", {
    view: "list",
    data: `
      $.projects.files
    `,
    item: [
      {
        view: "ul",
        item: ['link:{ href: "#file:" + path, text: path }']
      }
    ]
});
