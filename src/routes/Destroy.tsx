import React from "react";
import { ActionFunction, redirect, useAsyncValue } from "react-router";
import { Form } from "react-router-dom";
import { deleteContact } from "../contacts";

export const action: ActionFunction = async ({ params }) => {
  if (params?.contactId) {
    await deleteContact(params.contactId?.toString());
    return redirect("/");
  }
  alert("Failed to delete");
};

const Destroy = () => {
  return (
    <div>
      Destroy
      <Form method="post">
        <button type="submit">Delete</button>
      </Form>
    </div>
  );
};

export default Destroy;
