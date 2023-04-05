export const getAction = (type, data) => {
  return {
    type: type,
    payload: data,
  };
};
