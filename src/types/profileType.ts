export type UserProfileType = {
    user?: string;
    name: string;
    email?: string;
    avatar: string;
    bio: string;
    experiences: experienceType[];
    education: educationType[];
    skills: skillType[];
}

type experienceType = {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
}

type educationType = {
    institution: string,
    degree: string,
    period: string,
    description: string,
}

 type skillType = {
     category: string,
     items: string[]
 }

export interface ProfileStateType {
    profile: UserProfileType | null;
    loading: boolean;
    error: string | null;
}

 export type {experienceType, educationType, skillType}