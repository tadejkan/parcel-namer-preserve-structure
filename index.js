const { Namer } = require("@parcel/plugin");
const path = require("path");
const fs = require("fs");

const SOURCE_FOLDER = "namerSourceFolder";
const CONTENT_HASH = "namerContentHash"

module.exports = new Namer({
	name({ bundle, options }) {

		if (options.mode === "production") {
			const mainEntry = bundle.getMainEntry()
			if (!mainEntry) return null

			const packageJson = fs.readFileSync(path.join(process.cwd(), 'package.json')).toString();
			const packageInfo = JSON.parse(packageJson);
			const srcDir = packageInfo[SOURCE_FOLDER];
			const hashEnabled = packageInfo[CONTENT_HASH];

			if (!srcDir) {
				console.log("no sourceFolder section in package.json.");
				return null;
			}

			let filePath = bundle.getMainEntry().filePath;

			let distName = basenameWithoutExtension(filePath);
			let distPath = path.dirname(`${path.relative(path.join(process.cwd(), srcDir), filePath)}`);

			if ((!bundle.needsStableName) && hashEnabled) {
				distName += "." + bundle.hashReference;
			}

			console.log("ENTRY: " + filePath);

			if (distPath === ".") {
				console.log("NAME: " + distName + '.' + bundle.type);
				return distName + '.' + bundle.type;
			}
			
			console.log("NAME: " + distPath + '\\' + distName + '.' + bundle.type);
			return distPath + '\\' + distName + '.' + bundle.type;
		}

		// This namer handles all files but just in case...
		// Allow the next namer to handle this bundle.
		return null;
	}
});

function basenameWithoutExtension(file) {
	return path.basename(file, path.extname(file));
}