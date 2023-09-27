const CreateKey = () =>
  Math.random()
    .toString(36)
    .slice(2, 14)
    .replace(/./g, (c, i) => (i % 4 === 3 && i < 11 ? '-' : c))
    .replace(/^\d/, 'A');
