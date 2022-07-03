# @pritesh9/parcel-namer-preserve-structure

Preserves file names and directory structure.
Only kicks in production mode. Developement mode is skiped as it requires unique names.
Content hashing is disabled.

Add "sourceFolder" section in package.json and specify source directory relative to current working directory.
Example: "sourceFolder": "src"
(this line species, all source files are located in "src" folder in current working directoy.)

Add following to .parcelrc file located in project root directory (next to package.json)
{
	"extends": "@parcel/config-default",
	"namers": ["@pritesh9/parcel-namer-preserve-structure", "..."]
}