import { useTranslations } from "next-intl";

export function Footer() {
	const t = useTranslations("footer");

	return (
		<footer className="flex justify-between items-center p-4 bg-primary h-32 px-32">
			<small>
				{t("made with")} <span className="text-red-700 mr-1">❤</span>
				{t("by")} @maatheusgouveia
			</small>

			<small>Powered by Warlocks Tecnologia</small>
		</footer>
	);
}
