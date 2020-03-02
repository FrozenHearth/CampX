export const authHeader = () => {
  let user = JSON.parse(localStorage.getItem('user'));
  let token = localStorage.getItem('token');
  if (user && token) {
    return {
      Authorization: token
    };
  } else {
    return {};
  }
};
