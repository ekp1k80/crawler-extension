export enum ActionType {
    'findElement' = 'findElement',
    'findElement[]' = 'findElement[]',
    saveReference = 'saveReference',
    useReference = 'useReference',
    getMultipleValuesFindBy = 'getMultipleValuesFindBy',
    click = 'click',
    clickAll = 'clickAll',
    getText = 'getText',
    getTextAll = 'getTextAll',
    getAttribute = 'getAttribute',
    getAttributeAll = 'getAttributeAll',
    getJson = 'getJson',
    saveDB = 'saveDB',
    useDB = 'useDB',
    updateDB = 'updateDB',
    log = 'log',
    logInBrowser = 'logInBrowser',
    logElementsInBrowser = 'logElementsInBrowser',
    changeUrl = 'changeUrl',
    scroll = 'scroll',
    awaitTime = 'awaitTime',
    getElementsLinks = 'getElementsLinks',
    promptInChatGpt = 'promptInChatGpt',
    custom = 'custom',
  }
  
  export interface Action {
    type: ActionType;
    value?: {
      name: string;
      type: 'element[]' | 'json-add' | 'json' | 'elements-add';
      model?: string;
    };
    conditionToRun?: string | ((data: unknown) => Promise<boolean>);
    runThisActionFor?: string;
    customAction?: string | ((data: unknown) => Promise<unknown>);
    findBy?: {
      type: 'selector' | 'text';
      value: string;
    };
    action?: Action;
    actions?: Action[];
    parseValue?: string;
    valueName?: string;
    newUrl?: string;
    query?: {
      type: 'findAll' | 'findOne' | 'findOneByFilter' | 'findManyByFilter';
      model: string;
      findBy?: {
        type: 'id';
      };
      data?: {
        [key: string]: unknown;
      };
      filter?: {
        [key: string]: unknown;
      };
      limit?: number;
    };
    time?: number;
    hasDelay?: boolean;
    useJsonReferenceInElements?: boolean;
    description?: string;
    referenceValue?: unknown;
  }
  
  export interface MetaInfo {
    referenceName?: string;
    referenceType?: string;
    referenceValue?: unknown;
  }
  
  export interface Task {
    type: string;
    action?: Action;
    referenceName?: string;
    referenceType?: string;
    referenceValue?: string;
  }
  
  export interface Reference {
    elements?: unknown[];
    json?: unknown;
  }
  
  export interface References {
    [key: string]: Reference | undefined;
  }
  