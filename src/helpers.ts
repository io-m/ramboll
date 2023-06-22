// Helper function to compare two objects of the same type and update keys with the new values
export const overwriteWithNewValues = <T extends Object>(
  oldObj: T,
  newObj: T,
) => {
  console.log('TRIGGERED')

  for (let key in newObj) {
    if (oldObj.hasOwnProperty(key) && oldObj[key] !== newObj[key]) {
      oldObj[key] = newObj[key]
    }
  }
}
