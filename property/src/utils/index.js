module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    return new Error("Data not found");
  }
};
