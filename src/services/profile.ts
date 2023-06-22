import { editProfile, findProfileById } from '../db/profile'
import { overwriteWithNewValues } from '../helpers'
import { User } from '../types/user'

export const editUser = async (newProfile: User) => {
  const profile = await findProfileById(newProfile.id)
  overwriteWithNewValues<User>(profile, newProfile)
  return await editProfile(profile)
}
