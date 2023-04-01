const fetcher = async ({ url, method, body, json = true }) => {
  const response = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    // handle errors
    throw new Error('API error');
  }

  if (json) {
    const data = await response.json();
    return data.data;
  }
};

const register = (user) => {
  return fetcher({ url: '/api/register', method: 'POST', body: user });
};

const signin = (user) => {
  return fetcher({ url: '/api/signin', method: 'POST', body: user });
};

const createNewProject = (name) => {
  return fetcher({
    url: '/api/project',
    method: 'POST',
    body: { name },
    json: true,
  });
};

export { fetcher, register, signin, createNewProject };
