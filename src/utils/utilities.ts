export const serialNumber = (data: any, idx: any) => {
  const number = data?.findIndex((item: any) => {
    return item.uid === idx;
  });
  return number + 1;
};
