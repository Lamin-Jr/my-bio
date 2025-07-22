export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const generateExcerpt = (content: string, length = 160) => {
    if (content.length <= length) return content;
    return content.substring(0, length) + '...';
};