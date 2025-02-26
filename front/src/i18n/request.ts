import { getUserLocale } from "@/services/locale";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
	const locale = await getUserLocale();
	const messages = (await import(`../messages/${locale}.json`)).default;

	return {
		locale,
		messages,
		timeZone: "America/Sao_Paulo",
	};
});
