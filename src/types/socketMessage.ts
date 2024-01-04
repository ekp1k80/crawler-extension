export interface IUnknownJson {
    [key: string]: unknown
}
export interface ISocketMessage {
    type: string
    data: IUnknownJson
}

export const WSReactToContentScripts = 'react_to_content_scripts'
export const WSFormFillingResponse = 'form-filling-response'