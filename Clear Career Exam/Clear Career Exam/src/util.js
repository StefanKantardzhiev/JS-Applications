export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data))
}

export function getUserData() { 
        return JSON.parse(sessionStorage.getItem('userData'))
    
}

export function clearUserData() {
    sessionStorage.removeItem('userData');
}

// export function createSubmitHandler(ctx, handler) {
//     return function (event) {
//         event.preventDefault();
//         const formData = Object.fromEntries(new FormData(event.target));
//         handler(ctx, formData, event);
//     }
// };

// export function parseQuerystring(query = '') {
//     return Object.fromEntries(query
//         .split('&')
//         .map(kvp => kvp.split('=')));
// }