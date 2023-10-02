 
import { redirect } from "next/navigation";
import React from "react";
import EditRecord from "../../components/EditRecord";
import { fetch } from "../../../utils/fetch";
import config from "../../../config";

export const dynamicParams = true;
export const revalidate = true;

async function Page({ params: { id } }) {
  const { data: userData } = await fetch(`${config.backend.url}/users/${id}`, {
    method: "GET",
  });
  if (userData && Object.keys(userData).length === 0) {
    return redirect("/");
  }
  return <EditRecord id={id} userData={userData[0]} />;
}

export default Page;
