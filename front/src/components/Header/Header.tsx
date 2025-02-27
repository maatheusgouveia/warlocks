"use client";

import { useLocale, useTranslations } from "next-intl";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { Select, SelectItem } from "@heroui/react";
import { useAuthentication } from "@/contexts/AuthContext";

export function Header() {
	const locale = useLocale();
	const { logout, auth } = useAuthentication();
	const { isAuthenticated } = auth;
	const t = useTranslations("header");

	function handleLogout() {
		logout();
	}

	return (
		<header className="flex justify-between items-center p-4 h-16 px-32 bg-primary font-bold">
			<h1 className="font-bold">Warlocks</h1>
			<ul className="flex gap-4 justify-center items-center">
				<li>{t("subscribe")}</li>
				{isAuthenticated && (
					<li className="cursor-pointer" onClick={handleLogout}>
						{t("logout")}
					</li>
				)}
				<li>
					<Select
						defaultSelectedKeys={[locale]}
						value={locale}
						onChange={(e) =>
							setUserLocale(e.target.value as Locale)
						}
						aria-label="Select locale"
						className="min-w-32 text-white"
						size="lg"
					>
						<SelectItem className="text-white" key="en">
							English
						</SelectItem>
						<SelectItem className="text-white" key="pt-BR">
							Português
						</SelectItem>
					</Select>
				</li>
			</ul>
		</header>
	);
}
