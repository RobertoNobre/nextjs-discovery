import { GetServerSideProps } from 'next';
import { Title } from '@/styles/pages/home';
import SEO from '@/components/SEO';
import { client } from '@/lib/prismic';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';
import Link from 'next/link';

interface HomeProps {
  recommendedProducts: Document[]
}

export default function Home({ recommendedProducts }: HomeProps) {
  async function handleSum(){
    const { sum } = (await import('@/lib/math')).default;
    alert(sum(2, 5));
  }
  
  return (
    <div>
      <SEO 
        title="Devcommerce, uor best site!"
        image="trop.png"
        shouldExcludeTitleSuffix
      />
      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <button onClick={handleSum}>
        Sum
      </button>
    </div>
  )
}

//server side rendering => indexed by crowlers
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ])

  return {
    props: { recommendedProducts: response.results }
  }
}