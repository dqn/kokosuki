function $<E extends Element = Element>(selectors: string): E | null {
  return document.querySelector<E>(selectors);
}

function isHTMLInputElement(value: any): value is HTMLInputElement {
  return value?.files !== undefined;
}

function getFileFromEvent(event: Event): File | null {
  const { target } = event;

  if (!isHTMLInputElement(target)) {
    return null;
  }

  const { files } = target;

  if (!files || !files.length) {
    return null;
  }

  return files.item(0);
}

function setup() {
  const video = $<HTMLElement>('#video');
  const file = $<HTMLElement>('#file');

  if (!video || !file) {
    return;
  }

  file.addEventListener('change', (event: Event) => {
    const file = getFileFromEvent(event);

    if (!file) {
      return;
    }

    const src = URL.createObjectURL(file);
    video.setAttribute('src', src);
  });
}

setup();
