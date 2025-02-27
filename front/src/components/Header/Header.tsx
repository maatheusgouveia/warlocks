"use client";

import { useAuthentication } from "@/contexts/AuthContext";

export function Header() {
	const { logout, auth } = useAuthentication();

	const { isAuthenticated } = auth;

	function handleLogout() {
		logout();
	}

	return (
		<header className="flex justify-between items-center p-4 h-16 px-32 bg-primary font-bold">
			<h1 className="font-bold">Warlocks</h1>
			<ul className="flex gap-4">
				<li className="cursor-pointer">Inscreva-se</li>
				{isAuthenticated && (
					<li className="cursor-pointer" onClick={handleLogout}>
						Sair
					</li>
				)}
			</ul>
		</header>
	);
}
