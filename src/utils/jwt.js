import jwtDecode from "jwt-decode";

export const decode = (jwtString) => {
    const decoded = jwtDecode(jwtString);
    return {
        token: jwtString,
        userId: decoded.sub
    };
};
