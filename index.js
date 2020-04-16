"use strict"

function stripObjectFreezePlugin() {
	return {
		name: "strip-object-freeze",
		visitor: {
			CallExpression(path) {
				// Only *.*()
				let callee = path.get("callee")
				if (!callee.isMemberExpression()) return

				// Only *.freeze()
				let property = callee.get("property")
				if (!property.isIdentifier({ name: "freeze" })) return

				// Only Object.freeze()
				let object = callee.get("object")
				if (!object.isIdentifier({ name: "Object" })) return

				// Only globalThis.Object.freeze()
				let reference = path.scope.getBinding("Object")
				if (reference) return

				// Only Object.freeze(value) (with one argument)
				let args = path.get("arguments")
				if (args.length !== 1) {
					throw path.buildCodeFrameError(
						"Object.freeze() requires exactly 1 argument",
					)
				}

				// Object.freeze(value) -> value
				path.replaceWith(args[0])
			},
		},
	}
}

module.exports = stripObjectFreezePlugin
