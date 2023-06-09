import React from "react";
import Head from "next/head";
import Link from "next/link";
import PropTypes from "prop-types";

import axiosClient from "../../libraries/axiosClient";

function Products(props) {
  const { posts } = props;

  return (
    <>
      <Head>
        <title>Fake</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ul>
        {posts?.length > 0 &&
          posts.map((item, idx) => (
            <li key={item.id} className="mb-2">
              <Link href={`/products/${item.id}`}>
                <strong>{`${idx + 1}: ${item.title}`}</strong>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}

Products.propTypes = {
  posts: PropTypes.instanceOf(Array),
};

Products.defaultProps = {
  posts: [],
};

export default Products;

export async function getStaticProps() {
  try {
    const response = await axiosClient.get("/posts");

    return {
      props: {
        posts: response.data,
      },

      revalidate: 24 * 60 * 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
