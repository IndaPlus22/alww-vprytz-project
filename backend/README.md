# osqspeed/backend

Create `.env` file in the root of the project with the following content:

```env
SERVER_ADDR=0.0.0.0:5000
PG.USER=osqspeed
PG.PASSWORD=changeme
PG.HOST=127.0.0.1
PG.PORT=5432
PG.DBNAME=osqspeed
PG.POOL.MAX_SIZE=16

APP_URL="http://localhost:5000"

OAUTH_AUTH_URL="https://HOSTNAME/login/oauth/authorize"
OAUTH_TOKEN_URL="https://HOSTNAME/login/oauth/access_token"
OAUTH_BASE_API_URL="https://HOSTNAME/api/v3"
OAUTH_CLIENT_ID="CLIENT_ID"
OAUTH_CLIENT_SECRET="CLIENT_SECRET"
```
