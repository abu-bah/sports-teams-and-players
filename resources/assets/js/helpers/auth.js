export function login(credentials) {
    return new Promise((resolve, reject) => {
        axios.post('/api/auth/login', credentials).then((response) => {
            resolve(response.data);
        }).catch((err) => {
            reject(err);
        });
    });
}

export function getLoggedUser() {
    const loggedUserString = localStorage.getItem('user');

    if (!loggedUserString) {
        return null;
    }

    return JSON.parse(loggedUserString);
}