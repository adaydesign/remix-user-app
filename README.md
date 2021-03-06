# Remix Demo App and MySQL

## Setup Step

1. install node modules

```
npm install
```

2. rename .env.example file to .env file
3. edit data url in .env file

```
mysql://username:password@localhost:3306/users_app
```

* make sure username and password of this account can Access and Excute Database
* don't need create a database (program automatically create database name, users_app)

4. migrate database
```
npx prisma migrate dev --name init
```

5. generate prima client
```
npx prisma generate
```

6. run test
```
npm run dev
```

-----

# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Using a Template

When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

```sh
cd ..
# create a new project, and pick a pre-configured host
npx create-remix@latest
cd my-new-remix-app
# remove the new project's app (not the old one!)
rm -rf app
# copy your app over
cp -R ../my-old-remix-app/app app
```

# Database Configuration

## Prisma

Make sure you already install prisma and @prisma/client into your project.

### Database Url

in .env file

```
DATABASE_URL="mysql://username:password@localhost:3306/users_app"
```

* users_app is database name

### Migrate database

```
npx prisma migrate dev --name init
```

### Prisma Generate

```
npx prisma generate
```
