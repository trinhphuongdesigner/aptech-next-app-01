import React from "react";
import Head from "next/head";
import Link from "next/link";
import PropTypes from "prop-types";

import axiosClient from "../../libraries/axiosClient";

function Products(props) {
  const { products } = props;

  return (
    <>
      <Head>
        <title>Ban chai da nang</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ul>
        {products?.length > 0 &&
          products.map((item, idx) => (
            <li key={item._id} className="mb-2">
              <Link href={`/products/${item._id}`}>
                <strong>{`${idx + 1}: ${item.name}`}</strong>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}

Products.propTypes = {
  products: PropTypes.instanceOf(Array),
};

Products.defaultProps = {
  products: [],
};

export default Products;

export async function getStaticProps() {
  try {
    const response = await axiosClient.get("/products");

    return {
      props: {
        products: response.data,
      },

      revalidate: 24 * 60 * 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
