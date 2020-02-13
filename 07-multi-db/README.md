#### Running Postgres container
```
docker run \
  --name postgres \
  -e POSTGRES_USER=augustoscher \
  -e POSTGRES_PASSWORD=minhasenhasecreta \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres
```
#### Enter on postgres container
docker exec -it postgres /bin/bash

#### Running Adminer container
docker run \
  --name adminer \
  -p 8080:8080 \
  --link postgres:postgres \
  -d \
  adminer
