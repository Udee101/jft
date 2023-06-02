export const getHeader = () => {
  return {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('jft_jwt')
    }
  }
}

export const getUserId = () => {
  const user = JSON.parse(localStorage.getItem('jft_user'));
  const userId = user != null ? user.id : ''

  return userId;
}

export const url = () => {
  return 'https://jftapi.onrender.com'
}
