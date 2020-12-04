import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
const cookie = new Cookies();

export function useFetchUser() {
    const [ loading, setLoading ] = useState(() => typeof window !== "undefined");
    const [ token, setToken ] = useState("");

    useEffect(() => {
        if (!loading && token) {
            cookie.set("access_token", token);
            return;
        }
        setLoading(true);
        let isMounted = true;
        const tokenCookie = cookie.get("access_token");
        if (tokenCookie) {
            fetch("https://api.hastepaste.xyz/v1/auth/test", {
                headers: {
                    "Authorization": tokenCookie
                }
            })
            .then(res => res.json())
            .then(body => {
                console.log(body)
                if (body.statusCode !== 200) {
                    window.location.href = "/login";
                    return;
                }
                setToken(tokenCookie);
                setLoading(false);
            })
        } else window.location.href = "/login";
        return () => {
            isMounted = false;
        }
    }, []);

    return { token, loading };
}