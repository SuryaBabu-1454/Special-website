import { createContext, useContext, useState, useCallback } from 'react'

const StoryCtx = createContext(null)

export function StoryProvider({ children }) {
  const [currentChapter, setCurrentChapter] = useState(0)
  const [completedChapters, setCompletedChapters] = useState(new Set())
  const [loaderComplete, setLoaderComplete] = useState(false)
  const [openingComplete, setOpeningComplete] = useState(false)
  const [secretsFound, setSecretsFound] = useState([])

  const completeChapter = useCallback((chapterNum) => {
    setCompletedChapters(prev => new Set([...prev, chapterNum]))
  }, [])

  const findSecret = useCallback((secretId) => {
    setSecretsFound(prev => prev.includes(secretId) ? prev : [...prev, secretId])
  }, [])

  const totalProgress = Math.round((completedChapters.size / 6) * 100)

  return (
    <StoryCtx.Provider value={{
      currentChapter, setCurrentChapter,
      completedChapters, completeChapter,
      loaderComplete, setLoaderComplete,
      openingComplete, setOpeningComplete,
      secretsFound, findSecret,
      totalProgress,
    }}>
      {children}
    </StoryCtx.Provider>
  )
}

export const useStoryContext = () => {
  const ctx = useContext(StoryCtx)
  if (!ctx) throw new Error('useStoryContext must be inside StoryProvider')
  return ctx
}
