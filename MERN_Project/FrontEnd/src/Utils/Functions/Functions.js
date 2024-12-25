export const reload = () => {
    window.location.reload();
}

export const codeError = (error) => {
    console.log(error);
}

export const userInfo = () => {
    if (localStorage.getItem("token")) {
        const { accessToken, ...userobj } = JSON.parse(localStorage.getItem("token"));
        return { token: accessToken, ...userobj };
    }
    return false;
}
