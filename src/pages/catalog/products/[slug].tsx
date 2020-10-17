import { useRouter } from 'next/router';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const AddToCartModal = dynamic(() => import('../../../components/AddToCartModal'), {
  loading: () => <p>Loading...</p>, ssr: false
})

export default function Product(){
  const router = useRouter();
  const [isAddToCardModalVisible, setIsAddToCardModalVisible] = useState(false);

  function handleAddToCart() {
    setIsAddToCardModalVisible(true);
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>

      <button onClick={handleAddToCart}>Add to cart</button>

      { isAddToCardModalVisible && <AddToCartModal /> }
    </div>
  )
}