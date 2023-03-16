import { Params } from "react-router";

export * from "./materialUI.types";

export type ContactType = {
  id: string;
  first?: string;
  last?: string;
  createdAt: number;
  favorite: boolean;
  avatar: string;
  notes: string;
  twitter: string;
};

export type ContactsLoaderDataType = {
  contacts: ContactType[];
  q?: string | null;
};

export type ActionDataType = {
  contact: ContactType;
};

export type ContactLoaderParamType = {
  contactId: string;
};

export type ContactLoaderDataType = {
  contact: ContactType;
};
