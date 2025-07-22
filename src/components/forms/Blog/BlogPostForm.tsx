import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router';

import { createBlogPost, updateBlogPost, fetchBlogPostById, selectBlog } from '@store/blog/blogSlice.ts';
import { Button } from '@/components/ui/Button';
import {Input} from "@utils/form/Input.tsx";
import {Textarea} from "@utils/form/TextArea.tsx";
import {useAppDispatch, useAppSelector} from "@hooks/appHooks.ts";
import {Select} from "@utils/form/Select.tsx";
import {BlogPost} from "@interface/blog.ts";

const blogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    excerpt: Yup.string(),
    category: Yup.string().required('Category is required'),
    published: Yup.boolean().required('Published status is required'),
    imageUrl: Yup.string().url('Invalid URL'),
    tags: Yup.array().of(Yup.string())
});

export const BlogPostForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const { currentPost, loading } = useAppSelector(selectBlog);
    const isEditMode = !!id;

    React.useEffect(() => {
        if (id) {
            dispatch(fetchBlogPostById(id));
        }
    }, [id, dispatch]);

    const initialValues = {
        title: currentPost?.title || '',
        content: currentPost?.content || '',
        excerpt: currentPost?.excerpt || '',
        category: currentPost?.category || '',
        published: currentPost?.published || false,
        imageUrl: currentPost?.imageUrl || '',
        tags: currentPost?.tags || []
    } as BlogPost;

    const handleSubmit = async (values: BlogPost ) => {
        if (isEditMode && id) {
            await dispatch(updateBlogPost({...values, id}));
        } else {
            await dispatch(createBlogPost(values));
        }
        navigate('/blog');
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">
                {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h2>

            <Formik
                initialValues={initialValues}
                validationSchema={blogSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ isSubmitting, values, setFieldValue }) => (
                    <Form className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium mb-1">
                                Title
                            </label>
                            <Field
                                as={Input}
                                id="title"
                                name="title"
                                type="text"
                            />
                            <ErrorMessage name="title" component="div" className="text-error text-sm" />
                        </div>

                        <div>
                            <label htmlFor="excerpt" className="block text-sm font-medium mb-1">
                                Excerpt (Optional)
                            </label>
                            <Field
                                as={Textarea}
                                id="excerpt"
                                name="excerpt"
                                rows={3}
                            />
                            <ErrorMessage name="excerpt" component="div" className="text-error text-sm" />
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-medium mb-1">
                                Content
                            </label>
                            <Field
                                as={Textarea}
                                id="content"
                                name="content"
                                rows={10}
                            />
                            <ErrorMessage name="content" component="div" className="text-error text-sm" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium mb-1">
                                    Category
                                </label>
                                <Select
                                    id="category"
                                    name="category"
                                    value={values.category}
                                    onChange={(e) => setFieldValue('category', e.target.value)}
                                >
                                    <option value="">Select a category</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Design">Design</option>
                                    <option value="Business">Business</option>
                                    <option value="Lifestyle">Lifestyle</option>
                                </Select>
                                <ErrorMessage name="category" component="div" className="text-error text-sm" />
                            </div>

                            <div>
                                <label htmlFor="published" className="block text-sm font-medium mb-1">
                                    Published
                                </label>
                                <Select
                                    id="published"
                                    name="published"
                                    value={values.published.toString()}
                                    onChange={(e) => setFieldValue('published', e.target.value === 'true')}
                                >
                                    <option value="true">Published</option>
                                    <option value="false">Draft</option>
                                </Select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
                                Image URL (Optional)
                            </label>
                            <Field
                                as={Input}
                                id="imageUrl"
                                name="imageUrl"
                                type="text"
                            />
                            <ErrorMessage name="imageUrl" component="div" className="text-error text-sm" />
                        </div>

                        <div>
                            <label htmlFor="tags" className="block text-sm font-medium mb-1">
                                Tags (Comma separated)
                            </label>
                            <Field
                                as={Input}
                                id="tags"
                                name="tags"
                                type="text"
                                value={values.tags.join(', ')}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const tags = e.target.value.split(',').map(tag => tag.trim());
                                    setFieldValue('tags', tags);
                                }}
                            />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate('/blog')}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                isLoading={loading || isSubmitting}
                            >
                                {isEditMode ? 'Update Post' : 'Create Post'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};