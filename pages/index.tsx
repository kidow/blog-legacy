import { Post, SEO } from 'components'
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

      <div className="container mx-auto">
        <div className="px-6">
          <header className="flex items-center justify-center py-8 md:py-10">
            Kidow
          </header>
        </div>
      </div>

      <div className="container mx-auto min-h-screen">
        <div className="px-6">
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
    </>
  )
}

export default HomePage
