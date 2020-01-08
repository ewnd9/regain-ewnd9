discovery.page.define(
    "file",
    {
        view: "context",
        // data: ".projects.files.pick(<(path=)>)",
        data: ".projects.pick(<(.files.path has #.id)>).({...,file:.files.pick(<path=#.id>)})",
        content: {
            view: "switch",
            content: [
                {
                    when: "no $",
                    content: 'alert-warning:"File not found: " + #.id'
                },
                {
                    content: [
                        "h1:.file.name + ' (' + .full_name + ')'",
                        "h3:'source'",
                        {
                            view: 'source',
                            data: '({ content: .file.content, syntax: "javascript" })'
                        }
                    ]
                }
            ]
        }
    },
    {
        resolveLink: "file"
    }
);
