discovery.view.define("sidebar", {
    view: "list",
    data: `
      $
    `,
    item: [
      {
        view: "ul",
        item: ['link:{ href: "#file:" + path, text: path }']
      }
    ]
});
