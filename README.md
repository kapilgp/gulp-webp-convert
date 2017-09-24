# gulp-webp-convert
Convert automatically all jpg, jpeg, png into webp images from multi folders as folders got changed in files.


## Steps 
- Pull Repository
- Update tasks.json


```
{
    "webp-dest1": {
        "sourcePath": "./dest/dest1",
        "destPath": "./dest/webp",
        "watchPath": "dest/dest1"
    },
    "webp-dest2": {
        "sourcePath": "./dest/dest2",
        "destPath": "./dest/dest2",
        "watchPath": "dest/dest2"
    }
}

```

## Command

```
npm run webp-convert
```
## Command With forever
```
forever start -c "npm run webp-convert" index.js
```

### Feedback

Pull requests, feature ideas and bug reports are welcome

### License

MIT
