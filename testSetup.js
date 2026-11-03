import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

afterEach(() => {
  cleanup()
})


/*
Not exactly sure what this even does, genuinely seems to serve some purpose of cleanup, but we did this with localhost,
why do we need vitest, or jsdom, etc?


*/