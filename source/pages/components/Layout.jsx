import React from 'react';

const Layout = ({title, content}) => (
    <html lang="es">
        <head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
            <title>{ title }</title>
        </head>
        <body>
            <div id="render-target"
                dangerouslySetInnerHTML={{
                    __html: content,
                }}
            />
            <script src="http://localhost:3001/app.js" />
        </body>
    </html>
)

export default Layout;