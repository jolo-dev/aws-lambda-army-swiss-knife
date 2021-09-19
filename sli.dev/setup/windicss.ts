import { resolve } from 'path'
import { defineWindiSetup } from '@slidev/types'

export default defineWindiSetup(() => ({
  extract: {
    include: [
      resolve(__dirname, '../**/*.{vue,ts}'),
    ],
  },
  shortcuts: {
    // custom the default background
    'bg-main': 'bg-white text-[#181818] dark:(bg-[#121212] text-[#ddd])',
  },
  theme: {
    colors: {
      gdnPurple: '#280045ff',
      gdnGreen: '#00dbbd'
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      primary: '#280045ff',
      secondary: '#00dbbd',
      danger: '#e3342f',
    }),
  }
}))
