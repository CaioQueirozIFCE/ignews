const monitorScreenHeight = (): void => {
    let vh = window.visualViewport.height * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

export {monitorScreenHeight};