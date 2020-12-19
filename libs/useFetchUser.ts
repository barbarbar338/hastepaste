import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useCookies } from "react-cookie";
import CONFIG from "@base/config";

export interface LooseObject {
	[key: string]: unknown;
}
export interface IUser {
	access_token: string;
	paste: unknown[];
	user: LooseObject;
	is_banned?: boolean;
}

export async function fetchUser(access_token?: string): Promise<IUser | null> {
	if (access_token) {
		return fetch(`${CONFIG.API_URL}/auth/@me`, {
			headers: {
				Authorization: access_token,
			},
		})
			.then((res) => res.json())
			.then((body) => {
				if (body.statusCode !== 200) {
					return null;
				}
				return body.data;
			});
	} else return null;
}

export function useFetchUser(
	strict = true,
): {
	user: IUser;
	loading: boolean;
	setUser: Dispatch<SetStateAction<IUser>>;
	setLoading: Dispatch<SetStateAction<boolean>>;
} {
	const [loading, setLoading] = useState(() => !(typeof window !== "undefined"));
	const [user, setUser] = useState(null);
	const [cookies, , removeCookie] = useCookies();
	const { access_token } = cookies;

	useEffect(() => {
		if (!loading && user) return;
		setLoading(true);
		let isMounted = true;

		fetchUser(access_token).then((user) => {
			if (isMounted) {
				if (strict && !user) {
					removeCookie("access_token");
					window.location.href = "/login";
					return;
				}
				setUser(user ? { ...user, access_token } : null);
				setLoading(false);
			}
		});
		return () => {
			isMounted = false;
		};
	}, []);

	return { user, loading, setUser, setLoading };
}
