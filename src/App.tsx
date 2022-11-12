import { Check, Plus, X } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { clsx } from 'clsx'

import { api } from './services/api'

type Data = {
  alreadyRead: boolean
  description: string
  genre: string
  imageURL: string
  pages: number
  title: string
  __v: number
  _id: string
}

export function App() {
  const [isAlreadyRead, setIsAlreadyRead] = useState(false)

  const [books, setBooks] = useState<Data[]>([])

  useEffect(() => {
    async function loadBooks() {
      const { data } = await api.get<Data[]>('')

      setBooks(data)
    }

    loadBooks()
  }, [])

  return (
    <div className="h-screen w-screen bg-zinc-800">
      <header className="flex items-center border-b border-b-zinc-700 h-20 px-5">
        <div className="flex items-center justify-between w-full sm:w-[80rem] mx-auto">
          <button
            className="hidden sm:flex items-center justify-center h-10 w-32 bg-white rounded-full gap-x-2"
            onClick={() => setIsAlreadyRead((prevState) => !prevState)}
          >
            {isAlreadyRead ? (
              <>
                <Check className="text-green-500" weight="bold" />
                <p className="text-zinc-800 text-[10px] font-bold">
                  ALREADY READ
                </p>
              </>
            ) : (
              <>
                <X className="text-red-500" weight="bold" />
                <p className="text-zinc-800 text-[10px] font-bold">NOT READ</p>
              </>
            )}
          </button>

          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-['Baloo_2'] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              BUUKS
            </h1>
            <div className="w-[1px] h-8 bg-zinc-600 mx-4"></div>
            <p className="text-zinc-300 text-xs sm:text-sm">
              {"Some books I've read and some I want to read."}
            </p>
          </div>

          <div className="w-[1px] h-8 bg-zinc-600 mx-4"></div>

          <Plus className="text-2xl text-zinc-500" weight="bold" />
        </div>
      </header>

      <main className="max-w-[80rem] mx-auto">
        <ul className="mt-10">
          {books.map((item) => (
            <li key={item._id} className="flex items-start py-2">
              <img
                alt="Meditações de Marco Aurélio"
                src="https://m.media-amazon.com/images/I/41kn9jKBT6L._SY344_BO1,204,203,200_QL70_ML2_.jpg"
                className="hidden sm:flex w-30 h-40 bg-zinc-700 resize rounded-lg"
              />

              <section className="flex flex-col ml-4 gap-y-7">
                <div className="block">
                  <p className="text-white font-bold uppercase mb-5">
                    {item.title}
                  </p>
                  <p className="text-zinc-300 text-xs sm:text-sm max-w-[40rem]">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-row items-center gap-x-5">
                  <p
                    className={clsx('sm:text-xs text-[10px] font-bold', {
                      'text-green-500': item.alreadyRead,
                      'text-red-500': !item.alreadyRead,
                    })}
                  >
                    {item.alreadyRead ? 'Already read' : 'Not read'}
                  </p>

                  <p className="text-white">{'\u2022'}</p>

                  <p className="text-zinc-300 sm:text-xs text-[10px]">
                    <strong>{item.pages}</strong> pages
                  </p>

                  <p className="text-white">{'\u2022'}</p>

                  <div className="flex items-center justify-center py-2 px-4 bg-zinc-700 rounded-full">
                    <span className="text-white sm:text-xs text-[10px]">
                      {item.genre}
                    </span>
                  </div>
                </div>
              </section>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
