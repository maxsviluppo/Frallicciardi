import { Metadata } from 'next';
import { PRODUCTS } from '../../../data/products';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) {
    return {
      title: 'Prodotto Non Trovato | Frallicciardi',
      description: 'Il prodotto richiesto non è presente nel catalogo Frallicciardi.',
    };
  }
  return {
    title: `${product.name} | Frallicciardi Lavorazione Plexiglas Nautico`,
    description: product.description || `Specifiche tecniche e dettagli per ${product.name}. Realizzato artigianalmente da Frallicciardi con oltre 28 anni di esperienza.`,
    openGraph: {
      title: `${product.name} | Frallicciardi`,
      description: product.description || `Specifiche tecniche e dettagli per ${product.name}.`,
      images: [
        {
          url: product.image,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProductDetailClient id={id} />;
}
