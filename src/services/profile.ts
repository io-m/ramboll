import { editProfile, findProfileById } from '../db/profile'
import { User } from '../types/user'

export const editUser = async (newProfile: User) => {
  const profile = await findProfileById(newProfile.id)
  overwriteWithNewValues<User>(profile, newProfile)
  return await editProfile(profile)
}

// Helper function to compare two objects of the same type and update keys with the new values
const overwriteWithNewValues = <T extends Object>(oldObj: T, newObj: T) => {
  for (let key in newObj) {
    if (oldObj.hasOwnProperty(key) && oldObj[key] !== newObj[key]) {
      oldObj[key] = newObj[key]
    }
  }
}
