export interface Livro {
    title?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
    previewLink?: string;
    thumbnail?:  string;
}

// #region Retorno da API
export interface VolumeInfo {
    title:               string;
    authors:             string[];
    publisher:           string;
    publishedDate:       string;
    description:         string;
    pageCount:           number;
    printType:           string;
    mainCategory:        string;
    categories:          string[];
    averageRating:       number;
    ratingsCount:        number;
    contentVersion:      string;
    imageLinks:          ImageLinks;
    language:            string;
    infoLink:            string;
    canonicalVolumeLink: string;
}

export interface ImageLinks {
    smallThumbnail: string;
    thumbnail:      string;
    small:          string;
    medium:         string;
    large:          string;
    extraLarge:     string;
}

export interface IItem {
    volumeInfo: VolumeInfo
}

export interface ILivrosResultado {
    items: IItem[];
    totalItems: number;
}

// #endregion