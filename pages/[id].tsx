import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage
} from 'next'
import { htmlToText, supabase } from 'services'
import dayjs from 'dayjs'
import { BackTop, Comment, Footer, Logo, SEO } from 'components'
import Link from 'next/link'
import Markdown from 'react-markdown'

interface State {}

const IdPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  data
}) => {
  return (
    <>
      <SEO
        title={data.title}
        description={htmlToText(data.content).description}
        image={htmlToText(data.content).thumbnailUrl}
      />

      <div className="container mx-auto max-w-screen-md">
        <div className="my-10 space-y-4 text-center">
          <div className="mx-auto mb-10 flex max-w-xs items-center justify-between px-6 text-sm text-neutral-500">
            <Link href="https://resume.kidow.me">
              <a
                target="_blank"
                className="hover:text-neutral-400 hover:underline"
              >
                Résumé
              </a>
            </Link>
            <Link href="/">
              <a>
                <Logo className="h-7 fill-neutral-50" />
              </a>
            </Link>
            <Link href="https://github.com/kidow">
              <a
                target="_blank"
                className="hover:text-neutral-400 hover:underline"
              >
                Github
              </a>
            </Link>
          </div>
          <div className="px-10 text-2xl font-extrabold tracking-tight text-neutral-200 md:text-3xl">
            {data.title}
          </div>
          <div className="text-sm text-neutral-500">
            {dayjs(data.created_at).format('YYYY년 MM월 DD일')}
          </div>
        </div>
      </div>

      <div className="container mx-auto min-h-screen max-w-screen-md">
        <div className="prose prose-invert px-6 md:prose-lg">
          <Markdown>{data.content}</Markdown>
        </div>
      </div>

      <div className="container mx-auto max-w-screen-md px-6 pb-20">
        <Comment />
      </div>

      <BackTop />

      <Footer />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<{ data: IPost }> = async ({
  params
}) => {
  const id = params?.id as string
  const { data, error } = await supabase
    .from<IPost>('posts')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return { redirect: { destination: '/', permanent: false } }
  return {
    props: {
      data
    }
  }
}

export default IdPage
