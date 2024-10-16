import express from 'express'

import routes from './routes/routes'

export const App = () => {
    const app = express()

    app.use(express.json())

    app.use(routes())

    return app
}