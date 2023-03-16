import {
  ActionFunction,
  Form,
  LoaderFunction,
  useFetcher,
  useLoaderData,
} from "react-router-dom";
import { getContact, updateContact } from "../contacts";
import { ContactLoaderDataType, ContactType } from "../types";

// interface ContactType {
//   first: string;
//   last: string;
//   avatar: string;
//   twitter: string;
//   notes: string;
//   favorite: boolean;
// }

const contactDefault: ContactType = {
  first: "Your",
  last: "Name",
  avatar: "https://placekitten.com/g/200/200",
  twitter: "your_handle",
  notes: "Some notes",
  favorite: true,
  id: Math.floor(Math.random() * 10000).toString(),
  createdAt: Date.now(),
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<ContactLoaderDataType> => {
  let contact = null;

  if (params && params?.contactId) {
    contact = await getContact(params.contactId);
  }

  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return { contact };
};

export const action: ActionFunction = async ({ request, params }) => {
  let formData = await request.formData();
  if (params.contactId) {
    return updateContact(params.contactId, {
      favorite: formData.get("favorite") === "true",
    });
  }
};

export default function Contact() {
  const { contact } = useLoaderData() as ContactLoaderDataType;

  return (
    <div id="contact">
      <div>
        <img
          key={contact?.avatar}
          src={contact?.avatar || undefined}
          alt="contact avatar"
        />
      </div>

      <div>
        <h1>
          {contact?.first || contact?.last ? (
            <>
              {contact?.first} {contact?.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact?.twitter && (
          <p>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://twitter.com/${contact?.twitter}`}
            >
              {contact?.twitter}
            </a>
          </p>
        )}

        {contact?.notes && <p>{contact?.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form method="delete" action="destroy">
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

interface FavoriteProps {
  contact: ContactType;
}

function Favorite({ contact }: FavoriteProps) {
  const fetcher = useFetcher();
  let favorite = contact?.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
