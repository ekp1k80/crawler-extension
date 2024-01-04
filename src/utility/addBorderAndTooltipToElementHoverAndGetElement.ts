export const tooltipUniqueId = 'TooltipToastCrawlerExtensionToHoverAndGetElementsID'
export const elementAddedBorderByHover = "ElementAddedBorderByHover"

export function createTooltip () {
  let tooltipElement = document.createElement('div');
  tooltipElement.style.position = 'fixed';
  tooltipElement.style.backgroundColor = 'white';
  tooltipElement.style.border = '1px solid black';
  tooltipElement.style.padding = '5px';
  tooltipElement.style.display = 'none';
  tooltipElement.style.fontStyle = 'bold'
  tooltipElement.style.display = 'flex'
  tooltipElement.style.justifyContent = 'center'
  tooltipElement.style.fontSize = '1rem'
  tooltipElement.style.zIndex = "999"
  tooltipElement.id = tooltipUniqueId
  document.body.appendChild(tooltipElement);
}

export function getTooltipHtmlElement () {
  return document.getElementById(tooltipUniqueId)
}

// Función para mostrar el tooltip con colores
function showTooltipInTheLayout(element) {
  const tag = element.tagName;
  const classes = element.className;
  const id = element.id;

  let formattedText = `<span style="color: violet !important; margin: 0;">${tag.toLowerCase()}</span>`;
  if (id) {
    formattedText += ` <span style="color: blue !important; margin: 0;">#${id}</span>`;
  }
  if (classes) {
    formattedText += ` <span style="color: blue !important; margin: 0;">.${classes}</span>`;
  }

  const tooltipElement = getTooltipHtmlElement()
  tooltipElement.innerHTML = formattedText;
  tooltipElement.style.display = 'block';
  tooltipElement.style.left = `50%`;
  tooltipElement.style.bottom = `10%`;
  tooltipElement.style.transform = 'translateX(-50%)'
}

export function hideTooltip(){
  const tooltipElement = getTooltipHtmlElement()
  tooltipElement.style.display = 'none';
}

// Función para agregar un borde y mostrar el tooltip
function addBorderToElement(element: HTMLElement) {
  element.style.border = '1px solid violet';
  element.classList.add(elementAddedBorderByHover)

}

// Función para eliminar el borde y ocultar el tooltip
export function removeBorderToElement(element: HTMLElement) {
  if (element) {
    element.style.border = 'none';
    element.classList.remove(elementAddedBorderByHover)
  }
}

function getCurrentElement () { return document.getElementsByClassName(elementAddedBorderByHover)[0] as HTMLElement }

const mouseMoveHandler = (event: MouseEvent, func: (elem: HTMLElement) => void) => {
      
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  const element = document.elementFromPoint(mouseX, mouseY) as HTMLElement;
  const currentElement = getCurrentElement()

  if (currentElement !== element) {
    if(currentElement) {
      removeBorderToElement(currentElement as HTMLElement);
    }
    addBorderToElement(element);
    showTooltipInTheLayout(element);
    func(element)
  }
}

export function addBorderAndTooltipToElementHoverAndGetElement (func: (elem: HTMLElement) => void) {
  const controller = new AbortController();
  const { signal } = controller;
  // Listener para el movimiento del mouse
  createTooltip()
  document.addEventListener('mousemove', (event) => mouseMoveHandler(event, func), { signal });
  return controller
}
