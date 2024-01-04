export function getElementsBySelector(
  element: Element | Document,
  selector: string,
  many: boolean,
) {
  if (many) {
    return element.querySelectorAll(selector);
  } else {
    return element.querySelector(selector);
  }
}

export function getElementsByText(searchElement, text, many) {
  const walker = document.createTreeWalker(
    searchElement,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function (node) {
        if (node.textContent.includes(text)) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_SKIP;
      },
    },
  );

  const results = [];
  let currentNode;
  while ((currentNode = walker.nextNode())) {
    results.push(currentNode.parentElement);
  }

  if (many) {
    return results;
  } else {
    return results[0];
  }
}

export async function getTextFromElement(element) {
  let unparsedText = element.textContent;
  if (typeof unparsedText === 'string') {
    unparsedText = unparsedText.split('\n');
  }

  unparsedText = unparsedText.filter((text) => text !== '');
  unparsedText = unparsedText.join(' ');

  if (typeof unparsedText === 'string') {
    unparsedText = unparsedText.split('\t');
  }

  unparsedText = unparsedText.filter((text) => text !== '');
  unparsedText = unparsedText.join(' ');
  return unparsedText;
}
