import Head from 'next/head';

type Props = {
  customers: { name: string }[];
};

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

export async function fetchCustomers(query: string) {
  try {
    const res = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${space}/environments/master`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ query }),
      },
    );
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getStaticProps() {
  const { customerCollection } = await fetchCustomers(`
  {
    customerCollection {
      items {
        name
      }
    }
  }
  `);
  return {
    props: {
      customers: customerCollection.items,
    },
  };
}

function Customers({ customers }: Props) {
  return (
    <main>
      <Head>
        <title>Customers</title>
      </Head>
      {customers.map(entry => <h2>{entry.name}</h2>)}
    </main>
  );
}

export default Customers;
