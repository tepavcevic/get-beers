const fetchFromParams = async (url, options) => {
  try {
    const response = await fetch(`${url}${options}`);

    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    alert(error.message);
    console.error(error);
    throw error;
  }
};

export default fetchFromParams;
