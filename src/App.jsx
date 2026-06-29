import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Contexts
import { AudioProvider } from '@contexts/AudioContext'
import { ScrollProvider } from '@contexts/ScrollContext'
import { StoryProvider, useStoryContext } from '@contexts/StoryContext'

// Global components
import Cursor from '@components/common/Cursor'
import AudioController from '@components/common/AudioController'
import FilmGrain from '@components/effects/FilmGrain'
import Loader from '@components/Loader'

// Pages
import Opening from '@pages/Opening'
import Chapter1 from '@pages/chapters/Chapter1'
import Chapter2 from '@pages/chapters/Chapter2'
import Chapter3 from '@pages/chapters/Chapter3'
import Chapter4 from '@pages/chapters/Chapter4'
import Chapter5 from '@pages/chapters/Chapter5'
import Chapter6 from '@pages/chapters/Chapter6'
import Chapter7 from '@pages/chapters/Chapter7'
import Chapter8 from '@pages/chapters/Chapter8'
import Chapter9 from '@pages/chapters/Chapter9'
import Chapter10 from '@pages/chapters/Chapter10'
import Chapter11 from '@pages/chapters/Chapter11'
import Chapter12 from '@pages/chapters/Chapter12'
import Chapter13 from '@pages/chapters/Chapter13'
import Chapter14 from '@pages/chapters/Chapter14'
import Chapter15 from '@pages/chapters/Chapter15'

// Styles
import '@styles/globals.css'

function AppRoutes() {
  const location = useLocation()
  const { loaderComplete, openingComplete } = useStoryContext()

  return (
    <>
      <AnimatePresence mode="wait">
        {!loaderComplete && <Loader key="loader" />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {loaderComplete && !openingComplete && (
          <Opening key="opening" />
        )}
      </AnimatePresence>

      {loaderComplete && openingComplete && (
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Opening />} />
            <Route path="/chapter/1" element={<Chapter1 />} />
            <Route path="/chapter/2" element={<Chapter2 />} />
            <Route path="/chapter/3" element={<Chapter3 />} />
            <Route path="/chapter/4" element={<Chapter4 />} />
            <Route path="/chapter/5" element={<Chapter5 />} />
            <Route path="/chapter/6" element={<Chapter6 />} />
            <Route path="/chapter/7" element={<Chapter7 />} />
            <Route path="/chapter/8" element={<Chapter8 />} />
            <Route path="/chapter/9" element={<Chapter9 />} />
            <Route path="/chapter/10" element={<Chapter10 />} />
            <Route path="/chapter/11" element={<Chapter11 />} />
            <Route path="/chapter/12" element={<Chapter12 />} />
            <Route path="/chapter/13" element={<Chapter13 />} />
            <Route path="/chapter/14" element={<Chapter14 />} />
            <Route path="/chapter/15" element={<Chapter15 />} />
          </Routes>
        </AnimatePresence>
      )}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AudioProvider>
        <StoryProvider>
          <ScrollProvider>
            <Cursor />
            <AudioController />
            <FilmGrain opacity={0.02} />
            <AppRoutes />
          </ScrollProvider>
        </StoryProvider>
      </AudioProvider>
    </BrowserRouter>
  )
}
