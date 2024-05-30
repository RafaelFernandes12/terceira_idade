import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

interface listItemProps {
  path: string
  name: string
  children: React.ReactNode
}

export function ListItem({ path, name, children }: listItemProps) {
  const pathname = usePathname()
  return (
    <>
      {pathname.toLocaleLowerCase().includes(`${name.toLocaleLowerCase()}`) ||
      pathname === `${path}` ? (
        <li
          className={
            'my-4 flex items-center rounded-full bg-darkBlue/20 max-sm:w-3/4'
          }
        >
          <motion.a href={path} className="rounded-full py-1 px-2">
            {children}
          </motion.a>
        </li>
      ) : (
        <li className={'my-4 flex items-center rounded-full max-sm:w-3/4'}>
          <motion.a
            href={path}
            className="rounded-full py-1 px-2"
            initial={{ width: 0, display: 'flex' }}
            whileHover={{
              width: 'calc(100%)',
              backgroundColor: 'rgb(22 18 80 / 0.2)',
            }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.a>
        </li>
      )}
    </>
  )
}
