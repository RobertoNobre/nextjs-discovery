import { useRouter } from "next/router";
import { useState } from "react";
import dynamic from "next/dynamic";
import Prismic from "prismic-javascript";
import { Document } from "prismic-javascript/types/documents";
import PrismicDOM from "prismic-dom";
import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "@/lib/prismic";

interface ProductProps {
  product: Document;
}

const AddToCartModal = dynamic(() => import("@/components/AddToCartModal"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Product({ product }: ProductProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  const [isAddToCardModalVisible, setIsAddToCardModalVisible] = useState(false);
  function handleAddToCart() {
    setIsAddToCardModalVisible(true);
  }
  
  return (
    <div>
      <h1>{PrismicDOM.RichText.asText(product.data.title)}</h1>
      <img src={product.data.thumnail.url} alt={product.data.thumnail.alt}/>
      <div
        dangerouslySetInnerHTML={{
          __html: PrismicDOM.RichText.asHtml(product.data.description),
        }}
      ></div>

      <p>Price: {product.data.price}</p>

      <button onClick={handleAddToCart}>Add to cart</button>
      {isAddToCardModalVisible && <AddToCartModal />}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
  const { slug } = context.params;

  const product = await client().getByUID("product", String(slug), {});

  return {
    props: { product },
    revalidate: 60,
  };
};
