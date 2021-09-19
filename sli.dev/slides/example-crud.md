---
layout: image-right
image: '/img/microservice.png'

---

## Example: CRUD

```yaml {all|3-4,9-10|3-4,9-10|5-8,11-14|5-8,11-14|all}
# serverless.yml
functions:
  create:
    handler: handler.create
    events:
      - http:
          method: post
          path: create
  read:
    handler: handler.read
    events:
      - http:
          method: get
          path: read
```

<arrow v-click="2" x1="330" y1="230" x2="600" y2="250" color="#00dbbd" width="3" arrowSize="1" />

<arrow v-click="2" x1="300" y1="330" x2="670" y2="250" color="#00dbbd" width="3" arrowSize="1" />

<arrow v-click="4" x1="250" y1="300" x2="700" y2="350" color="#00dbbd" width="3" arrowSize="1" />