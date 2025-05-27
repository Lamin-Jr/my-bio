export type ProfileType = {
    user: string;
    name: string;
    email: string;
    avatar: string;
    bio: string;
    experiences: [experienceType];
    education: [educationType];
    skills: [skillType];
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
     items: [string]
 }

 export type {experienceType, educationType, skillType}