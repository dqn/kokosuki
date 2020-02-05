const ONE_FRAME = 1 / 24;

function $<E extends Element = HTMLElement>(selectors: string): E | null {
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
  const video = $<HTMLVideoElement>('#video')!;
  const canvas = $<HTMLCanvasElement>('#canvas')!;

  $('#file')!.addEventListener('change', (event: Event) => {
    const file = getFileFromEvent(event)!;
    video.src = URL.createObjectURL(file);

    video.addEventListener('canplay', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    });
  });

  $('#play')!.addEventListener('click', () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  $('#capture')!.addEventListener('click', () => {
    canvas.getContext('2d')?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  });

  $('#previous')!.addEventListener('click', () => {
    video.currentTime -= ONE_FRAME;
  });

  $('#next')!.addEventListener('click', () => {
    video.currentTime += ONE_FRAME;
  });
}

setup();
