import { useProductDetail } from '../hooks/useProductDetail';
import { ProductGallery } from '../components/detail/ProductGallery';
import { ProductBadges } from '../components/detail/ProductsBadge';
import { ProductTabs } from '../components/detail/ProductTabs';
import { ProductPurchaseForm } from '../components/detail/ProductPurchaseForm';
import { RelatedArticles } from '../components/detail/RelatedArticles';
import type { Product } from '@/types/product';
import { Breadcrumbs } from '@/components/ui/BreadCrumbs';

export function ProductDetailPage({ product }: { product: Product }) {
    const detailState = useProductDetail(product);

    if (!product) return <div className="min-h-screen flex items-center justify-center text-dark-1">Cargando alquimia...</div>;

    return (
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-24 min-h-screen">
            <Breadcrumbs skip={1} rootLabel="Colección" rootPath="/coleccion" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                <ProductGallery
                    images={detailState.allImages}
                    activeImageIndex={detailState.activeImageIndex}
                    setActiveImageIndex={detailState.setActiveImageIndex}
                    productName={product.name}
                />

                <section className="flex flex-col mb-4">
                    <h1 className="text-title-2 font-bold text-dark-1 mb-2">{product.name}</h1>
                    <ProductBadges isHandmade={product.isHandmade} isOrganic={product.isOrganic} weight={product.weight} />
                    <p className="text-body-m text-dark-1 mt-4">{product.shortDescription}</p>
                    <p className="text-title-2 text-dark-1 font-light mt-4 mb-0">${product.price.toFixed(2)}</p>
                    <ProductTabs product={product} activeTab={detailState.activeTab} onTabChange={detailState.setActiveTab} />
                    <ProductPurchaseForm product={product} quantity={detailState.quantity} setQuantity={detailState.setQuantity} totalPrice={detailState.totalPrice} />
                </section>
            </div>

            {product.relatedArticles && <RelatedArticles articles={product.relatedArticles} />}
        </main>
    );
}