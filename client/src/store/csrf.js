export async function csrfFetch(url, options = {}) {
    url = process.env.REACT_APP_BACKEND_URL + url;
    options.method = options.method || "GET";
    options.headers = options.headers || {};
    options.credentials = "include";
    options.headers["X-CSRF-Token"] = sessionStorage.getItem("X-CSRF-Token");
    options.headers["X-Requested-With"] = "XMLHttpRequest";
    options.headers["Accept"] = "application/json";
    options.headers["Access-Control-Allow-Origin"] = "*";

    console.log("Fetching URL:", url);
    console.log("With options:", options);

    if (options.method.toUpperCase() !== "GET") {
        if (
            !options.headers["Content-Type"] &&
            !(options.body instanceof FormData)
        ) {
            options.headers["Content-Type"] = "application/json";
        }
    }

    try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
    }
};
