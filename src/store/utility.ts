const updateObject = <T, U>(oldObject: T, updatedValues: U) => {
  return {
    ...oldObject,
    ...updatedValues,
  };
};

export default updateObject;
