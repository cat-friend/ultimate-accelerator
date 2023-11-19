```mermaid

---
title: User challenges
---
flowchart LR
    subgraph Diagram
        subgraph F["Frontend"]
        end
        F[Frontend] --- middleware
        middleware --> API
        subgraph API
            Controller["`Controller
            - validation
            `"]
            U["`UserChallengeService
            - sends payload to
            UserChallenge table
            - makes denormalized data,
            sends to UserChallenge
             dimension table`"]
            CR[ChallengeRepoLayer]
            DRepoLayer["`UserChallenge
            denormalized data
            repo layer`"]
            Database[(Database)]
            DTable[(UserChallenge denormalized data)]
            U --> DRepoLayer
            DRepoLayer <--> DTable
            Controller --> U
            U --> CR
            CR <--> Database[("UserChallenge table")]
        end
        API -- error response --> F
    end

```
