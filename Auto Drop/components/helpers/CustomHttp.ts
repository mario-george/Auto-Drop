export default async function CustomHttp(
  path: string,
  token: string,
  body?: any,
  options?: any
) {
  let responseData;
  let responseIsOk: boolean = false;
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BACK_URL + path, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
    });
    responseIsOk = response.ok;

    responseData = await response.json();
  } catch (error) {
    responseData = error;
  }

  return { responseData, responseIsOk };
}
