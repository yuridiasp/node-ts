import { App } from './app'
import { AppDataSource } from './database'

const PORT = '5000'

const app = App()



app.listen(PORT, () => {
    console.log("Server on")
})