export const clickAllElements = async (
  elements: Element | NodeListOf<Element>,
) => {
  let elementsArray;
  if (!Array.isArray(elements)) {
    elementsArray = [elements];
  }
  for (const element of elementsArray) {
    if (element) {
      element.scrollIntoView({ block: 'center', inline: 'center' });
      await new Promise((resolve) => setTimeout(resolve, 500));
      await element.click();
    }
  }
};
