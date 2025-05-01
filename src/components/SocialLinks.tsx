import { Facebook, Globe, Instagram, Linkedin, Twitter } from 'lucide-react';

interface SocialLinksProps {
    links?: {
        instagram?: string;
        facebook?: string;
        linkedin?: string;
        twitter?: string;
        website?: string;
    };
}

const SocialLinks = ({ links }: SocialLinksProps) => {
    if (!links) return null;

    return (
        <div className='flex space-x-3'>
            {links.instagram && (
                <a
                    href={links.instagram}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-krida-gold hover:text-white transition-colors'
                >
                    <Instagram className='w-4 h-4' />
                </a>
            )}

            {links.facebook && (
                <a
                    href={links.facebook}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-krida-gold hover:text-white transition-colors'
                >
                    <Facebook className='w-4 h-4' />
                </a>
            )}

            {links.linkedin && (
                <a
                    href={links.linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-krida-gold hover:text-white transition-colors'
                >
                    <Linkedin className='w-4 h-4' />
                </a>
            )}

            {links.twitter && (
                <a
                    href={links.twitter}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-krida-gold hover:text-white transition-colors'
                >
                    <Twitter className='w-4 h-4' />
                </a>
            )}

            {links.website && (
                <a
                    href={links.website}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-krida-gold hover:text-white transition-colors'
                >
                    <Globe className='w-4 h-4' />
                </a>
            )}
        </div>
    );
};

export default SocialLinks;
