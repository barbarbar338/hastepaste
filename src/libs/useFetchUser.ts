import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import CONFIG from "src/config";

const cookie = new Cookies();

export interface LooseObject { [key: string]: unknown; }
export interface IUser { access_token: string; paste: unknown[]; user: LooseObject }

export function useFetchUser(strict = true): { user: IUser; loading: boolean; } {
	const [loading, setLoading] = useState(() => typeof window !== "undefined");
	const [user, setUser] = useState<IUser>(null);
	const access_token = cookie.get("access_token");

	useEffect(() => {
		if (!loading && user) return;
		setLoading(true);
		if (access_token) {
			fetch(`${CONFIG.API_URL}/auth/@me`, {
				headers: {
					Authorization: access_token,
				},
			})
				.then((res) => res.json())
				.then((body) => {
					if (body.statusCode !== 200) {
						cookie.remove("access_token");
						if (strict) window.location.href = "/login";
						return;
					}
					setUser({ ...body.data, access_token });
					setLoading(false);
				});
		} else if (strict) window.location.href = "/login";
	}, []);

	return { user, loading };
}