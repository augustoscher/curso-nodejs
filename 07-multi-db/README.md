#### Running Postgres container
```bash
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
```bash
docker exec -it postgres /bin/bash
```

#### Running Adminer container
```bash
docker run \
  --name adminer \
  -p 8080:8080 \
  --link postgres:postgres \
  -d \
  adminer
```

#### Running MongoDB container
```bash
docker run \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
  -d \
  mongo:4
```

#### Running Mongoclient container
```bash
docker run \
  --name mongoclient \
  -p 3000:3000 \
  --link mongodb:mongodb \
  -d \
  mongoclient/mongoclient
```