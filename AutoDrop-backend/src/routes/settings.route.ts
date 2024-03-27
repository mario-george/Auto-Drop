import Authentication from "../assits/Authentication"
import { getUserSettings } from "../controllers/settings"
import express from 'express';

const settingRoute = express.Router()

settingRoute.get('/',[Authentication()],getUserSettings)

export default settingRoute