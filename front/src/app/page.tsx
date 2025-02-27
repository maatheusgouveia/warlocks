"use client";

import { Image } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/services/api";
import { Article } from "@/@types/article";
import { queryKeys } from "@/constants/query-keys";
import articleCover from "@/assets/images/article.jpeg";
import { LoadingArticles } from "@/components/LoadingArticles";

export default function Home() {
	const { data, isLoading } = useQuery({
		queryKey: [queryKeys.ARTICLES],
		queryFn: async () => (await api.get<Array<Article>>("/articles")).data,
	});

	return (
		<div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#12121c] flex-col w-full py-16 gap-12 px-4">
			{isLoading && <LoadingArticles />}

			{data?.map((article, index) => (
				<div
					key={article.id}
					className={`w-full max-w-5xl flex flex-col lg:flex-row ${
						index % 2 ? "lg:flex-row" : "lg:flex-row-reverse"
					} gap-8 lg:gap-16 items-center bg-[#1a1a2e] rounded-2xl shadow-lg p-6 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl`}
				>
					<Image
						src={articleCover.src}
						alt={article.title}
						width={700}
						height={300}
						className="w-full max-w-[400px] lg:max-w-[500px] rounded-lg object-cover"
					/>

					<div className="flex flex-col text-center lg:text-left w-1/2">
						<h1 className="text-white text-2xl font-bold mb-2">
							{article.title}
						</h1>
						<p className="text-gray-300 text-sm leading-relaxed line-clamp-6">
							{article.content}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}
