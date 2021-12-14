export const getJSON = async function (url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return data;
  } catch (e) {
    throw e;
  }
};

export const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error("Connection Timed Out :("));
    }, seconds * 1000);
  });
};
