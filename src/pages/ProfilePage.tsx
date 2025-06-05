import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Calendar, Briefcase, BookOpen, Code, Trash2, Edit, Plus, Save, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/appHooks.ts';
import { updateUserProfile as updateProfile } from '@/store/userProfile/profileSlice';
import { Button } from '@/components/ui/Button';

import { UserProfileType, ExperienceType, SkillType, EducationType } from '@/types/profileType.ts';
import {Input} from "@/components/ui/Input";
import {Textarea} from "@components/ui/TextArea.tsx";

export const ProfilePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { currentUser } = useAppSelector((state) => state.auth);
    const { profile, loading } = useAppSelector((state) => state.userProfile);

    // Local state for editing
    const [editMode, setEditMode] = useState(false);
    const [localProfile, setLocalProfile] = useState<UserProfileType>({
        avatar: "",
        email: "",
        user: "",
        bio: '',
        experiences: [],
        skills: [],
        education: [],
        name: '',
    });

    // State for new items
    const [newExperience, setNewExperience] = useState<Omit<ExperienceType, 'id'>>({
        company: '',
        position: "",
        role: '',
        startDate: '',
        endDate: '',
        description: ''
    });

    const [newSkill, setNewSkill] = useState<Omit<SkillType, 'id'>>({
        name: '',
        level: 'intermediate'
    });

    const [newEducation, setNewEducation] = useState<Omit<EducationType, 'id'>>({
        period: "",
        institution: '',
        description: '',
        degree: '',
        fieldOfStudy: '',
        startYear: 0,
        endYear: 0
    });

    // State for editing existing items
    const [editingExperience, setEditingExperience] = useState<ExperienceType | null>(null);
    const [editingSkill, setEditingSkill] = useState<SkillType | null>(null);
    const [editingEducation, setEditingEducation] = useState<EducationType | null>(null);

    // Initialize local profile when data loads
    useEffect(() => {
        if (profile) {
            setLocalProfile(profile);
        } else {
            setLocalProfile({
                bio: '',
                name: '',
                avatar: '',
                experiences: [],
                skills: [],
                education: []
            });
        }
    }, [profile]);

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const handleSaveProfile = async () => {
        if (!currentUser) return;

        try {
            await dispatch(updateProfile({
                userId: currentUser.uid,
                profile: localProfile
            }));
            setEditMode(false);
        } catch (error) {
            console.error('Failed to save profile:', error);
        }
    };

    const handleAddExperience = () => {
        if (!newExperience.company || !newExperience.role) return;

        setLocalProfile({
            ...localProfile,
            experiences: [
                ...localProfile.experiences,
                {
                    ...newExperience,
                    id: Date.now().toString(),
                }
            ]
        });

        setNewExperience({
            position: "",
            company: '',
            role: '',
            startDate: '',
            endDate: '',
            description: ''
        });
    };

    const handleUpdateExperience = () => {
        if (!editingExperience) return;

        setLocalProfile({
            ...localProfile,
            experiences: localProfile.experiences.map(exp =>
                exp.id === editingExperience.id ? editingExperience : exp
            )
        });

        setEditingExperience(null);
    };

    const handleDeleteExperience = (id: string) => {
        setLocalProfile({
            ...localProfile,
            experiences: localProfile.experiences.filter(exp => exp.id !== id)
        });
    };

    // Similar handlers for skills and education
    const handleAddSkill = () => {
        if (!newSkill.name) return;

        setLocalProfile({
            ...localProfile,
            skills: [
                ...localProfile.skills,
                {
                    ...newSkill,
                    id: Date.now().toString(),
                }
            ]
        });

        setNewSkill({ name: '', level: 'intermediate' });
    };

    const handleUpdateSkill = () => {
        if (!editingSkill) return;

        setLocalProfile({
            ...localProfile,
            skills: localProfile.skills.map(skill =>
                skill.id === editingSkill.id ? editingSkill : skill
            )
        });

        setEditingSkill(null);
    };

    const handleDeleteSkill = (id: string) => {
        setLocalProfile({
            ...localProfile,
            skills: localProfile.skills.filter(skill => skill.id !== id)
        });
    };

    const handleAddEducation = () => {
        if (!newEducation.institution || !newEducation.degree) return;

        setLocalProfile({
            ...localProfile,
            education: [
                ...localProfile.education,
                {
                    ...newEducation,
                    id: Date.now().toString(),
                }
            ]
        });

        setNewEducation({
            description: "", period: "",
            institution: '',
            degree: '',
            fieldOfStudy: '',
            startYear: 0,
            endYear: 0
        });
    };

    const handleUpdateEducation = () => {
        if (!editingEducation) return;

        setLocalProfile({
            ...localProfile,
            education: localProfile.education.map(edu =>
                edu.id === editingEducation.id ? editingEducation : edu
            )
        });

        setEditingEducation(null);
    };

    const handleDeleteEducation = (id: string) => {
        setLocalProfile({
            ...localProfile,
            education: localProfile.education.filter(edu => edu.id !== id)
        });
    };

    if (!currentUser) {
        return (
            <Layout title="Profile" description="User profile">
                <div className="min-h-screen flex items-center justify-center">
                    <p>Please sign in to view your profile</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Your Profile" description="Manage your professional profile">
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto"
                    >
                        {/* Header Section */}
                        <section className="mb-8 flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    Your Profile
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">
                                    Manage your professional information
                                </p>
                            </div>

                            <div className="flex space-x-2">
                                {editMode ? (
                                    <>
                                        <Button
                                            variant="outline"
                                            onClick={() => setEditMode(false)}
                                        >
                                            <X className="w-4 h-4 mr-2" /> Cancel
                                        </Button>
                                        <Button
                                            onClick={handleSaveProfile}
                                            isLoading={loading}
                                        >
                                            <Save className="w-4 h-4 mr-2" /> Save Profile
                                        </Button>
                                    </>
                                ) : (
                                    <Button onClick={() => setEditMode(true)}>
                                        <Edit className="w-4 h-4 mr-2" /> Edit Profile
                                    </Button>
                                )}
                            </div>
                        </section>

                        {/* Bio Section */}
                        <motion.section
                            className="mb-8"
                            variants={container}
                            initial="hidden"
                            animate="show"
                        >
                            <motion.div variants={item}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <BookOpen className="w-5 h-5 mr-2" />
                                            Bio
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {editMode ? (
                                            <Textarea
                                                value={localProfile.bio}
                                                onChange={(e) => setLocalProfile({...localProfile, bio: e.target.value})}
                                                rows={4}
                                                placeholder="Tell us about yourself..."
                                            />
                                        ) : (
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {localProfile.bio || "No bio added yet"}
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </motion.section>

                        {/* Experiences Section */}
                        <motion.section
                            className="mb-8"
                            variants={container}
                            initial="hidden"
                            animate="show"
                        >
                            <motion.h2
                                variants={item}
                                className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center"
                            >
                                <Briefcase className="w-5 h-5 mr-2" />
                                Work Experience
                            </motion.h2>

                            <motion.div
                                className="space-y-4"
                                variants={container}
                            >
                                {localProfile.experiences.map((experience) => (
                                    <motion.div key={experience.id} variants={item}>
                                        <Card>
                                            <CardContent className="p-4">
                                                {editingExperience?.id === experience.id ? (
                                                    <div className="space-y-3">
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <Input
                                                                placeholder="Company"
                                                                value={editingExperience?.company}
                                                                onChange={(e) => setEditingExperience({
                                                                    ...editingExperience as ExperienceType,
                                                                    company: e.target.value
                                                                })}
                                                            />
                                                            <Input
                                                                placeholder="Role"
                                                                value={editingExperience?.role}
                                                                onChange={(e) => setEditingExperience({
                                                                    ...editingExperience as ExperienceType,
                                                                    role: e.target.value
                                                                })}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <Input
                                                                placeholder="Start Date (MM/YYYY)"
                                                                value={editingExperience?.startDate}
                                                                onChange={(e) => setEditingExperience({
                                                                    ...editingExperience as ExperienceType,
                                                                    startDate: e.target.value
                                                                })}
                                                            />
                                                            <Input
                                                                placeholder="End Date (MM/YYYY)"
                                                                value={editingExperience?.endDate || ''}
                                                                onChange={(e) => setEditingExperience({
                                                                    ...editingExperience,
                                                                    endDate: e.target.value
                                                                })}
                                                            />
                                                        </div>
                                                        <Textarea
                                                            placeholder="Description"
                                                            value={editingExperience.description}
                                                            onChange={(e) => setEditingExperience({
                                                                ...editingExperience,
                                                                description: e.target.value
                                                            })}
                                                        />
                                                        <div className="flex justify-end space-x-2">
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => setEditingExperience(null)}
                                                            >
                                                                Cancel
                                                            </Button>
                                                            <Button onClick={handleUpdateExperience}>
                                                                Save
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h3 className="font-semibold text-lg">
                                                                    {experience.role}
                                                                </h3>
                                                                <p className="text-primary-600 dark:text-primary-400">
                                                                    {experience.company}
                                                                </p>
                                                            </div>
                                                            {editMode && (
                                                                <div className="flex space-x-2">
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        onClick={() => setEditingExperience(experience)}
                                                                    >
                                                                        <Edit className="w-4 h-4" />
                                                                    </Button>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        onClick={() => handleDeleteExperience(experience.id)}
                                                                    >
                                                                        <Trash2 className="w-4 h-4 text-red-500" />
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                            <Calendar className="w-4 h-4 mr-1" />
                                                            {experience.startDate} - {experience.endDate || 'Present'}
                                                        </div>
                                                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                                                            {experience.description}
                                                        </p>
                                                    </>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}

                                {editMode && (
                                    <motion.div variants={item}>
                                        <Card>
                                            <CardContent className="p-4">
                                                <div className="space-y-3">
                                                    <h3 className="font-medium">Add New Experience</h3>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <Input
                                                            placeholder="Company"
                                                            value={newExperience.company}
                                                            onChange={(e) => setNewExperience({
                                                                ...newExperience,
                                                                company: e.target.value
                                                            })}
                                                        />
                                                        <Input
                                                            placeholder="Role"
                                                            value={newExperience.role}
                                                            onChange={(e) => setNewExperience({
                                                                ...newExperience,
                                                                role: e.target.value
                                                            })}
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <Input
                                                            placeholder="Start Date (MM/YYYY)"
                                                            value={newExperience.startDate}
                                                            onChange={(e) => setNewExperience({
                                                                ...newExperience,
                                                                startDate: e.target.value
                                                            })}
                                                        />
                                                        <Input
                                                            placeholder="End Date (MM/YYYY)"
                                                            value={newExperience.endDate}
                                                            onChange={(e) => setNewExperience({
                                                                ...newExperience,
                                                                endDate: e.target.value
                                                            })}
                                                        />
                                                    </div>
                                                    <Textarea
                                                        placeholder="Description"
                                                        value={newExperience.description}
                                                        onChange={(e) => setNewExperience({
                                                            ...newExperience,
                                                            description: e.target.value
                                                        })}
                                                    />
                                                    <Button
                                                        onClick={handleAddExperience}
                                                        variant="default"
                                                        className="w-full"
                                                    >
                                                        <Plus className="w-4 h-4 mr-2" /> Add Experience
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.section>

                        {/* Skills Section */}
                        <motion.section
                            className="mb-8"
                            variants={container}
                            initial="hidden"
                            animate="show"
                        >
                            <motion.h2
                                variants={item}
                                className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center"
                            >
                                <Code className="w-5 h-5 mr-2" />
                                Skills
                            </motion.h2>

                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                variants={container}
                            >
                                {localProfile.skills.map((skill) => (
                                    <motion.div key={skill.id} variants={item}>
                                        <Card>
                                            <CardContent className="p-4">
                                                {editingSkill?.id === skill.id ? (
                                                    <div className="flex space-x-2 items-center">
                                                        <Input
                                                            value={editingSkill.name}
                                                            onChange={(e) => setEditingSkill({
                                                                ...editingSkill,
                                                                name: e.target.value
                                                            })}
                                                            className="flex-1"
                                                        />
                                                        <select
                                                            value={editingSkill.level}
                                                            onChange={(e) => setEditingSkill({
                                                                ...editingSkill,
                                                                level: e.target.value as any
                                                            })}
                                                            className="border rounded p-2"
                                                        >
                                                            <option value="beginner">Beginner</option>
                                                            <option value="intermediate">Intermediate</option>
                                                            <option value="advanced">Advanced</option>
                                                        </select>
                                                        <div className="flex space-x-1">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => setEditingSkill(null)}
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={handleUpdateSkill}
                                                            >
                                                                <Save className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <h3 className="font-medium">{skill.name}</h3>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                                                                {skill.level}
                                                            </p>
                                                        </div>
                                                        {editMode && (
                                                            <div className="flex space-x-2">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => setEditingSkill(skill)}
                                                                >
                                                                    <Edit className="w-4 h-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => handleDeleteSkill(skill.id)}
                                                                >
                                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}

                                {editMode && (
                                    <motion.div variants={item}>
                                        <Card>
                                            <CardContent className="p-4">
                                                <div className="space-y-3">
                                                    <h3 className="font-medium">Add New Skill</h3>
                                                    <div className="flex space-x-2">
                                                        <Input
                                                            placeholder="Skill name"
                                                            value={newSkill.name}
                                                            onChange={(e) => setNewSkill({
                                                                ...newSkill,
                                                                name: e.target.value
                                                            })}
                                                            className="flex-1"
                                                        />
                                                        <select
                                                            value={newSkill.level}
                                                            onChange={(e) => setNewSkill({
                                                                ...newSkill,
                                                                level: e.target.value as any
                                                            })}
                                                            className="border rounded p-2"
                                                        >
                                                            <option value="beginner">Beginner</option>
                                                            <option value="intermediate">Intermediate</option>
                                                            <option value="advanced">Advanced</option>
                                                        </select>
                                                    </div>
                                                    <Button
                                                        onClick={handleAddSkill}
                                                        variant="default"
                                                        className="w-full"
                                                    >
                                                        <Plus className="w-4 h-4 mr-2" /> Add Skill
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.section>

                        {/* Education Section */}
                        <motion.section
                            className="mb-8"
                            variants={container}
                            initial="hidden"
                            animate="show"
                        >
                            <motion.h2
                                variants={item}
                                className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center"
                            >
                                <BookOpen className="w-5 h-5 mr-2" />
                                Education
                            </motion.h2>

                            <motion.div
                                className="space-y-4"
                                variants={container}
                            >
                                {localProfile.education.map((education) => (
                                    <motion.div key={education.id} variants={item}>
                                        <Card>
                                            <CardContent className="p-4">
                                                {editingEducation?.id === education.id ? (
                                                    <div className="space-y-3">
                                                        <Input
                                                            placeholder="Institution"
                                                            value={editingEducation.institution}
                                                            onChange={(e) => setEditingEducation({
                                                                ...editingEducation,
                                                                institution: e.target.value
                                                            })}
                                                        />
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <Input
                                                                placeholder="Degree"
                                                                value={editingEducation.degree}
                                                                onChange={(e) => setEditingEducation({
                                                                    ...editingEducation,
                                                                    degree: e.target.value
                                                                })}
                                                            />
                                                            <Input
                                                                placeholder="Field of Study"
                                                                value={editingEducation.fieldOfStudy}
                                                                onChange={(e) => setEditingEducation({
                                                                    ...editingEducation,
                                                                    fieldOfStudy: e.target.value
                                                                })}
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <Input
                                                                type="number"
                                                                placeholder="Start Year"
                                                                value={editingEducation.startYear}
                                                                onChange={(e) => setEditingEducation({
                                                                    ...editingEducation,
                                                                    startYear: parseInt(e.target.value) || 0
                                                                })}
                                                            />
                                                            <Input
                                                                type="number"
                                                                placeholder="End Year"
                                                                value={editingEducation.endYear}
                                                                onChange={(e) => setEditingEducation({
                                                                    ...editingEducation,
                                                                    endYear: parseInt(e.target.value) || 0
                                                                })}
                                                            />
                                                        </div>
                                                        <div className="flex justify-end space-x-2">
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => setEditingEducation(null)}
                                                            >
                                                                Cancel
                                                            </Button>
                                                            <Button onClick={handleUpdateEducation}>
                                                                Save
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h3 className="font-semibold text-lg">
                                                                    {education.institution}
                                                                </h3>
                                                                <p className="text-primary-600 dark:text-primary-400">
                                                                    {education.degree} in {education.fieldOfStudy}
                                                                </p>
                                                            </div>
                                                            {editMode && (
                                                                <div className="flex space-x-2">
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        onClick={() => setEditingEducation(education)}
                                                                    >
                                                                        <Edit className="w-4 h-4" />
                                                                    </Button>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        onClick={() => handleDeleteEducation(education.id)}
                                                                    >
                                                                        <Trash2 className="w-4 h-4 text-red-500" />
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                            <Calendar className="w-4 h-4 mr-1" />
                                                            {education.startYear} - {education.endYear || 'Present'}
                                                        </div>
                                                    </>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}

                                {editMode && (
                                    <motion.div variants={item}>
                                        <Card>
                                            <CardContent className="p-4">
                                                <div className="space-y-3">
                                                    <h3 className="font-medium">Add New Education</h3>
                                                    <Input
                                                        placeholder="Institution"
                                                        value={newEducation.institution}
                                                        onChange={(e) => setNewEducation({
                                                            ...newEducation,
                                                            institution: e.target.value
                                                        })}
                                                    />
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <Input
                                                            placeholder="Degree"
                                                            value={newEducation.degree}
                                                            onChange={(e) => setNewEducation({
                                                                ...newEducation,
                                                                degree: e.target.value
                                                            })}
                                                        />
                                                        <Input
                                                            placeholder="Field of Study"
                                                            value={newEducation.fieldOfStudy}
                                                            onChange={(e) => setNewEducation({
                                                                ...newEducation,
                                                                fieldOfStudy: e.target.value
                                                            })}
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <Input
                                                            type="number"
                                                            placeholder="Start Year"
                                                            value={newEducation.startYear || ''}
                                                            onChange={(e) => setNewEducation({
                                                                ...newEducation,
                                                                startYear: parseInt(e.target.value) || 0
                                                            })}
                                                        />
                                                        <Input
                                                            type="number"
                                                            placeholder="End Year"
                                                            value={newEducation.endYear || ''}
                                                            onChange={(e) => setNewEducation({
                                                                ...newEducation,
                                                                endYear: parseInt(e.target.value) || 0
                                                            })}
                                                        />
                                                    </div>
                                                    <Button
                                                        onClick={handleAddEducation}
                                                        variant="default"
                                                        className="w-full"
                                                    >
                                                        <Plus className="w-4 h-4 mr-2" /> Add Education
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )}
                            </motion.div>
                        </motion.section>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
};