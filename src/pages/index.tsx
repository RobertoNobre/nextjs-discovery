import { GetServerSideProps } from 'next';
import { Title } from '@/styles/pages/home';
import SEO from '@/components/SEO';

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[]
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
                {recommendedProduct.title}
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);
  const recommendedProducts = await response.json();

  return {
    props: { recommendedProducts }
  }
}