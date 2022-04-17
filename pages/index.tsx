import { Footer, Logo, Post, SEO } from 'components'
import Link from 'next/link'
import { useEffect } from 'react'
import { supabase, useObjectState } from 'services'

interface State {
  list: IPost[]
}

const HomePage = () => {
  const [{ list }, setState] = useObjectState<State>({ list: [] })

  const get = async () => {
    const { data, error } = await supabase.from<IPost>('posts').select('*')
    if (error) {
      console.error(error)
      return
    }
    setState({ list: data })
  }

  useEffect(() => {
    get()
  }, [])
  return (
    <>
      <SEO />

      <div className="container mx-auto max-w-xs">
        <div className="px-6 py-8 md:py-10">
          <header className="flex items-center justify-between text-sm text-neutral-500">
            <Link href="https://resume.kidow.me">
              <a
                target="_blank"
                className="hover:text-neutral-400 hover:underline"
              >
                Résumé
              </a>
            </Link>
            <Logo className="h-6 fill-neutral-50" />
            <Link href="https://github.com/kidow">
              <a
                target="_blank"
                className="hover:text-neutral-400 hover:underline"
              >
                Github
              </a>
            </Link>
          </header>
        </div>
      </div>

      <div className="container mx-auto min-h-screen">
        <div className="px-6 pb-20">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((item) => (
              <Post
                key={item.id}
                id={item.id}
                title={item.title}
                content={item.content}
                created_at={item.created_at}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default HomePage
