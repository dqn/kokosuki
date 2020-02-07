const ONE_FRAME = 1 / 24;

function download(url: string, fileName: string): void {
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
}

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
  const canvas = document.createElement('canvas');

  $('#file')!.addEventListener('change', (event: Event) => {
    const file = getFileFromEvent(event);

    if (!file) {
      video.src = '';
      $('#title')!.innerHTML = '';
      return;
    }

    video.src = URL.createObjectURL(file);
    $('#title')!.innerHTML = file.name;

    video.addEventListener('canplay', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      $<HTMLInputElement>('#seekbar')!.max = video.duration.toString();
    });
  });

  $('#play')!.addEventListener('click', (event: Event) => {
    if (!video.src) {
      return;
    }

    const element = <HTMLElement>event.target;

    if (video.paused) {
      video.play();
      element.innerHTML = 'Stop';
    } else {
      video.pause();
      element.innerHTML = 'Play';
    }
  });

  $('#capture')!.addEventListener('click', () => {
    canvas.getContext('2d')!.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    const fileName = `${Date.now()}.jpg`;
    const url = canvas.toDataURL('image/jpeg');
    download(url, fileName);
  });

  $('#previous')!.addEventListener('click', () => {
    video.currentTime -= ONE_FRAME;
  });

  $('#next')!.addEventListener('click', () => {
    video.currentTime += ONE_FRAME;
  });

  $('#seekbar')!.addEventListener('change', (event: Event) => {
    const { target } = event;

    if (!isHTMLInputElement(target)) {
      return;
    }

    video.currentTime = Number(target.value);
    setInterval(() => {
      if (video.src) {
        target.value = video.currentTime.toString();
      }
    }, 1000);
  });
}

setup();
