
import { WSReactToContentScripts } from "../types/socketMessage";
import { ContentService } from './contentService'

const contentService = new ContentService()

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    // document ready
    console.log("Connection from content script")

    chrome.runtime.connect()
    contentService.initSocket()
    contentService.socketSend({
      type: 'broadcast',
      data: {
        type: 'content_script_to_react', 
        data: {
            hi: 'hi from content_script not react'
        }
      }
    })
    // contentService.addBorderAndTooltipToElementHover()
  }
}