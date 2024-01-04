import CustomFormFillingPage from '../pages/customFormFilling'
import MainPage from '../pages/mainPage'
import { pageConstants } from './constants'

export const navigator = {
  [pageConstants.customFormFilling]: CustomFormFillingPage,
  [pageConstants.mainPage]: MainPage
}