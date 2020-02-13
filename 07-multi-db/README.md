docker run \
  --name postgres \
  -e POSTGRES_USER=augustoscher \
  -e POSTGRES_PASSWORD=minhasenhasecreta \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres

