# @pritesh9/parcel-namer-preserve-structure

* Preserves file names and directory structure.
* Only kicks in production mode. Developement mode is skiped as it requires unique names.
* Content hashing is disabled by default.

### Add "namerSourceFolder" section in package.json and specify source directory relative to current working directory.
*Example*: Following line specifies, all source files are located in "src" folder in current working directoy.
```
"namerSourceFolder": "src"
````

### Add "namerContentHash" section in package.json with boolean value to eneble or disable content hash. It is disabled by default.
*Example*: Following line enables content hash and 
```
"namerContentHash": true
````

### Add following to .parcelrc file located in project root directory (next to package.json) to actually use the namer plugin.
```
{
	"extends": "@parcel/config-default",
	"namers": ["@pritesh9/parcel-namer-preserve-structure", "..."]
}
```