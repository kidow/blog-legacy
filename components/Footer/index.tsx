import { Logo } from 'components'
import Link from 'next/link'
import type { FC } from 'react'

export interface Props {}
interface State {}

const Footer: FC<Props> = () => {
  return (
    <footer className="bg-neutral-800 text-xs">
      <div className="container mx-auto max-w-screen-md">
        <div className="p-6">
          <Link href="/">
            <a>
              <Logo className="h-6 fill-neutral-50" />
            </a>
          </Link>
          <div className="mt-2 text-sm text-neutral-400">
            더 게으르기 위해, 더 부지런히 공부하는 개발자입니다.
          </div>

          <div className="mb-1 mt-8">
            <Link href="https://resume.kidow.me">
              <a
                target="_blank"
                className="text-base text-teal-600 hover:underline"
              >
                김동욱
              </a>
            </Link>
          </div>
          <Link href="mailto:wcgo2ling@gmail.com">
            <a target="_blank" className="text-teal-600 hover:underline">
              wcgo2ling@gmail.com
            </a>
          </Link>

          <div className="mt-4 border-t border-neutral-700 pt-4 text-neutral-600">
            © {new Date().getFullYear()} kidow. All right reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
