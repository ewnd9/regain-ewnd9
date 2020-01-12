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
                        {
                            view: "switch",
                            content: [
                                {
                                    when: ".file.error",
                                    content: [
                                        "h3:'parsing error'",
                                        {
                                            view: 'source',
                                            data: data => ({
                                                content: JSON.stringify(data.file.error, null, 2),
                                                syntax: 'javascript'
                                            })
                                        }
                                    ]
                                },
                                {
                                    content: []
                                }
                            ]
                        },
                        "h3:'source'",
                        {
                            view: 'source',
                            data: '({ content: .file.content, syntax: "javascript" })'
                        },
                    ]
                },
            ]
        }
    },
    {
        resolveLink: "file"
    }
);
