export const encodeImageFileAsURL = (
  element: any,
  cb: ({ base64, name }: any) => void
) => {
  const file = element.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    cb({
      base64: reader.result,
      name: file.name,
      type: file.type,
    });
  };
};
