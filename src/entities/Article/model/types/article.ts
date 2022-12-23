import { User } from '@/entities/User';
import { ArticleBlockType, ArticleType } from '../consts/articleConsts';


export interface ArticleBlockBase {     // создаем базовый интерфейс, где пишем обязательные для любой статьи поля
    id: string;
    type: ArticleBlockType;
}


// === для идеального автокомплита явно указываем конкретное поле ===
export interface ArticleCodeBlock extends ArticleBlockBase {
    type: ArticleBlockType.CODE;
    code: string;
}

export interface ArticleImageBlock extends ArticleBlockBase {
    type: ArticleBlockType.IMAGE;
    src: string;
    title: string;
}

export interface ArticleTextBlock extends ArticleBlockBase {
    type: ArticleBlockType.TEXT;
    title?: string;
    paragraphs: string[];
}

// делаем один объединяющий блок
export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock

export interface Article {
    id: string;
    title: string;
    user: User;
    subtitle: string;
    img: string;
    views: number;
    createdAt: string;
    type: ArticleType[];
    blocks: ArticleBlock[];
}
