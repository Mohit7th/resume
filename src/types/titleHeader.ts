// src/types/titleHeader.ts
export type SocialProfile = {
    name: string;
    url: string;
    _id: string;
};

export type TitleHeader = {
    name: string;
    title: string;
    contact: {
        email: string;
        phone: string;
        address: string;
    };
    image: string;
    socials: SocialProfile[];
    _id: string;
};
