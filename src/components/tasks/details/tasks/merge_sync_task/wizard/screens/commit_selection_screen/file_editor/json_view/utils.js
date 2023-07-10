const checkNameInObj = (arr, ob, key) => {
  return arr.some(item => item[key] === ob?.[key]);
};

const getDiff = (arr1, arr2, key) => {
  let i = 0;
  let j = 0;
  const first = [];
  const second = [];
  arr1.map(item => {
    if (!checkNameInObj(arr2, item, key)) {
      second.push(item);
    }
  });
  arr2.map(item => {
    if (!checkNameInObj(arr1, item, key)) {
      first.push(item);
    }
  });
  while (i < arr1.length && j < arr2.length) {
    if (checkNameInObj(second, arr1[i], key)) {
      arr2.splice(j, 0, { isDummy: true });
    } else if (checkNameInObj(first, arr2[j], key)) {
      arr1.splice(i, 0, { isDummy: true });
    }
    j++;
    i++;
  }
  while (j < arr2.length) {
    arr1.splice(i, 0, { isDummy: true });
    i++;
    j++;
  }
  while (i < arr1.length) {
    arr2.splice(j, 0, { isDummy: true });
    i++;
    j++;
  }
  return { arr1, arr2 };
};

export { getDiff };
