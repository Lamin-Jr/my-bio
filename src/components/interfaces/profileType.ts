export type UserProfileType = {
    user?: string;
    name: string;
    email?: string;
    avatar: string;
    bio: string;
    experiences: ExperienceType[];
    education: EducationType[];
    skills: SkillType[];
}

type ExperienceType = {
    id: string
    company: string;
    role: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
}

type EducationType = {
    id: string
    institution: string,
    degree: string,
    period: string,
    description: string,
    fieldOfStudy: string,
    startYear?: number,
    endYear?: number,
}

 // type SkillType = {
 //     category: string,
 //     items: string[]
 // }

 type SkillType = {
     name: string,
     level: 'intermediate' | 'advanced' | 'expert',
     id: string
 }

export interface ProfileStateType {
    profile: UserProfileType | null;
    loading: boolean;
    error: string | null;
}

 export type {ExperienceType, EducationType, SkillType}