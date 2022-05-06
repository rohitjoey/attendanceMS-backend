const checkPermission = (permissionArray, neededPermission) => {
  //   console.log(permissionArray);
  if (permissionArray.includes(neededPermission)) {
    return true;
  }

  return false;
};

module.exports = { checkPermission };
