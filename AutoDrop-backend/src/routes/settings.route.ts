import Authentication from "../assits/Authentication"
import { getUserSettings, updateUserSettings } from "../controllers/settings"
import express from 'express';

const settingRoute = express.Router()

settingRoute.get('/',[Authentication()],getUserSettings)
settingRoute.patch('/',[Authentication()],updateUserSettings)

export default settingRoute