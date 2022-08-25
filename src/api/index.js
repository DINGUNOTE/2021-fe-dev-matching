const BASE_URL =
  'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';

export const request = async (nodeId) => {
  try {
    const response = await fetch(`${BASE_URL}/${nodeId ? nodeId : ''}`);

    if (response.ok) {
      const json = response.json();
      return json;
    } else {
      throw new Error('요청 실패');
    }
  } catch (error) {
    throw new Error(`요청 실패, ${error.message}`);
  }
};
