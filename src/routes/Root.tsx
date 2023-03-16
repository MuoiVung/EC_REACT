import {
  LoaderFunction,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router";
import { Form, NavLink, useSubmit } from "react-router-dom";
import { createContact, getContacts } from "../contacts";
import { ContactsLoaderDataType } from "../types";

export const loader: LoaderFunction = async ({
  request,
}): Promise<ContactsLoaderDataType> => {
  const url = new URL(request.url); // URLSearchParams
  const q = url.searchParams.get("q");

  const contacts = await getContacts(q || "");
  return { contacts, q };
};

export const action = async () => {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
};

export default function Root() {
  const { contacts, q } = useLoaderData() as ContactsLoaderDataType;
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              onChange={(e) => {
                const isFirstSearch = q == null;
                submit(e.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
              className={searching ? "loading" : ""}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>*</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
