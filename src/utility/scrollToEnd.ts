function scrollToEnd() {
  return new Promise<void>(async (resolve) => {
    let previousHeight = 0;
    let currentHeight = 0;
    let attemptCount = 0;
    let initialHeight = 0;
    let fixedScrollDistance = 0;

    const getHeight = (): number => {
      return document.body.scrollHeight - window.innerHeight;
    };

    const calculateInitialHeight = (height: number): number => {
      if (height > 800) {
        return height;
      } else {
        return 0;
      }
    };

    const calculateScrollDistance = (initialHeight: number): number => {
      if (!fixedScrollDistance) {
        const distancePercentage = 0.005 + Math.random() * 0.005;
        fixedScrollDistance = Math.floor(initialHeight * distancePercentage);
      }
      return fixedScrollDistance;
    };

    const scrollToDistance = (scrollDistance: number) => {
      const duration = 50 + Math.random() * 50;
      window.scrollBy(0, scrollDistance);
      return new Promise((resolve) => setTimeout(resolve, duration));
    };

    while (true) {
      const height = getHeight();

      initialHeight = calculateInitialHeight(height);

      const scrollDistance = calculateScrollDistance(initialHeight);

      await scrollToDistance(scrollDistance);

      currentHeight = window.scrollY;

      if (currentHeight === previousHeight) {
        attemptCount++;
        console.log(`Failed attempt ${attemptCount} to scroll to the end`);
      } else {
        attemptCount = 0;
      }

      if (attemptCount >= 100) {
        // alert('Scrolling finished');
        break;
      }

      previousHeight = currentHeight;
    }

    resolve();
  });
}

export default scrollToEnd;
