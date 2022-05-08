import { Footer, Logo, SEO } from 'components'
import Link from 'next/link'
import { htmlToText, supabase } from 'services'
import { markdownToTxt } from 'markdown-to-txt'
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

interface State {}

const HomePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  list
}) => {
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
            <Logo className="h-7 fill-neutral-50" />
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
              <Link key={item.id} href={`/${item.id}`}>
                <a className="group">
                  <h2 className="line-clamp-1 group-hover:underline md:text-lg md:line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="mt-2.5 text-sm text-neutral-500 line-clamp-3 md:text-base">
                    {htmlToText(item.content).content}
                  </p>
                  <div className="mt-2 text-sm text-neutral-300">
                    {dayjs(item.created_at).locale('ko').fromNow()}
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps<{ list: IPost[] }> = async () => {
  const { data, error } = await supabase
    .from<IPost>('posts')
    .select('*')
    .match({ is_inactivated: false })
  if (error) {
    console.error(error)
    return { props: { list: [] } }
  }
  return {
    props: {
      list: data.map((item) => {
        const content = markdownToTxt(item.content)
        return {
          ...item,
          content:
            content.length > 140 ? `${content.substring(0, 140)}...` : content
        }
      })
    }
  }
}

export default HomePage
