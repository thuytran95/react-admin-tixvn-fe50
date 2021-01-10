export const hiddenName = (name, length) => {
  if (name.length > length) return name.substr(0, length) + "...";
  return name;
};

export const capitalizeWords = (str) => {
  return str?.replace(/\w\S*/g, function (str) {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
  });
};
