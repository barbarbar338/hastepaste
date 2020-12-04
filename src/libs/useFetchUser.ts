import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import CONFIG from "src/config";

const cookie = new Cookies();

export function useFetchUser(strict = true) {
	const [loading, setLoading] = useState(() => typeof window !== "undefined");
	const [user, setUser] = useState<{ [key: string]: unknown }>({});
	const access_token = cookie.get("access_token");

	useEffect(() => {
		if (!loading && user) return;
		setLoading(true);
		let isMounted = true;
		if (access_token) {
			fetch(`${CONFIG}/auth/@me`, {
				headers: {
					Authorization: access_token,
				},
			})
				.then((res) => res.json())
				.then((body) => {
					console.log(body);
					if (body.statusCode !== 200) {
						if (strict) window.location.href = "/login";
						return;
					}
					setUser({ ...body.data, access_token });
					setLoading(false);
				});
		} else if (strict) window.location.href = "/login";
		return () => {
			isMounted = false;
		};
	}, []);

	return { user, loading };
}
