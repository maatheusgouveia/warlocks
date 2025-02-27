export interface Article {
	id: string;
	title: string;
	content: string;
	authorId: string;
	createdAt: string;
	updatedAt: string;
	comments: [];
	author: {
		id: string;
		name: string;
		email: string;
		role: string;
		createdAt: string;
		updatedAt: string;
	};
}
