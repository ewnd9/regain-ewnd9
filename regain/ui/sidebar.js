discovery.view.define("sidebar", {
    view: "list",
    data: `
      $.projects
    `,
    item: [
      {
        view: "ul",
        item: ['link:{ href: "#project:" + full_name, text: full_name }']
      }
    ]
});
