export interface Post {
    title: string;
    content: string;
    id: string | null;
    imagePath: string | null;
    creator: string | null;
}

export interface PostData {
    title: string;
    content: string;
    _id: string;
    imagePath: string | null;
    creator: string;
}