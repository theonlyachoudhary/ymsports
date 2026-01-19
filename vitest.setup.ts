// Any setup scripts you might need go here

// Load .env files
import 'dotenv/config'

// Add testing-library matchers
import '@testing-library/jest-dom/vitest'

// Automatic cleanup after each test
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})
