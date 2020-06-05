export function authHeader() {
    let storedUser = localStorage.getItem('user');
    let user = storedUser ? JSON.parse(storedUser) : null;

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}