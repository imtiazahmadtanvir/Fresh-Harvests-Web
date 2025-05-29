import ProductDetailsClient from "@/components/product-details/product-details-client"
import type { Metadata } from "next"

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Product Details - Fresh Harvest`,
    description: "View detailed information about our fresh products",
  }
}

export default function ProductDetailsPage({ params }: Props) {
  return <ProductDetailsClient productId={params.id} />
}
