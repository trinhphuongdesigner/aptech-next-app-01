import Head from "next/head";

import axiosClient from "../../libraries/axiosClient";

export default function ProductDetail(props) {
  const { product } = props;

  return (
    <>
      <Head>
        <title>Ban chai da nang</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {
        product && (
          <main>
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Price:</strong> {product.price}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <p><strong>Discount:</strong> {product.discount}%</p>
            <p><strong>Total:</strong> {product.total}</p>
            <p><strong>Supplier name :</strong> {product.supplier.name}</p>
            <p><strong>Supplier email :</strong> {product.supplier.email}</p>
            <p><strong>Supplier address :</strong> {product.supplier.address}</p>
          </main>
        )
      }

    </>
  );
}

// SSG
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export async function getStaticProps(req) {
  try {
    const { params } = req;
    const response = await axiosClient.get(`/products/${params.id}`);

    return {
      props: {
        product: response.data.result,
      },
      revalidate: 5,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}


// SSR
// export async function getServerSideProps(req) {
//   try {
//     const { params, query } = req;
//     // console.log('««««« req »»»»»', req);
//     const response = await axios.get('http://localhost:9000/products');

//     return {
//       props: {
//         products: response.data,
//       },
//     };
//   } catch (error) {
//     return {
//       notFound: true,
//     };
//   }
// }