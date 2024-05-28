export type DataModal = {
  id: number;
  title: string;
  inputs: ImputsModal[];
  footer: string;
};

export type ImputsModal = {
  name: string;
  placeholder: string;
  type: "date" | "number" | "text" | "select" | "file";
  validate: boolean;
};

export type ErrorModal = { [key: string]: any };
