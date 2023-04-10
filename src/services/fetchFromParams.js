const fetchFromParams = async (url, options) => {
  try {
    const response = await fetch(`${url}${options}`);

    if (!response.ok) {
      throw new Error(response.status);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error.message;
  }
};

export default fetchFromParams;
