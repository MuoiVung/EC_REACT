import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import { ContactType } from "./types";

export async function getContacts(query?: string): Promise<ContactType[]> {
  await fakeNetwork(`getContacts:${query}`);
  let contacts = await localforage.getItem<ContactType[]>("contacts");
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact(): Promise<ContactType> {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let contact: ContactType = {
    id,
    createdAt: Date.now(),
    favorite: false,
    avatar: "https://placekitten.com/g/200/200",
    twitter: "your_handle",
    notes: "Some notes",
  };
  let contacts = await getContacts();
  contacts.unshift(contact);
  await setContacts(contacts);
  return contact;
}

export async function getContact(id: string): Promise<ContactType | null> {
  await fakeNetwork(`contact:${id}`);
  let contacts = await localforage.getItem<ContactType[]>("contacts");
  if (contacts === null) {
    return null;
  }
  let contact = contacts.find((contact) => contact.id === id);
  return contact ?? null;
}

export async function updateContact(
  id: string,
  updates: Partial<ContactType>
): Promise<ContactType> {
  await fakeNetwork();
  let contacts = await localforage.getItem<ContactType[]>("contacts");
  if (contacts === null) {
    throw new Error(`No contact found for ${id}`);
  }
  let contact = contacts.find((contact) => contact.id === id);
  if (!contact) {
    throw new Error(`No contact found for ${id}`);
  }
  Object.assign(contact, updates);
  await setContacts(contacts);
  return contact;
}

export async function deleteContact(id: string): Promise<boolean> {
  let contacts = await localforage.getItem<ContactType[]>("contacts");
  if (contacts === null) {
    return false;
  }
  let index = contacts.findIndex((contact) => contact.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    await setContacts(contacts);
    return true;
  }
  return false;
}

async function setContacts(contacts: ContactType[]) {
  return localforage.setItem("contacts", contacts);
}

// fake a cache so we don't slow down stuff we've already seen
// fake a cache so we don't slow down stuff we've already seen
let fakeCache: { [key: string]: boolean } = {};

async function fakeNetwork(key?: string): Promise<void> {
  if (!key) {
    fakeCache = {};
  }

  if (key && fakeCache[key]) {
    return;
  }

  if (key) {
    fakeCache[key] = true;
  }

  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
