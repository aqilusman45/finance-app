import { File, FileOriginal } from "@ionic-native/file";

let fileSystem: FileOriginal | null = null;

const create = () => {
  return File;
};

const get = () => {
  if (!fileSystem) fileSystem = create();
  return fileSystem;
};

const resolveDirectory = async (uid?: string) => {
  const fs = get();
  console.log(fs);

  return await fs.resolveDirectoryUrl(File.dataDirectory);
};

export const saveFile = async (name: string, file: File) => {
  const fs = get();
  return await fs.writeFile(File.dataDirectory, name, file);
};

export const getFile = async (fileName: string, uid?: string) => {
  const fs = get();
  const res = await resolveDirectory(File.dataDirectory + uid);
  return await fs.getFile(res, fileName, {
    create: true,
  });
};
