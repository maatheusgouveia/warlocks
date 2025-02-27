import { Skeleton } from "@heroui/react";

export function LoadingArticles() {
	return (
		<>
			<Skeleton className="w-full rounded-lg h-96" />
			<Skeleton className="w-full rounded-lg h-96" />
			<Skeleton className="w-full rounded-lg h-96" />
			<Skeleton className="w-full rounded-lg h-96" />
		</>
	);
}
