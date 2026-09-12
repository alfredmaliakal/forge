# Forge

> **A spaced repetition system for mastering system design, scalability, performance engineering, and AI.**

Forge is a focused **Spaced Repetition System (SRS)** built for engineers who want to retain difficult technical concepts over the long term.

Instead of repeatedly rereading system-design material, Forge turns complex engineering concepts into **small, reviewable knowledge units** and schedules them for review based on how well they are retained.

The goal is simple:

> **Learn deeply. Recall actively. Review intelligently. Build durable technical knowledge.**

---

## 🧠 Why Forge?

System design knowledge is difficult to retain.

You may understand:

* Horizontal vs. vertical scaling
* Database sharding
* CAP trade-offs
* Cache invalidation
* Kafka partitioning
* Distributed locking
* Consistent hashing
* Rate limiting
* Load balancing
* Database indexing
* LLM inference
* RAG architectures

…but understanding something once doesn't mean you'll remember it six months later.

Forge applies **spaced repetition + active recall** to technical learning.

```text
Learn
  ↓
Recall
  ↓
Evaluate
  ↓
Schedule
  ↓
Review
  ↓
Strengthen Memory
  ↺
```

---

# 🎯 Target Audience

Forge is designed primarily for software engineers preparing for:

* System design interviews
* Senior Software Engineer interviews
* Staff-level engineering interviews
* Architecture discussions
* Distributed-systems interviews
* Performance-engineering roles
* AI/ML engineering interviews

It can also be used as a long-term technical knowledge base for engineers who want to retain concepts beyond interview preparation.

---

# 🗂️ Knowledge Domains

Forge focuses on high-value engineering concepts rather than generic trivia.

### System Design

* Requirements gathering
* Capacity estimation
* API design
* Data modeling
* High-level architecture
* Reliability
* Availability
* Fault tolerance

### Distributed Systems

* CAP theorem
* Consistency models
* Replication
* Partitioning
* Sharding
* Leader election
* Distributed locks
* Consensus
* Idempotency
* Event-driven architecture

### Scalability

* Horizontal scaling
* Vertical scaling
* Load balancing
* Auto scaling
* Stateless services
* Database scaling
* Caching
* CDN architecture

### Performance Engineering

* Latency
* Throughput
* Bottleneck identification
* Database indexing
* Query optimization
* Connection pooling
* JVM performance
* Profiling
* Caching strategies

### Data & Infrastructure

* PostgreSQL
* NoSQL
* Redis
* Kafka
* Message queues
* Object storage
* Kubernetes
* Containers
* Cloud architecture

### AI Systems

* LLM architecture
* Prompt engineering
* Embeddings
* Vector databases
* RAG
* Chunking
* Retrieval
* Reranking
* Agent architecture
* Tool calling
* AI inference
* Evaluation
* AI system scaling

---

# 🔄 Spaced Repetition

Forge is built around the principle that **active recall is more effective for long-term retention than passive rereading**.

Each card progresses through repeated reviews.

```text
                ┌─────────────┐
                │    Card     │
                └──────┬──────┘
                       ↓
                ┌─────────────┐
                │    Recall   │
                └──────┬──────┘
                       ↓
             ┌─────────┴─────────┐
             │                   │
          Remember           Forgot
             │                   │
             ↓                   ↓
       Increase interval    Reduce interval
             │                   │
             └─────────┬─────────┘
                       ↓
                 Next Review
```

The scheduling algorithm can evolve independently from the card content and UI.

---

# 🃏 Card Design

Forge encourages **small, focused cards** rather than large walls of text.

### Example

**Question**

> Why is horizontal scaling generally preferred for stateless API services?

**Answer**

> Stateless services can be replicated across multiple instances behind a load balancer, allowing capacity to increase without requiring a larger individual machine.

**Follow-up**

> What changes if the service maintains local session state?

This approach encourages engineers to **retrieve the concept**, rather than simply recognize it while reading.

---

# 🧩 Card Types

Forge can support different styles of technical cards:

### Concept

```text
Q: What is consistent hashing?

A: A hashing technique that minimizes key redistribution
when nodes are added or removed from a distributed system.
```

### Trade-off

```text
Q: What is the trade-off of strong consistency?

A: Stronger correctness guarantees can increase coordination,
latency, and reduce availability during network partitions.
```

### Scenario

```text
Q: Your API suddenly receives 10x traffic.
What should you investigate first?

A:
1. Current bottleneck
2. CPU / memory
3. Database capacity
4. Cache hit rate
5. Queue depth
6. Downstream dependencies
```

### Architecture

```text
Q: Where would you introduce asynchronous processing?

A: When work does not need to block the user request and can
be processed reliably through a queue or event stream.
```

---

# 🏗️ Architecture

Forge itself is designed as an engineering case study.

The architecture can evolve as the scale and requirements increase.

```text
                         ┌───────────────┐
                         │     Client    │
                         └───────┬───────┘
                                 │
                                 ▼
                         ┌───────────────┐
                         │   Application │
                         │      API      │
                         └───────┬───────┘
                                 │
                 ┌───────────────┼───────────────┐
                 │               │               │
                 ▼               ▼               ▼
             Card Store      SRS Engine      User Data
                 │               │               │
                 └───────────────┼───────────────┘
                                 ▼
                         ┌───────────────┐
                         │   Database    │
                         └───────────────┘
```

As requirements grow, additional components can be introduced:

```text
                         ┌───────────────┐
                         │     Client    │
                         └───────┬───────┘
                                 │
                                 ▼
                         ┌───────────────┐
                         │ Load Balancer │
                         └───────┬───────┘
                                 │
                    ┌────────────┼────────────┐
                    ▼            ▼            ▼
                  API-1        API-2        API-3
                    │            │            │
                    └────────────┼────────────┘
                                 │
               ┌─────────────────┼─────────────────┐
               ▼                 ▼                 ▼
             Redis             Queue            Database
               │                 │                 │
               │                 ▼                 │
               │          Background Workers       │
               │                                   │
               └─────────────────┬─────────────────┘
                                 ▼
                              Storage
```

The purpose is not to prematurely introduce infrastructure, but to understand **when and why each component becomes necessary**.

---

# ⚡ Performance Engineering

Performance is treated as a first-class design concern.

Forge explores questions such as:

* What is the expected request rate?
* What is the target p95 latency?
* Where are the bottlenecks?
* Which queries require indexes?
* What should be cached?
* What can be asynchronous?
* How does the system behave during traffic spikes?
* How does the SRS scheduler behave with millions of cards?
* How should review workloads be distributed?

Example performance model:

```text
Request
   │
   ├── Authentication
   │
   ├── Fetch due cards
   │
   ├── Calculate scheduling state
   │
   └── Persist review
```

Each stage can be measured and optimized independently.

---

# 📈 Scaling the SRS

A core engineering question is:

> **What happens when Forge grows from 100 users to 1 million users?**

### Early stage

```text
Client
  ↓
Application
  ↓
PostgreSQL
```

### Growing system

```text
Client
  ↓
Load Balancer
  ↓
Multiple API instances
  ↓
PostgreSQL + Redis
```

### Large-scale system

```text
                       ┌──────────────┐
                       │    Clients   │
                       └──────┬───────┘
                              ↓
                       Load Balancer
                              ↓
                 ┌────────────┼────────────┐
                 ↓            ↓            ↓
               API          API          API
                 │            │            │
                 └────────────┼────────────┘
                              ↓
                    ┌─────────────────┐
                    │      Redis      │
                    └─────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ↓                   ↓
                 Primary             Queue
                 Database              │
                    │                  ↓
                    │              Workers
                    │                  │
                    └────────┬─────────┘
                             ↓
                           Storage
```

Each evolution should be driven by an identified bottleneck rather than architecture for architecture's sake.

---

# 🤖 AI Integration

AI can augment the SRS without replacing active recall.

Potential AI capabilities include:

### Card Generation

Convert technical material into candidate flashcards.

```text
Documentation
     ↓
Chunking
     ↓
LLM
     ↓
Candidate Cards
     ↓
Quality Validation
     ↓
Human Review
     ↓
Forge Deck
```

### Adaptive Learning

AI can identify weak areas based on review history.

```text
Review History
      +
Card Performance
      +
Topic Relationships
      ↓
Weak Concept Detection
      ↓
Targeted Review
```

### Explanation Generation

When a user repeatedly struggles with a concept, AI can generate:

* Simpler explanations
* Examples
* Counterexamples
* Trade-off comparisons
* Follow-up questions
* Real-world scenarios

### System Design Practice

AI can also generate scenario-based questions:

```text
"Design a URL shortening service."

        ↓

Requirements
        ↓
Capacity
        ↓
API
        ↓
Data Model
        ↓
Architecture
        ↓
Scaling
        ↓
Failure Modes
```

---

# 🧠 Knowledge Graph

A future direction is connecting cards through their underlying concepts.

For example:

```text
                 Distributed Systems
                         │
          ┌──────────────┼──────────────┐
          ↓              ↓              ↓
     Replication       Sharding      Consensus
          │              │              │
          ↓              ↓              ↓
     Consistency       Partitioning   Leader Election
          │
          ↓
        CAP
```

This allows Forge to move beyond isolated flashcards toward a **connected technical knowledge model**.

A user's weak performance on one concept could surface related concepts that should also be reviewed.

---

# 📊 Learning Analytics

Potential metrics include:

* Retention rate
* Recall accuracy
* Review success rate
* Average response time
* Cards due
* Cards mastered
* Topic strength
* Weak concepts
* Review workload
* Long-term retention

The objective is not to maximize the number of cards completed.

It is to maximize **durable technical knowledge**.

---

# 🧪 Engineering Questions

Forge is intentionally designed to explore real system-design questions.

### Scale

* How should review workloads be partitioned?
* How should millions of scheduled reviews be queried efficiently?
* How do we avoid expensive full-table scans?
* How should users be distributed across workers?

### Data

* SQL vs. NoSQL?
* How should review history be modeled?
* Should scheduling state be denormalized?
* What data should be archived?

### Performance

* What belongs in Redis?
* How should indexes be designed?
* What should be precomputed?
* Where should asynchronous processing be introduced?

### Reliability

* What happens if a review request is retried?
* How do we guarantee idempotency?
* What happens when the database is unavailable?
* How do we recover from partial failures?

### AI

* How do we prevent low-quality generated cards?
* How do we evaluate AI-generated content?
* How should embeddings be generated?
* When should RAG be used?
* How should AI inference costs be controlled?

---

# 🗺️ Roadmap

## SRS Core

* [ ] Card creation
* [ ] Deck management
* [ ] Review sessions
* [ ] Spaced repetition scheduler
* [ ] Review history
* [ ] Due-card calculation

## Learning

* [ ] Difficulty tracking
* [ ] Retention analytics
* [ ] Weak-topic detection
* [ ] Adaptive review
* [ ] Related-card recommendations

## AI

* [ ] AI card generation
* [ ] AI explanations
* [ ] Scenario generation
* [ ] RAG-based learning
* [ ] Knowledge graph
* [ ] AI-generated review plans
* [ ] Card quality evaluation

## System Engineering

* [ ] Performance benchmarks
* [ ] Load testing
* [ ] Caching strategy
* [ ] Async review processing
* [ ] Horizontal scaling
* [ ] Observability
* [ ] Failure testing
* [ ] Capacity planning

---

# 🎓 Philosophy

Forge is based on a simple idea:

> **Knowing something once isn't the same as knowing it when you need it.**

The system combines **active recall, spaced repetition, and engineering-focused content** to help developers build technical knowledge that remains accessible under pressure.

The engineering side of Forge is equally important.

The project is used to explore how a seemingly simple application can evolve into a distributed system as requirements change:

```text
Simple Product
      ↓
Growing Usage
      ↓
Performance Problems
      ↓
Scaling Constraints
      ↓
Distributed Architecture
      ↓
AI Workloads
      ↓
Cost & Reliability Trade-offs
```

Forge is therefore both a **learning system** and a **system-design laboratory**.

---

# 🛠️ Tech Stack

The implementation is intentionally allowed to evolve as architectural requirements change.

Current areas of exploration include:

* Next.js
* React
* TypeScript
* Modern component architecture
* Spaced repetition algorithms
* Database design
* Caching
* Distributed systems
* Performance engineering
* AI / LLM systems
* RAG
* Vector search
* Observability

Technology choices are evaluated based on the problem they solve rather than being treated as requirements upfront.

---

# 📚 Project Status

Forge is an evolving engineering project.

The objective is not simply to ship another flashcard application.

It is to explore:

**How do you build a system that helps engineers retain complex knowledge while simultaneously applying the same engineering principles—scalability, performance, reliability, and AI—to the system itself?**

---

## License

See the repository for licensing information.
