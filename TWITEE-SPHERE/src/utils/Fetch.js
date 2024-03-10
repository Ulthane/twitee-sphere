//GET******************************************************
export async function getFetch(url, headers) {
  const request = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  const responseData = await request.json();

  return responseData;
}

//POST******************************************************
export async function postFetch(url, headers, bodyData) {
  const request = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(bodyData),
  });

  const responseData = await request.json();
  return responseData;
}

//PUT******************************************************
export async function putFetch(url, headers, bodyData) {
  console.log({
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({ ...bodyData }),
  });
  const request = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(bodyData),
  });

  const responseData = await request.json();
  return responseData;
}

//DELETE******************************************************
export async function deleteFetch(url, headers) {
  const request = await fetch(url, {
    method: "DELETE",
    headers: {
      ...headers,
    },
  });

  const responseData = await request.json();

  return responseData;
}
