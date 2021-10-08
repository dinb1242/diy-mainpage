import 'tailwindcss/tailwind.css'
import Layout from '../components/Layout'
import wrapper from '../components/store/configureStore'
import { PersistGate } from "redux-persist/integration/react"
import { useStore } from "react-redux"

function MyApp({ Component, pageProps }) {
  const store = useStore();
  if (Component.name === "Home") {
    return (
      <PersistGate loading={ null } persistor={ store.__persistor }>
        <Component {...pageProps} />
      </PersistGate>
    )
  }

  return (
    <PersistGate loading={ null } persistor={ store.__persistor }>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </PersistGate>
  )
}

export default wrapper.withRedux(MyApp)
