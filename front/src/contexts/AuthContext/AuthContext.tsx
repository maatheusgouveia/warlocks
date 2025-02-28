"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { api } from "@/services/api";
import { useRouter, usePathname } from "next/navigation";
import { useProgressBar } from "@/components/ProgressBar";

interface User {
	id: string;
	email: string;
	username: string;
}

interface Auth {
	user: User | null;
	isAuthenticated: boolean;
	token: string;
}

interface AuthContextType {
	auth: Auth;
	login: (_: Login) => void;
	logout: () => void;
}

interface Login {
	email: string;
	password: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

const initialAuthData: Auth = {
	token: "",
	isAuthenticated: false,
	user: null,
};

export function AuthProvider({ children }: { children: ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();
	const { start, done } = useProgressBar();

	const [auth, setAuth] = useState<Auth>(initialAuthData);

	const login = async ({ email, password }: Login) => {
		start();
		const response = await api.post("/auth/login", { email, password });

		const updatedAuth = {
			isAuthenticated: true,
			token: response.data.access_token,
			user: response.data.user,
		};

		localStorage.setItem("@warlocks/auth", JSON.stringify(updatedAuth));
		setAuth(updatedAuth);
		api.defaults.headers.authorization = `Bearer ${response.data.access_token}`;
		router.push("/");
		done();
	};

	const logout = () => {
		start();
		localStorage.removeItem("@warlocks/auth");
		setAuth(initialAuthData);
		delete api.defaults.headers.authorization;

		router.push("/login");
		done();
	};

	useEffect(() => {
		async function verify() {
			const storedAuth = localStorage.getItem("@warlocks/auth");

			if (storedAuth) {
				const { token, user } = JSON.parse(storedAuth);
				setAuth({ isAuthenticated: true, token, user });
				api.defaults.headers.authorization = `Bearer ${token}`;
			} else {
				router.push("/login");
			}
		}

		verify();
	}, [pathname]);

	return (
		<AuthContext.Provider value={{ auth, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthentication() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error(
			"useAuthentication deve ser usado dentro de um AuthProvider"
		);
	}

	return context;
}
