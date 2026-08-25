import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { urlFor } from '@/lib/sanity'
import { useHomeData } from '../hooks/useHomeData'
import { useGlobalAnimations } from '@/hooks/useGlobalAnimations'

export function RecommendedReading() {
    const { latestArticles, isLoading } = useHomeData()
    const { staggerContainer, fadeUp } = useGlobalAnimations()

    if (isLoading || !latestArticles || latestArticles.length === 0) {
        return null
    }

    return (
        <section className="w-full py-16 px-4 md:px-8 -mt-16">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-50px' }}
                    variants={fadeUp}
                    className="text-left mb-10"
                >
                    <p className="text-title-4 font-bold text-dark-1">
                        Artículos recomendados
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {latestArticles.map((article, index) => {
                        const imageUrl = article.mainImage ? urlFor(article.mainImage).width(600).format('webp').url() : ''
                        // Use intention as category if available, otherwise default to "Artículo"
                        const category = article.intentions && article.intentions.length > 0
                            ? article.intentions[0].title
                            : 'Artículo'

                        return (
                            <motion.div
                                key={article._id}
                                variants={fadeUp}
                            >
                                <Link to="/blog/$slug" params={{ slug: article.slug.current }} className="group block cursor-pointer">
                                    <div className="flex flex-col h-full">
                                        <div className="relative w-full aspect-[4/3] mb-4 overflow-hidden rounded-sm bg-light-2">
                                            {imageUrl && (
                                                <img
                                                    src={imageUrl}
                                                    alt={article.title}
                                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                                />
                                            )}
                                        </div>
                                        <div className="flex flex-col flex-1 px-1">
                                            <span className="text-body-s text-dark-2">
                                                {category}
                                            </span>
                                            <p className="text-title-5 md:text-title-6 text-dark-1 font-bold mb-3 leading-snug group-hover:text-dark-3 transition-colors">
                                                {article.title}
                                            </p>
                                            {/* Since we don't have read time directly, we can show a placeholder or use the excerpt if needed, but the design shows a short text like "Three-minute read". Let's show a standard text or if excerpt exists. */}
                                            <p className="text-sub-title text-dark-3 line-clamp-3">
                                                {article.excerpt}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    )
}
