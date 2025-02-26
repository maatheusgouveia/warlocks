import { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { getLocale, getMessages, getTimeZone } from "next-intl/server";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { Providers } from "./providers";

import "./globals.css";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Warlocks",
	description: "Warlocks blog",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	const timeZone = await getTimeZone();
	const messages = (await getMessages()) as { [key: string]: string };

	return (
		<html lang={locale} className="min-h-full bg-background">
			<body
				className={`${openSans.className} min-h-full dark caret-white bg-background text-white`}
			>
				<Providers
					locale={locale}
					messages={messages}
					timeZone={timeZone}
				>
					<Header />

					{children}

					<Footer />
				</Providers>
			</body>
		</html>
	);
}
