
import * as Y from 'yjs'
import { WebrtcProvider } from '../src/y-webrtc.js'

// Create two documents to test sync
const doc1 = new Y.Doc()
const doc2 = new Y.Doc()

// Create providers with the same room name
const provider1 = new WebrtcProvider('test-room', doc1, {
  signaling: ['ws://localhost:4444']
})

const provider2 = new WebrtcProvider('test-room', doc2, {
  signaling: ['ws://localhost:4444']
})

// Create test data structures
const yarray1 = doc1.getArray('array')
const yarray2 = doc2.getArray('array')

// Listen for changes
yarray1.observeDeep(() => {
  console.log('Doc1 array updated:', yarray1.toJSON())
})

yarray2.observeDeep(() => {
  console.log('Doc2 array updated:', yarray2.toJSON())
})

// Test sync by adding data after a delay
setTimeout(() => {
  yarray1.push(['Test from doc1'])
}, 2000)

setTimeout(() => {
  yarray2.push(['Test from doc2'])
}, 4000)

// Make objects available in console for testing
window.test = { provider1, provider2, doc1, doc2, yarray1, yarray2 }
