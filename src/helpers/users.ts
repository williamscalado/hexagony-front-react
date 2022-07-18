interface AvatarKeys {
  [key: string]: string
}

const getAvatar = (gender: string) => {
  const urlAvatar: AvatarKeys = {
    male: 'avatar-male.png',
    female: 'avatar-female.png',
    unknown: 'user-avatar.png',
  }

  return urlAvatar[gender]
}

const getFirstName = (fullName: string) => {
  const firstName = fullName.split(' ').slice(0, 2)[0]
  return firstName.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export const userUtil = {
  getAvatar,
  getFirstName,
}
