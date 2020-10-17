import { GetStaticProps } from 'next';
import { Title } from '../styles/pages/home';

interface IProduct {
  id: string;
  title: string;
}

interface Top10Props {
  products: IProduct[]
}

export default function Top10({ products }: Top10Props) {
  return (
    <div>
    <section>
      <Title>Top 10</Title>

      <ul>
        {products.map(recommendedProduct => {
          return (
            <li key={recommendedProduct.id}>
              {recommendedProduct.title}
            </li>
          )
        })}
      </ul>
    </section>
    </div>
  )
}

//generate static pages in build, and refresh in 60s
export const getStaticProps: GetStaticProps<Top10Props> = async (context) => {
  const response = await fetch('http://localhost:3333/products');
  const products = await response.json();

  return {
    props : { products },
    revalidate: 60
  }
}