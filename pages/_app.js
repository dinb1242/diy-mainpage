import 'tailwindcss/tailwind.css'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  if (Component.name === "Home") {
    return (
      <Component {...pageProps} />
    )
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )

}

export default MyApp