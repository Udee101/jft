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
  let apiUrl = ''
  
  if (process.env.NODE_ENV === 'production') {
    apiUrl = 'https://blog-api-dbae.onrender.com'
  } else {
    apiUrl = 'http://localhost:5001'
  }

  return apiUrl
}
