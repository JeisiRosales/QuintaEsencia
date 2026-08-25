import { PortableText, PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/lib/sanity';

const components: PortableTextComponents = {
    block: {
        normal: ({ children }) => (
            <p className="text-body-l font-sans text-dark-2 leading-relaxed mb-6">
                {children}
            </p>
        ),
        h2: ({ children }) => (
            <h2 className="text-title-3 font-sans font-semibold text-dark-1 mt-10 mb-4 leading-snug">
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-title-4 font-sans font-semibold text-dark-1 mt-8 mb-3">
                {children}
            </h3>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-gold pl-6 my-8 italic text-title-5 font-sans text-dark-1 bg-gold/5 py-4 pr-4 rounded-r-2xl">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className="list-disc pl-6 space-y-3 my-6 text-body-l font-sans text-dark-2">
                {children}
            </ul>
        ),
        number: ({ children }) => (
            <ol className="list-decimal pl-6 space-y-3 my-6 text-body-l font-sans text-dark-2">
                {children}
            </ol>
        ),
    },
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) return null;
            const imgUrl = urlFor(value).width(1000).format('webp').url();
            return (
                <figure className="my-10 rounded-3xl overflow-hidden shadow-xs border border-dark-1/5">
                    <picture className="w-full h-auto block">
                        <source srcSet={imgUrl} type="image/webp" />
                        <img
                            src={imgUrl}
                            alt={value.alt || 'Imagen de lectura Quinta Esencia'}
                            className="w-full h-auto block object-cover"
                            loading="lazy"
                        />
                    </picture>
                    {value.caption && (
                        <figcaption className="text-center text-body-s font-sans text-dark-3/70 mt-3 italic">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            );
        },
    },
};

export function PortableTextRenderer({ value }: { value: any[] }) {
    if (!value) return null;
    return <PortableText value={value} components={components} />;
}