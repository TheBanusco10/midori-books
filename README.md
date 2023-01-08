# Midori books

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Compiles Tailwind styles
```
npm run styles
```

Don't forget to configure .env file :)

## How to deploy
Before deploy, you have to update the app's version. You can use `update_app_version_patch` or `update_app_version_minor`:

```
npm run update_app_version_patch/minor
```

It will update the app version into `.env` and `.env.example` files. After that, it will run the `deploy` command.

Check the result running:
```
npm run local-server
```

If everything's fine, then run:
```
firebase deploy
```

Don't forget to commit and push `.env.example` modifications to the repository.
