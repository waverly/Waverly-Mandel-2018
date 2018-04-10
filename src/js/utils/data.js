export const findNextInArray = (array, item) => {
  console.log("in nfind next in array");
  let nextI;
  const currI = array.findIndex(k => k === item);
  if (currI === array.length - 1) {
    nextI = 0;
  } else nextI = currI + 1;
  return array[nextI];
};
