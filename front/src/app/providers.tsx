"use client";

import { PropsWithChildren } from "react";
import { HeroUIProvider } from "@heroui/react";
import { NextIntlClientProvider } from "next-intl";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ProgressBar } from "@/components/ProgressBar";
import { AuthProvider } from "@/contexts/AuthContext";

interface ProvidersProps extends PropsWithChildren {
	locale: string;
	timeZone: string;
	messages: { [key: string]: string };
}

export function Providers({
	children,
	locale,
	timeZone,
	messages,
}: ProvidersProps) {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<HeroUIProvider>
				<NextIntlClientProvider
					locale={locale}
					messages={messages}
					timeZone={timeZone}
				>
					<ProgressBar className="fixed top-0 h-1 rounded-r bg-primary">
						<AuthProvider>{children}</AuthProvider>
					</ProgressBar>
				</NextIntlClientProvider>
			</HeroUIProvider>
		</QueryClientProvider>
	);
}
