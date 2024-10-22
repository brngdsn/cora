```bash
docker run -d \
  --name pgvector-db \
  -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
  -e POSTGRES_USER=$POSTGRES_USER \
  -e POSTGRES_DB=$POSTGRES_DB \
  -p 5432:15432 \
  pgvector/pgvector:pg17

docker rm -cora-dbj

docker run -d --name cora-db -e POSTGRES_PASSWORD=pass -p 15432:5432 pgvector/pgvector:pg17
```

```bash
docker exec -it cora-db psql -U postgres
```
