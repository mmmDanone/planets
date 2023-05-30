export const randomFromTo = (min: number, max: number): number => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const delay = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export const randomDelay = () => {
  return new Promise((resolve) => setTimeout(resolve, randomFromTo(500, 1500)));
};
