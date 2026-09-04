'use client'

import { useState, useMemo } from 'react'
import { ChevronRight, Check } from 'lucide-react'

// Real Q&A from knowledge base
const allCards = [
  { id: 1, topic: 'BST Validation', q: 'What contract must a valid binary search tree satisfy?', a: 'For every node, every value in the left subtree is strictly less than the node, and every value in the right subtree is strictly greater. The rule must hold recursively for every subtree.' },
  { id: 2, topic: 'BST Validation', q: 'When validating a subtree recursively, what can the current call assume?', a: 'Each recursive call can assume its own subtree is valid. The current call only needs to check the current node against its allowed bounds, then pass tighter bounds to its children.' },
  { id: 3, topic: 'BST Validation', q: 'How do valid bounds change as you move through the tree?', a: 'The left child inherits the upper bound of the current node. The right child inherits the lower bound. Each step narrows the interval of values that can appear below it.' },
  { id: 4, topic: 'BST Validation', q: 'Complete the recursive skeleton for validating a BST.', a: 'Use an open interval and reject values outside it. A null node is valid because an empty subtree satisfies the contract.\n\nfunction isValid(node, low = -Infinity, high = Infinity) {\n  if (node === null) return true\n  if (node.val <= low || node.val >= high) return false\n  return isValid(node.left, low, node.val) &&\n    isValid(node.right, node.val, high)\n}' },
  { id: 5, topic: 'Algorithms', q: 'What is the time complexity of binary search?', a: 'O(log n) because with each iteration, the search space is halved. Even for 1 billion elements, you need at most 30 comparisons.' },
  { id: 6, topic: 'Data Structures', q: 'What is the difference between a stack and a queue?', a: 'A stack is LIFO (Last In, First Out), while a queue is FIFO (First In, First Out). Stacks use push/pop; queues use enqueue/dequeue.' },
  { id: 7, topic: 'Algorithms', q: 'Explain quicksort\'s partition algorithm.', a: 'Pick a pivot element and partition the array into elements smaller than the pivot and elements larger than it. Recursively sort both partitions. Average case: O(n log n).' },
  { id: 8, topic: 'Data Structures', q: 'When should you use a hash table over a sorted array?', a: 'Use a hash table for O(1) average lookup, insertion, and deletion. Use a sorted array when you need range queries or sorted iteration, or when you need to minimize memory overhead.' },
  { id: 9, topic: 'Algorithms', q: 'What does it mean for an algorithm to be in-place?', a: 'An algorithm is in-place if it sorts or rearranges data using O(1) or O(log n) extra space, modifying the input array directly without requiring a copy.' },
  { id: 10, topic: 'Data Structures', q: 'What is the purpose of a linked list node\'s next pointer?', a: 'The next pointer maintains the sequential connection between nodes. It allows traversal from one node to the next without requiring contiguous memory, enabling efficient insertion and deletion.' },
]

const decks = [
  { id: 1, name: 'BST Validation', count: 4, desc: 'Recursive tree validation patterns and bound shrinkage' },
  { id: 2, name: 'Core Algorithms', count: 28, desc: 'Sorting, searching, and fundamental algorithmic patterns' },
  { id: 3, name: 'Data Structures', count: 42, desc: 'Arrays, linked lists, trees, graphs, and heaps' },
  { id: 4, name: 'System Design', count: 15, desc: 'Scalability, caching, load balancing, databases' },
]

type ViewState = 'landing' | 'test' | 'score' | 'email' | 'decks'

export default function Page() {
  const [view, setView] = useState<ViewState>('landing')
  const [testIndex, setTestIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [testCards] = useState(() => allCards.slice(0, 10))
  const [scores, setScores] = useState<Record<number, boolean>>({})
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const testCard = testCards[testIndex]
  const score = Object.values(scores).filter(Boolean).length
  const scorePercent = Math.round((score / testCards.length) * 100)

  function startTest() {
    setScores({})
    setTestIndex(0)
    setRevealed(false)
    setView('test')
  }

  function grade(correct: boolean) {
    setScores(prev => ({ ...prev, [testIndex]: correct }))
    if (testIndex < testCards.length - 1) {
      setTestIndex(testIndex + 1)
      setRevealed(false)
    } else {
      setView('score')
    }
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    setEmailError('')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }
    setView('decks')
  }

  // Landing
  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <header className="border-b border-gray-200">
          <div className="mx-auto max-w-2xl px-6 py-8 sm:px-8">
            <h1 className="text-xl font-bold tracking-tight">Forge</h1>
            <p className="mt-1 text-sm text-gray-600">Technical interview flashcards. Test yourself.</p>
          </div>
        </header>
        <main className="mx-auto max-w-2xl px-6 py-12 sm:px-8 sm:py-16">
          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Take the interview test</h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-gray-700">
                Ten quick questions on core algorithms and data structures. Reveal answers and grade yourself. No signup yet—just test your knowledge.
              </p>
            </section>
            <button
              onClick={startTest}
              className="inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              Start test <ChevronRight size={18} />
            </button>
          </div>
        </main>
      </div>
    )
  }

  // Test
  if (view === 'test') {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <header className="border-b border-gray-200">
          <div className="mx-auto max-w-2xl px-6 py-6 sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm text-gray-600">{testIndex + 1} / {testCards.length}</p>
                <p className="mt-1 text-lg font-semibold text-gray-900">{testCard.topic}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-2xl font-bold">{Object.keys(scores).length}</p>
                <p className="text-xs text-gray-600">answered</p>
              </div>
            </div>
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-gray-200">
              <div className="h-full bg-black transition-all" style={{ width: `${((testIndex + 1) / testCards.length) * 100}%` }} />
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-2xl px-6 py-8 sm:px-8">
          <article className="rounded-lg border border-gray-200 bg-gray-50 p-6 sm:p-8">
            <p className="font-mono text-xs text-gray-600 uppercase tracking-wide">Question</p>
            <h2 className="mt-4 text-2xl font-bold leading-tight">{testCard.q}</h2>
            {revealed && (
              <div className="mt-6 space-y-3">
                <p className="text-base leading-7 text-gray-800">{testCard.a}</p>
              </div>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              {!revealed ? (
                <button
                  onClick={() => setRevealed(true)}
                  className="rounded-lg bg-black px-4 py-2.5 font-semibold text-white hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                >
                  Reveal answer
                </button>
              ) : (
                <>
                  <button
                    onClick={() => grade(false)}
                    className="rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-900 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                  >
                    Got it wrong
                  </button>
                  <button
                    onClick={() => grade(true)}
                    className="rounded-lg bg-black px-4 py-2.5 font-semibold text-white hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                  >
                    Got it right
                  </button>
                </>
              )}
            </div>
          </article>
        </main>
      </div>
    )
  }

  // Score
  if (view === 'score') {
    return (
      <div className="min-h-screen bg-white text-gray-900 flex items-center">
        <div className="w-full px-6 py-12 sm:px-8">
          <div className="mx-auto max-w-2xl space-y-8 text-center">
            <div>
              <p className="font-mono text-xs text-gray-600 uppercase tracking-wide">Your score</p>
              <p className="mt-4 text-6xl font-bold sm:text-7xl">{scorePercent}%</p>
              <p className="mt-2 text-lg text-gray-700">{score} out of {testCards.length} correct</p>
            </div>
            <p className="text-base leading-7 text-gray-700">
              Enter your email to unlock all flashcard decks and continue practicing.
            </p>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError('') }}
                  placeholder="your.email@example.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 font-mono text-sm placeholder-gray-500 focus:border-black focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                />
                {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-black px-4 py-3 font-semibold text-white hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
                Unlock decks
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Decks
  if (view === 'decks') {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <header className="border-b border-gray-200">
          <div className="mx-auto max-w-4xl px-6 py-8 sm:px-8">
            <p className="font-mono text-xs text-gray-600 uppercase tracking-wide">Welcome, {email}</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Available decks</h1>
            <p className="mt-2 text-base text-gray-700">Start with any deck. Track your progress across all of them.</p>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-6 py-8 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {decks.map(deck => (
              <div key={deck.id} className="rounded-lg border border-gray-200 p-6 hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-bold text-lg">{deck.name}</h3>
                    <p className="mt-1 text-sm text-gray-600">{deck.desc}</p>
                  </div>
                  <div className="shrink-0 rounded-full bg-black text-white w-8 h-8 flex items-center justify-center font-mono text-sm font-bold">
                    {deck.count}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    )
  }
}
