import { randomBytes } from "crypto";
import { getElementsBySelector, getElementsByText, getTextFromElement } from "../utility/getElements";

import { clickAllElements } from "../utility/interactWithElements";
import scrollToEnd from "../utility/scrollToEnd";

import io from 'socket.io-client';
import { changeUrl } from "../utility/changeUrl";
import { addBorderAndTooltipToElementHoverAndGetElement, hideTooltip, removeBorderToElement } from "../utility/addBorderAndTooltipToElementHoverAndGetElement";
import { IInputInfo, IInputValueToFill } from "../types/fillInputForm";
import { fillInputForm } from "../utility/fillInputForm";
import { WSReactToContentScripts, ISocketMessage, IUnknownJson, WSFormFillingResponse } from "../types/socketMessage";
import { getInputInfoFromElement } from "../utility/getInputFromElement";
import { BKey, SpaceKey, awaitKeyPress } from "../utility/awaitKeyPress";

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class ContentService {
  json: unknown[] | { [key: string]: unknown };
  jsonIndex = 0;
  prevJsonIndex = -1;
  scheduleIndex = 0;
  scheduleRunning = false;
  needToRecoverSchedule = false;

  formSelected = HTMLElement
  inputsFormSelected: IInputInfo[]

  clickAllElements = clickAllElements;
  getTextFromElement = getTextFromElement;
  getElementsBySelector = getElementsBySelector;
  getElementsByText = getElementsByText;
  scrollToEnd = scrollToEnd;
  changeUrl = changeUrl;

  addBorderAndTooltipToElementHoverAndGetElement = addBorderAndTooltipToElementHoverAndGetElement.bind(this);
  fillInputForm = fillInputForm;

  socketSend = (message: ISocketMessage) => {
    chrome.runtime.sendMessage(message)
  }

  reactContentScriptsHandler = async (message: ISocketMessage) => {
    if(message.type === 'normal-form-selector-pick-with-borderline') {
      let element: HTMLElement
      const setElement = (elem: HTMLElement) => {
        element = elem
      }

      const controller = this.addBorderAndTooltipToElementHoverAndGetElement(setElement)
      await awaitKeyPress(BKey)
      controller.abort()
      removeBorderToElement(element)
      hideTooltip()
      
      const inputs = getInputInfoFromElement(element)

      console.log(inputs)
      if(inputs.length > 0){
        this.inputsFormSelected = inputs
        this.socketSend({
          type: 'form-filling',
          data: inputs as unknown as IUnknownJson
        })
      }
      
    }
  }

  socketListener = (message: ISocketMessage | string) => {
    if(typeof message === "string") {
      console.log(message)
    } else {
      const { type } = message;
      if(type === WSReactToContentScripts) {
        this.reactContentScriptsHandler(message.data as unknown as ISocketMessage)
      } else if(type === WSFormFillingResponse) {
        console.log("Form fill response")
        console.log(message)
        this.fillInputForm(message.data as unknown as IInputValueToFill[])
      } else {
        console.log(message)
      }
    }
    
  }

  initSocket = async () => {
    // content.ts
    await delay(1000)
    console.log("init socket")
    
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      this.socketListener(message)
    });

    // this.socketSend({type: 'message', data: {hi: 'hi'}})
  }
} 

export {
  ContentService
}